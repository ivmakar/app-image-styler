#!/bin/bash
set -euxo pipefail

#start react
cp /tmp/start-react.sh /etc/my_init.d/start-react.sh
chmod +x /etc/my_init.d/start-react.sh

#start node server
cp /tmp/start-server.sh /etc/my_init.d/start-server.sh
chmod +x /etc/my_init.d/start-server.sh

#download models
cp /tmp/download-models.sh /etc/my_init.d/download-models.sh
chmod +x /etc/my_init.d/download-models.sh

rm -r /tmp/*
