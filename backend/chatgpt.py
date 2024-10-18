from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI()
completion = client.chat.completions.create(
    model="gpt-3.5-turbo-0125",
    messages=[
        {"role": "user", "content": "write a haiku about ai"}
    ]
)
print(completion)

