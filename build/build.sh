#!/bin/bash -e

echo "*** Linking conf.json ***"
cd config
pwd
    conf='conf.json'
    if [ ! -h $conf ]; then
        ln -s prod.conf.json conf.json
    fi
cd ..

echo "*** Done ***"
