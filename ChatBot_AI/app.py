
import funtion_Project
from flask import Flask, render_template, request

# while True:
#     text = input("Ask something: ")
#     if text == '#':
#         break
#     funtion_Project.print_Text(funtion_Project.get_respon(text))
#     print('\n')

app = Flask(__name__, static_folder='static')

@app.route("/")
def home():
    return render_template("index.html")

@app.route('/get')
def get_respon():
    userText = request.args.get('msg')
    return funtion_Project.get_respon(userText)

@app.route('/login')
def login_View():
    return render_template("login.html")

@app.route('/register')
def register_View():
    return render_template("register.html")


if __name__ == '__main__':
    app.run()
