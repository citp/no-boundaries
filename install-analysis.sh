#!/bin/bash
set -e

sudo apt-get install pbzip2

sudo pip install jupyter pandas pycrypto hackercodecs pyblake2 sha3 \
  mmhash base58 cookies jsbeautifier python-whois
