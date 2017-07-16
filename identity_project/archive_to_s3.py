# This requires access credentials stored in ~/.aws/ for a user belonging to
# the `DataArchive` group.
from botocore.exceptions import ClientError
from boto3.s3.transfer import S3Transfer
from glob import glob
import threading
import boto3
import sys
import os

BUCKET_NAME = 'identity-tracking-project'


class ProgressPercentage(object):
    def __init__(self, filename):
        self._filename = filename
        self._size = float(os.path.getsize(filename))
        self._seen_so_far = 0
        self._lock = threading.Lock()

    def __call__(self, bytes_amount):
        # To simplify we'll assume this is hooked up
        # to a single filename.
        with self._lock:
            self._seen_so_far += bytes_amount
            percentage = (self._seen_so_far / self._size) * 100
            sys.stdout.write(
                "\r%s  %s / %s  (%.2f%%)" % (
                    self._filename, self._seen_so_far, self._size,
                    percentage))
            sys.stdout.flush()


def exists_on_s3(file_name):
    """Check if <file_name> exists in s3 bucket"""
    try:
        s3.Object(BUCKET_NAME, file_name).load()
    except ClientError as e:
        if e.response['Error']['Code'] == "404":
            return False
        else:
            raise e
    return True


# Archive file to the s3 bucket
def upload(file_path, file_name):
    """Upload file located at <file_path> to s3.
    Uses <file_name> as the s3 key name (object identifier).
    """
    transfer = S3Transfer(boto3.client('s3'))
    transfer.upload_file(file_path, BUCKET_NAME, file_name,
                         extra_args={
                             'ACL': 'private',
                             'StorageClass': 'STANDARD',
                         },
                         callback=ProgressPercentage(file_path))


if __name__ == '__main__':
    if len(sys.argv) != 2:
        print "Usage: python archive_to_s3.py <directory>"
        sys.exit(1)
    directory = os.path.expanduser(sys.argv[1])

    s3 = boto3.resource('s3')

    # Connect to bucket and create it if it does not exist
    try:
        s3.meta.client.head_bucket(Bucket=BUCKET_NAME)
    except ClientError as e:
        error_code = int(e.response['Error']['Code'])
        if error_code == 404:
            s3.create_bucket(Bucket=BUCKET_NAME,
                             CreateBucketConfiguration={
                                 'LocationConstraint': 'us-west-2'}
                             )
        else:
            raise

    # Sync directory, uploading any files not currently present
    for file_path in glob(os.path.join(directory, "20*.tar.bz2")):
        if exists_on_s3(os.path.basename(file_path)):
            print "%s already archived to s3" % file_path
        else:
            upload(file_path, os.path.basename(file_path))
            print "%s successfully uploaded" % file_path
