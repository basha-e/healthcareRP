import requests
from flask import Flask, render_template, jsonify

app = Flask(__name__)

# ThingSpeak Channel API Details
THINGSPEAK_API_URL = "https://api.thingspeak.com/channels/<channel_id>/feeds.json"
API_KEY = "<QSA4JFIPXPP3NVIJ>"

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/get_sensor_data')
def get_sensor_data():
    # Fetch data from ThingSpeak
    response = requests.get(THINGSPEAK_API_URL, params={"api_key": API_KEY, "results": 1})
    if response.status_code == 200:
        data = response.json()
        feeds = data['feeds'][0]  # Latest feed
        sensor_data = {
            "blood_pressure": feeds['field3'],  # Replace 'field1' with the respective ThingSpeak field name
            "heart_rate": feeds['field2'],
            "temperature": feeds['field1']
        }
        return jsonify(sensor_data)
    else:
        return jsonify({"error": "Failed to fetch data from ThingSpeak"}), 500

if __name__ == '__main__':
    app.run(debug=True)
