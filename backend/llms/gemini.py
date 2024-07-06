import google.generativeai as genai
from os import environ
genai.configure(api_key=environ.get("GEMINI_KEY"))

generation_config = {
  "temperature": 1,
  "top_p": 0.95,
  "top_k": 64,
  "max_output_tokens": 8192,
  "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
  model_name="gemini-1.5-flash",
  generation_config=generation_config,
  system_instruction="""You are an expert blog content writer. 
  Write long blog posts when the user gives the location and topic. 
  Do NOT generate a title for the blog, just the content.""",
)

chat_session = model.start_chat(
  history=[
  ]
)

def gemini_gen(location: str, topic: str):
  output = chat_session.send_message(f"Location: {location}\nTopic: {topic}")
  return output.text
