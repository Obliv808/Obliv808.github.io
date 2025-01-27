import requests  
import json  
import os  

API_KEY = os.environ['df2bb042c263dbfbedcf2972b8b32135']  
LAT, LON = 32.7767, 96.7970  # Dallas coordinates  

response = requests.get(  
  f"https://api.openweathermap.org/data/2.5/air_pollution?lat={LAT}&lon={LON}&appid={API_KEY}"  
)  

with open('data/processed_data.json', 'w') as f:  
  json.dump(response.json(), f)  