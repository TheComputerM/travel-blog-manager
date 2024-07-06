import requests
from os import environ

authorizationKey = environ.get("PEXELS_KEY")
per_page = 4

def get_pexels(location: str):
    headers = {"Authorization": authorizationKey}
    r = requests.get(f"https://api.pexels.com/v1/search?query={location}&per_page={per_page}", headers=headers).json()
    return list(map(lambda x: x["src"]["medium"], r["photos"]))