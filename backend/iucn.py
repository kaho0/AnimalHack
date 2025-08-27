import requests

API_TOKEN = 'UUogE4adTvw6XFk2e6bi17Q1fz91v5sXCDDW'
genus = 'Panthera'
species = 'leo'

url = f'https://apiv3.iucnredlist.org/api/v3/taxa/{genus}/{species}?token={API_TOKEN}'

response = requests.get(url)
print(response.status_code)
print(response.json())
