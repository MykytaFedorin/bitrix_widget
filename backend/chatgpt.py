from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI()

def create_letter(cv: str, vac_desc: str) -> str:
    prompt = f"""Я хочу устроиться сотрудником на определенную вакансию.
                Помоги мне составить сопроводительное письмо на основе 
                моего резюме и описания вакансии.Резюме:'{cv}', описание 
                вакансии:'{vac_desc}'."""
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo-0125",
        messages=[
            {"role": "user", "content": prompt}
        ]
    )
    return str(completion.choices[0].message.content)

