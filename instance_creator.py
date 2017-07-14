import os
import sys
import boto3
import datetime

CRAWL_SCRIPTS = {
    'facebook_api': 'measurement_facebook_api.py',
    'google_api': 'measurement_google_api.py',
    'facebook_login': 'measurement_facebook_login.py',
    'form_filling': 'measurement_form_filling.py',
    'passive_identity': 'measurement_passive_identity.py',
    'dom_login_and_checkout': 'measurement_dom_login_and_checkout.py',
    'dump_source': 'measurement_dump_source.py'
}
INSTANCE_TYPES = {
    'facebook_api': 'c4.2xlarge',
    'google_api': 'c3.2xlarge',
    'facebook_login': 'c4.4xlarge',
    'form_filling': 'c3.2xlarge',
    'passive_identity': 'c4.2xlarge',
    'dom_login_and_checkout': 'c4.2xlarge',
    'dump_source': 'c3.2xlarge'
}
VOLUME_SIZE = {
    'facebook_api': 700,
    'google_api': 700,
    'facebook_login': 1500,
    'form_filling': 700,
    'passive_identity': 700,
    'dom_login_and_checkout': 700,
    'dump_source': 1000
}
AMI_ID = 'ami-e13739f6'  # generic Ubuntu 16.04
NUM_INSTANCES = 1
KEY_NAME = '***REMOVED***'
SECURITY_GROUP_ID = '***REMOVED***'  # TODO
VOLUME_INFO = {'DeviceName': '/dev/sda1',
               'Ebs': {
                   'VolumeSize': None,  # should be set by VOLUME_SIZE
                   'DeleteOnTermination': True,
                   'VolumeType': 'gp2'
               }}
TEST_TAGS = [{'ResourceType': 'instance',
              'Tags': {
                  'Key': 'Name',
                  'Value': '{}'}
              }]

DATE_PREFIX = datetime.datetime.strftime(datetime.datetime.now(), '%Y-%m-%d')
STARTUP_SCRIPT_TEMPLATE = open('instance_startup.sh', 'r').read()
GITHUB_CREDENTIALS = os.path.join(os.path.dirname(__file__),
                                  'credentials', 'github')


def create_instance(crawl_type, github_user, github_password):
    ec2 = boto3.resource('ec2')
    startup_script = STARTUP_SCRIPT_TEMPLATE.format(
        github_user, github_password,
        DATE_PREFIX, CRAWL_SCRIPTS[crawl_type])
    VOLUME_INFO['Ebs']['VolumeSize'] = VOLUME_SIZE[crawl_type]
    instance = ec2.create_instances(
        ImageId=AMI_ID,
        MinCount=NUM_INSTANCES,
        MaxCount=NUM_INSTANCES,
        KeyName=KEY_NAME,
        UserData=startup_script,
        SecurityGroupIds=[SECURITY_GROUP_ID],
        InstanceType=INSTANCE_TYPES[crawl_type],
        BlockDeviceMappings=[VOLUME_INFO]
    )[0]
    instance.create_tags(
        Tags=[{'Key': 'Name', 'Value': DATE_PREFIX + '-' + crawl_type}])
    return


if __name__ == '__main__':
    if len(sys.argv) != 2:
        print "Usage: python instance_creator.py [CRAWL_TYPE]"
        print "Supported crawl types: %s" % CRAWL_SCRIPTS.keys()
        sys.exit(1)

    # Read github credentials from disk
    with open(GITHUB_CREDENTIALS, 'r') as f:
        github_user, github_password = f.read().strip().split('\n')
    create_instance(sys.argv[1], github_user, github_password)
    print "Crawl successfully started"
