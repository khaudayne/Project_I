import openai
import time
import bcrypt
openai.api_key = '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'

topic = """Create the short title of topic : "{}", about 3 words"""

def print_Text(text):
    for x in text:
        if x != ' ' and x != '.':
            print(x, end='')
        else:
            print(x, end='', flush=True)
        time.sleep(0.02)

def get_respon(prompt):
    res = openai.Completion.create(
        engine="text-davinci-003",  # Chọn engine phù hợp
        prompt=prompt,
        max_tokens=1000
    )
    return res['choices'][0]['text']

def hash_password(password):
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed_password

def check_password(password, hashed_password):
    return bcrypt.checkpw(password.encode('utf-8'), hashed_password)
