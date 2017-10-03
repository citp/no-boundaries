import smtplib
import os

from email.mime.application import MIMEApplication
from email.MIMEMultipart import MIMEMultipart
from email.MIMEText import MIMEText


smtp_address = 'smtp.gmail.com'
port_number = 587

# Credentials for notification mailer.
CREDENTIAL_DIR = os.path.join(os.path.dirname(__file__),
                              '..', 'credentials', 'mailer')
with open(CREDENTIAL_DIR, 'r') as f:
    origin_address, password = f.read().strip().split('\n')


def send_message(subject, message, to_addresses, attach_file=None):
    server = smtplib.SMTP(smtp_address, port_number)
    server.starttls()
    server.ehlo()
    server.login(origin_address, password)

    body = MIMEText(message)
    e = MIMEMultipart()

    e['Subject'] = subject
    e['From'] = origin_address
    e['To'] = ', '.join(to_addresses)

    e.attach(body)

    if attach_file:
        part = MIMEApplication(open(str(attach_file), 'rb').read())
        part.add_header('Content-Disposition', 'attachment',
                        filename=attach_file.split('/')[-1])
        e.attach(part)

    server.sendmail(origin_address, to_addresses, e.as_string())

    return
