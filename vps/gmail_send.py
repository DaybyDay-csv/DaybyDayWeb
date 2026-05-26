#!/usr/bin/env python3
# Usage: gmail_send.py 'to@email.com' 'Subject' 'Body text'
import sys, json, base64, requests
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def get_access_token():
    with open('/root/.gmail_token.json') as f:
        data = json.load(f)
    # Refresh if needed
    resp = requests.post('https://oauth2.googleapis.com/token', data={
        'refresh_token': data['refresh_token'],
        'client_id': 'REDACTED',
        'client_secret': 'REDACTED',
        'grant_type': 'refresh_token'
    })
    return resp.json()['access_token']

def send_email(to, subject, body, html=None):
    token = get_access_token()
    if html:
        msg = MIMEMultipart('alternative')
        msg.attach(MIMEText(body, 'plain'))
        msg.attach(MIMEText(html, 'html'))
    else:
        msg = MIMEText(body)
    msg['to'] = to
    msg['from'] = 'contact@daybydayconsulting.com'
    msg['subject'] = subject
    raw = base64.urlsafe_b64encode(msg.as_bytes()).decode()
    resp = requests.post(
        'https://gmail.googleapis.com/gmail/v1/users/me/messages/send',
        headers={'Authorization': f'Bearer {token}'},
        json={'raw': raw}
    )
    return resp.status_code == 200

if __name__ == '__main__':
    to, subject, body = sys.argv[1], sys.argv[2], sys.argv[3]
    ok = send_email(to, subject, body)
    print('SENT' if ok else 'FAILED')
