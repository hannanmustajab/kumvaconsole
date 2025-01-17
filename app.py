import datetime
from datetime import timezone
import pytz
from flask import Flask, render_template, jsonify
import requests
import time
import timestring


app = Flask(__name__)

@app.route('/')
def index():
    url = "https://api.particle.io/v1/devices/?access_token=6f1f28a22de0f16e5762645c3d81db40be779789"
    r = requests.get(url).json()
    online_devices = [device for device in r if device['online'] is True]
    offline_devices = [device for device in r if device['online'] is False]
    return render_template('index.html',online_devices=online_devices,offline_devices=offline_devices,total_devices=r)


@app.route('/device/<device_id>', methods=['POST', 'GET'])
def viewDevice(device_id):
    url = 'https://api.particle.io/v1/devices/{}/?access_token=6f1f28a22de0f16e5762645c3d81db40be779789'.\
        format(device_id)

    vitals = "https://api.particle.io/v1/products/10709/diagnostics/{}/last?access_token=6f1f28a22de0f16e5762645c3d81db40be779789".format(device_id)
    vitals_data = requests.get(vitals).json()
    r = requests.get(url).json()
    context = {
        'now': int(time.time()),
        'strftime': timestring.Date
    }
    return render_template('device.html', data=r, vitals = vitals_data, **context)


@app.route('/api')
def api():
    base_url = "https://api.particle.io/v1/devices/?access_token=6f1f28a22de0f16e5762645c3d81db40be779789"
    r = requests.get(base_url).json()
    return jsonify(r)


@app.route('/<string:id>')
def vital_api(id):
    vitals = f"https://api.particle.io/v1/products/10709/diagnostics/{id}/last?access_token=6f1f28a22de0f16e5762645c3d81db40be779789"
    r = requests.get(vitals).json()
    return jsonify(r)


if __name__ == '__main__':
    app.run()
