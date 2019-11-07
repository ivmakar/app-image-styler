#!/bin/bash
set -euxo pipefail

apt-get update
apt-get install -y nodejs npm

#install 'serve'
npm install -g serve

apt-get clean && rm -rf /var/lib/apt/lists/*
