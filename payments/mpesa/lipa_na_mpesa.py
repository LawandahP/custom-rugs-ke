import requests

import mpesa_keys
from mpesa_keys import generateAccessToken, generatePassword, generateAccessToken, getTimestamp


def lipaNaMpesaOnline():
  timeStamp = getTimestamp()
  access_token = generateAccessToken()
  password = generatePassword()


  headers = { 
    'Content-Type': 'application/json',
    'Authorization': 'Bearer %s' % access_token 
  }

  payload = {
      "BusinessShortCode": mpesa_keys.paybill_no,
      "Password": password,
      "Timestamp": timeStamp,
      "TransactionType": "CustomerPayBillOnline",
      "Amount": 1,
      "PartyA": mpesa_keys.phone_number,
      "PartyB": mpesa_keys.paybill_no,
      "PhoneNumber": mpesa_keys.phone_number,
      "CallBackURL": "https://customrugskenya.herokuapp.com/api/payments/lnm",
      "AccountReference": "GITHAIGA",
      "TransactionDesc": "Payment of X" 
    }

  stk_push_url = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest'
  response = requests.post(
    stk_push_url,
    headers = headers, json = payload)
  print(response.text)

lipaNaMpesaOnline()