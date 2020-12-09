#! /usr/bin/bash

export PRIVATE_KEY=`cat ./src/secrets/crs.pem`
export SERVER_CRT=`cat ./src/secrets/server.crt`
echo $PRIVATE_KEY