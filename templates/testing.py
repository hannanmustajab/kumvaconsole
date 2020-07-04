import requests

base_url = "https://api.particle.io/v1/devices/?access_token=6f1f28a22de0f16e5762645c3d81db40be779789"
r = requests.get(base_url).json()

devices = []

for device in r:
    print(device)
    devices.append(device['id'])

vitals = "https://api.particle.io/v1/products/10709/diagnostics/{}/last?access_token=6f1f28a22de0f16e5762645c3d81db40be779789"

data_list=[]

for id in devices:
    vital_data = requests.get(vitals.format(id)).json()
    try:
        print(vital_data)
        data = {
            'id': id,
            'battery': vital_data['diagnostics']['payload']['device']['power']['battery']['charge'],
            'status': vital_data['diagnostics']['payload']['device']['power']['battery']['state'],
            'operator': vital_data['diagnostics']['payload']['device']['network']['cellular']['operator'],
            'radio':vital_data['diagnostics']['payload']['device']['network']['cellular']['radio_access_technology'],
            'signal_strength':vital_data['diagnostics']['payload']['device']['network']['signal']['strength'],
            'signal_quality':vital_data['diagnostics']['payload']['device']['network']['signal']['quality'],
            'last_updated':vital_data['diagnostics']['updated_at'],
            'round_trip':vital_data['diagnostics']['payload']['device']['coap']['round_trip']
        }
        data_list.append(data)
    except Exception as e:
        e

