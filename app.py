from flask import Flask, render_template
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
    context = {
        'now': int(time.time()),
        'strftime': timestring.Date
    }
    return render_template('counts.html', total_devices=r, online_devices=online_devices,
                           offline_devices=offline_devices, **context)


if __name__ == '__main__':
    app.run()
