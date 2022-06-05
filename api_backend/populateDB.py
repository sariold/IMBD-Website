import requests
import os
import json

arr = json.load(open("movie.json", "r"))
k = 0

for i in arr:
    r = requests.post( url = "http://localhost:8080/api/movies", data = i)
    print(str(k) + " json sent with response " + r.text)
    k = k + 1
    # print(str(i))
