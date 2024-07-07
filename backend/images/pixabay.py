import requests
from os import environ

auth = environ.get("PIXABAY_KEY")
count = 3
def get_pixabay(location: str):
  query = f"tourists+in+{location}"
  r = requests.get(f"https://pixabay.com/api/?key={auth}&q={query}&page=1&per_page={count}").json()
  return list(map(lambda x: x["largeImageURL"], r["hits"]))