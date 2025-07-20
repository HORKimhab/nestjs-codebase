import socket
import platform
import requests

hostname = socket.gethostname()
system = platform.system()
release = platform.release()

data = {
    "email": "user@example.com",
    "password": "Secret123",
    "hostname": hostname,
    "os": f"{system} {release}",
    "ssid": "MyWifi"
}

response = requests.post('http://localhost:3000/api/v1/auth/user-info', json=data)

print('socket', socket)
print('platform', platform)
print(response.status_code)
print(response.text)


# import requests

# response = requests.get('https://ipinfo.io/json')
# data = response.json()

# print(data)
# # Example keys: ip, city, region, country, loc, org, postal, timezone

# {
#   "ip": "185.40.4.38",
#   "hostname": "tor-exit.lokodlare.com",
#   "city": "Oslo",
#   "region": "Oslo",
#   "country": "NO",
#   "loc": "59.9127,10.7461",
#   "org": "AS200195 Verasel, Inc.",
#   "postal": "0001",
#   "timezone": "Europe/Oslo",
#   "readme": "https://ipinfo.io/missingauth"
# }