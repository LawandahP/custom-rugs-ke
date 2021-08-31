from django.http.response import JsonResponse
from django.shortcuts import render

import base64
from datetime import datetime
from django.http import HttpResponse
import requests
from requests.api import request
from requests.auth import HTTPBasicAuth
import json



# Create your views here.
def getAccessToken(request):
    consumer_key = 'ClzaSQIoQgupBJvUIADNNjTUoqp53Jt5'
    consumer_secret = 'gUc8jwdGGGuHdscf'
    api_URL = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials'
    r = requests.get(api_URL, auth=HTTPBasicAuth(consumer_key, consumer_secret))
    mpesa_access_token = r.text
    # validated_mpesa_access_token = mpesa_access_token['access_token']
    print(mpesa_access_token)
    return JsonResponse(mpesa_access_token, safe=False)
