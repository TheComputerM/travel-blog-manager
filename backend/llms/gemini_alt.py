import google.generativeai as genai
from os import environ
genai.configure(api_key=environ.get("GEMINI_ALT_KEY"))
model = genai.GenerativeModel('gemini-pro')

def gemini_alt_gen(title: str, section):
    prompt = f"Title: {title}\n\nSection: {section}\n\nContent:"
    response = model.generate_content(prompt)
    return response.text