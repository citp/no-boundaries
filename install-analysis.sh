#!/bin/bash
set -e

sudo pip install pandas pycrypto hackercodecs pyblake2 sha3 \
  mmhash base58 cookies jsbeautifier python-whois

#  No need to install pbzip2 and jupyter on Travis
if [ "$TRAVIS" != "true" ]; then
	sudo apt-get install pbzip2
	sudo pip install jupyter
fi
