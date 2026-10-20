import requests


class APIClient:

    def get(self, url):
        return requests.get(url, timeout=10)

    def post(self, url, data=None):
        return requests.post(url, json=data, timeout=10)

    def put(self, url, data=None):
        return requests.put(url, json=data, timeout=10)

    def delete(self, url):
        return requests.delete(url, timeout=10)