import socket
import platform
import requests

hostname = socket.gethostname()
system = platform.system()
release = platform.release()

data = {
    "hostname": hostname,
    "os": f"{system} {release}",
}

response = requests.post('http://localhost:3000/api/v1/auth/user-info', json=data)

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