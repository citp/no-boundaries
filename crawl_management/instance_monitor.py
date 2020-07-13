import boto3
import datetime
import subprocess
import mailer
import re
from os.path import join, dirname

# Get instances with name `embedding-crawl-YYYY-MM-DD*'
INSTANCE_FILTER = 'embedding-crawl-' + str(datetime.datetime.now().year) + '*'
EXPERIMENT_FILTER = re.compile(
    'embedding-crawl-\d{4}-\d{2}-\d{2}-(?P<crawl_name>.*)')
RECIPIENTS = ['']  # list of email addresses

ec2 = boto3.client('ec2')
reservations = ec2.describe_instances(Filters=[
    {'Name': 'tag-value', 'Values': [INSTANCE_FILTER]}])
message = ''

for reservation in reservations['Reservations']:
    instance = reservation['Instances'][0]
    match = re.match(EXPERIMENT_FILTER, instance['Tags'][0]['Value'])
    if match is None:
        continue
    instance_name = match.group(0)
    hostname = instance['PublicDnsName']

    # Message header
    message += "\n:::::::::::::::::::: Crawl {} :::::::::::::::::::::".format(
        instance_name)

    state = instance['State']['Name']
    if state != 'running':
        print "Instance %s is not running. Current state: %s" % (
            instance_name, state)
        message += "\nInstance not running. Current state: %s\n" % state
        continue

    print "Checking status of %s at host %s" % (instance_name, hostname)

    # Check crawl status
    checker = subprocess.Popen(
        ['sh', join(dirname(__file__), 'check_crawl.sh'), hostname],
        shell=False, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    res = checker.stdout.read()
    err = checker.stderr.read()
    if err != '':
        print "STDERR:\n" + err
    message += '\n'+res

print message
mailer.send_message('MEASUREMENT UPDATE', message, RECIPIENTS)
