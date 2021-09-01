from django.http import response
import requests
import mpesa_keys

from mpesa_keys import generateAccessToken

access_token = generateAccessToken()


def registerUrl():
    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer %s' % access_token
    }

    payload = {
        "ShortCode": mpesa_keys.short_code,
        "ResponseType": "Completed",
        "ConfirmationURL": "https://customrugsdesigns.com/confirmation",
        "ValidationURL": "https://customrugsdesigns.com/validation",
    }

    response = requests.post('https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl', headers = headers, json = payload)
    print(response.text)


def c2bTransaction():
    c2b_url = 'https://sandbox.safaricom.co.ke/mpesa/c2b/v1/simulate'
    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer %s' % access_token
    }
    payload = {
        "CommandID": "CustomerPayBillOnline",
        "Amount": 1,
        "ShortCode": mpesa_keys.short_code,
        "BillRefNumber": "12345678",
        "Msisdn": mpesa_keys.c2b_msisdn,
        
    }
    response = requests.post(
        c2b_url, headers=headers, json=payload
    )
    print(response.text)
c2bTransaction()