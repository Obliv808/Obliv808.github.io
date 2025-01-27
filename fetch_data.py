import os
import requests
import json

# Configuration
CITIES = {
    "London": (51.5074, -0.1278),
    "New York": (40.7128, -74.0060)
}

API_KEY = os.environ['OWM_API_KEY']

def fetch_data():
    all_data = {}
    for city, (lat, lon) in CITIES.items():
        url = f"https://api.openweathermap.org/data/2.5/air_pollution?lat={lat}&lon={lon}&appid={API_KEY}"
        response = requests.get(url)
        all_data[city] = response.json()
    
    with open('data/processed_data.json', 'w') as f:
        json.dump(all_data, f, indent=2)

if __name__ == "__main__":
    fetch_data()