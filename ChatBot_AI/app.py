
import funtion_Project
from flask import Flask, render_template, request, redirect, url_for
from flask_cors import CORS
import mysql.connector

# while True:
#     text = input("Ask something: ")
#     if text == '#':
#         break
#     funtion_Project.print_Text(funtion_Project.get_respon(text))
#     print('\n')

# app = Flask(__name__, static_folder='static')
app = Flask(__name__)
CORS(app)
# @app.route("/")
# def home():
#     return render_template("index.html")
connection = mysql.connector.connect(
    host = 'localhost',
    user = 'root',
    password = '@Khai314159265359',
    database = 'project_1'
)

cursor = connection.cursor()

@app.route('/get', methods=['GET'])
def get_respon():
    userText = request.args.get('msg')
    return funtion_Project.get_respon(userText)

@app.route('/login', methods=['GET'])
def login_View():
    username = request.args.get('username')
    password = request.args.get('password')
    cursor.execute("select password, id from user where username like %s", [username])
    data = cursor.fetchall()
    if(data == None or len(data) == 0):
        return {'data' : [], 'msg' : "Tên đăng nhập không tồn tại!", 'status': "FAILED"}
    hashed_password = data[0][0].encode('utf-8')
    id_user = data[0][1]
    if funtion_Project.check_password(password, hashed_password):
        cursor.execute("select title, id from title where user_id = %s", [id_user])
        list_title = cursor.fetchall()
        data = {'username' : username, 'list_title' : list_title}
        return {'data' : data, 'msg' : "Đăng nhập thành công!", 'status': "SUCCESS"}
    else:
        return {'data' : [], 'msg' : "Mật khẩu không chính xác!", 'status': "FAILED"}

@app.route('/content', methods=['GET'])
def get_content():
    id_title = request.args.get('id_title')
    try:
        cursor.execute("select msg from content where title_id = %s order by id asc;", [id_title])
        list_content = cursor.fetchall()
        return {'data' : list_content, 'msg' : "Lấy dữ liệu thành công!", 'status': "SUCCESS"}
    except:
        return {'data' : [], 'msg' : "Đã có lỗi xảy ra, vui lòng thử lại sau!", 'status': "ERROR"}
    

@app.route('/register', methods=['POST'])
def register_View():
    username = request.form['username']
    cursor.execute("select username from user where username like %s", [username])
    data = cursor.fetchall()
    if len(data) != 0:
        return {'data' : [], 'msg' : "Tên đăng nhập đã tồn tại!", 'status': "FAILED"}
    password = request.form['password']
    password = funtion_Project.hash_password(password).decode()
    
    try:
        cursor.execute("insert into user(username, password) values(%s, %s)", [username, password])
        connection.commit()
        return {'data' : username, 'msg' : "Thành công!", 'status': "SUCCESS"}
    except:
        return {'data' : [], 'msg' : "Đã có lỗi xảy ra, vui lòng thử lại sau!", 'status': "ERROR"}
    


if __name__ == '__main__':
    app.run()