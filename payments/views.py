from datetime import datetime
import pytz

import requests

from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import api_view, permission_classes

from payments.mpesa.lipa_na_mpesa import lipaNaMpesaOnline
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from payments.serializers import LipaNaMpesaOnlineSerializer
from payments.models import LipaNaMpesaOnline

from .mpesa import mpesa_keys
from .mpesa.mpesa_keys import generateAccessToken, generatePassword, generateAccessToken, getTimestamp


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def lipaNaMpesaOnlineStkPush(request):
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
    return Response(response)







class LipaNaMpesaCallbackUrlAPIView(CreateAPIView):
    queryset = LipaNaMpesaOnline.objects.all()
    serializer_class = LipaNaMpesaOnlineSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request):
        user = request.user
        
        """
        {'Body': 
            {'stkCallback': 
                {
                    'MerchantRequestID': '82441-85031621-1', 
                    'CheckoutRequestID': 'ws_CO_010920211148228797', 
                    'ResultCode': 0, 
                    'ResultDesc': 'The service request is processed successfully.',
                    'CallbackMetadata': 
                        {
                            'Item': [   
                                {'Name': 'Amount', 'Value': 1.0}, 
                                {'Name': 'MpesaReceiptNumber', 'Value': 'PI10C6XGTY'}, 
                                {'Name': 'Balance'}, 
                                {'Name': 'TransactionDate', 'Value': 20210901114837}, 
                                {'Name': 'PhoneNumber', 'Value': 254740129131}
                            ]
                    }
                }
            }
        }
        
        """
        merchant_request_id = request.data['Body']['stkCallback']['MerchantRequestID']
        checkout_request_id = request.data['Body']['stkCallback']['CheckoutRequestID']
        result_code = request.data['Body']['stkCallback']['ResultCode']
        result_description = request.data['Body']['stkCallback']['ResultDesc']

        amount = request.data['Body']['stkCallback']['CallbackMetadata']['Item'][0]['Value']
        mpesa_receipt_number = request.data['Body']['stkCallback']['CallbackMetadata']['Item'][1]['Value']

        transaction_date = request.data['Body']['stkCallback']['CallbackMetadata']['Item'][3]['Value']
        phone_number = request.data['Body']['stkCallback']['CallbackMetadata']['Item'][4]['Value']

        # convert timestamp to date
        

        transaction_date_str = str(transaction_date)
        transaction_datetime = datetime.strptime(transaction_date_str, "%Y%m%d%H%M%S")

        timezone_aware_datetime = pytz.utc.localize(transaction_datetime)
        
        lipa_na_mpesa_online = LipaNaMpesaOnline.objects.create(
            user = user,
            MerchantRequestID = merchant_request_id,
            CheckoutRequestID = checkout_request_id,
            ResultCode = result_code,
            ResultDesc = result_description,
            Amount = amount,
            MpesaReceiptNumber = mpesa_receipt_number,
            TransactionDate = timezone_aware_datetime,
            PhoneNumber = phone_number
        )
        lipa_na_mpesa_online.save()

        serializer = LipaNaMpesaOnlineSerializer(lipa_na_mpesa_online, many=False)
        return Response(serializer.data)

    
        
    

        


