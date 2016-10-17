#!/bin/bash
# Script to download crawl data

# Exit if we hit any errors
set -e

if [ "$#" -lt 2 ]; then
    echo "Usage: ./download_crawl.sh <server_ip_or_hostname> <output_folder>"
    exit 1
fi

host=ubuntu@$1
data_dir=$2

echo Checking if crawls are running on $1
if ssh -i ~/.ssh/crawler_access -q $host [[ -f /tmp/crawl_running ]]; then
    echo "Can't archive while crawls are running on the machine, exiting."
    exit 1
fi

printf '\nCrawls to archive: \n'
crawl_dirs=( $(ssh -i ~/.ssh/crawler_access $host 'ls -1 --ignore "*.tar.bz2" | grep 2016') )
for dir in ${crawl_dirs[@]}; do
    echo '  *'$dir
done

for dir in ${crawl_dirs[@]}; do
    printf '\n===============================================\n'
    printf 'Processing: '$dir'\n'
    crawl_db=( $(ssh -i ~/.ssh/crawler_access $host 'ls -1 '$dir'/*.sqlite') )

    printf '\n Moving crontab log into data directory: '$dir
    ssh -i ~/.ssh/crawler_access $host 'cp crontab.log '$dir

    printf '\n Taking md5sum of '$crawl_db'...'
    remote_md5sum=( $(ssh -i ~/.ssh/crawler_access $host 'md5sum '$crawl_db ) )
    printf $remote_md5sum'\n'

    compressed=$dir'.tar.bz2'
    printf '\n Compressing '$dir' to '$compressed' on remote server\n'
    ssh -i ~/.ssh/crawler_access $host 'tar -c '$dir' | pbzip2 -c > '$compressed

    printf '\n Copying '$compressed' from remote to '$data_dir' on local\n'
    scp -i ~/.ssh/crawler_access $host:'/home/ubuntu/'$compressed $data_dir

    printf '\n Decompressing local copy\n'
    local_archive=$data_dir$compressed
    pbzip2 -dck $local_archive | tar -x

    printf '\n Check m5sum of local copy...'
    local_md5sum=( $(md5sum $data_dir$crawl_db) )
    printf $local_md5sum'\n'
    if [ "$local_md5sum" != "$remote_md5sum" ]; then
        echo 'ERROR: md5sums do not match | local '$local_md5sum' | remote '$remote_md5sum
        exit 1
    else
        echo md5sums match between local and remote, it\'s safe to delete remote copy
    fi

    #printf '\n Deleting remote archive and crawl database \n'
    #ssh -i ~/.ssh/crawler_access $host 'rm -rf '$dir
    #ssh -i ~/.ssh/crawler_access $host 'rm '$compressed

    printf '\n Deleting local decompressed archive\n'
    echo $data_dir$dir
    rm -rf $data_dir$dir

    printf '\n Processing complete for '$dir'\n\n'
done
