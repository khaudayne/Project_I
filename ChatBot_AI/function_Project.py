import openai
import time

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
