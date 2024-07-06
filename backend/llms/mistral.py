from mistralai.client import MistralClient
from mistralai.models.chat_completion import ChatMessage
from os import environ

class Config:
    MISTRAL_API_KEY = environ.get("MISTRAL_KEY")

# LLMService class definition
class LLMService:
    @staticmethod
    def get_mistral(user_message, model="mistral-large-latest", is_json=False):
        client = MistralClient(api_key=Config.MISTRAL_API_KEY)
        messages = [ChatMessage(role="user", content=user_message)]
        if is_json:
            chat_response = client.chat(
                model=model, messages=messages, response_format={"type": "json_object"}
            )
        else:
            chat_response = client.chat(model=model, messages=messages)

        return chat_response.choices[0].message.content

service = LLMService()

def mistral_gen(topic: str, location: str):
    query = f"Write a detailed blog about {topic} in {location}."
    return service.get_mistral(query)