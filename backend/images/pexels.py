import requests
from os import environ

authorizationKey = environ.get("PEXELS_KEY")
per_page = 3

def get_pexels(location: str):
    r = requests.get("https://api.pexels.com/v1/search?query="+ location +"&per_page="+per_page,headers={"Authorization":authorizationKey}).json()
    return map(lambda x: x["src"]["medium"], r["photos"])