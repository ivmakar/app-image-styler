#!/bin/bash
set -euxo pipefail

apt-get update
apt-get install -y nodejs npm python3-pip

#install requirements for neural network
pip3 install -r /tmp/requirements.txt

#install 'serve'
npm install -g serve

apt-get clean && rm -rf /var/lib/apt/lists/*
