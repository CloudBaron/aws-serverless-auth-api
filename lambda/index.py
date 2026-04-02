import json
import os

def handler(event, context):
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json'
        },
        'body': json.dumps({
            'message': 'Authorized access granted',
            'userPoolId': os.environ.get('USER_POOL_ID'),
            'clientId': os.environ.get('CLIENT_ID')
        })
    }
