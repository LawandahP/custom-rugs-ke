import base64
from datetime import datetime

import requests
from requests.auth import HTTPBasicAuth

consumer_key = 'yVS3HM45wEfZYftAsptGOr8wkMCypzbd'
consumer_secret = 'cXjtpeJjA7VaPuGp'
lipa_na_mpesa_passkey = 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919'

paybill_no = 174379
phone_number = 254740129131

short_code = 600990
c2b_msisdn = 254708374149


def getTimestamp():
    time = datetime.now()
    time_stamp = time.strftime("%Y%m%d%H%M%S")
    return time_stamp



def generateAccessToken():
    mpesa_auth_endpoint = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials'

    response = requests.get(
        mpesa_auth_endpoint,
        auth=HTTPBasicAuth( consumer_key, consumer_secret),
    )
    auth_res = response.json()
    my_access_token = auth_res['access_token']
    return my_access_token
  

# This is the password used for encrypting the request sent:
#  A base64 encoded string. (The base64 string is a combination 
# of Shortcode+Passkey+Timestamp
def generatePassword():
    timeStamp = getTimestamp()
    data_to_encode = str(paybill_no) + lipa_na_mpesa_passkey + timeStamp
    encoded_string = base64.b64encode(data_to_encode.encode())

    password = encoded_string.decode('utf-8')
    return password
