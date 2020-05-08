#!/bin/bash -e

echo "*** Updating NODE_PATH ***"
export NODE_PATH=$NODE_PATH:.:./app
echo $NODE_PATH

echo "*** Linking conf.json ***"
cd config
pwd
    conf='conf.json'
    if [ ! -h $conf ]; then
        ln -s prod.conf.json conf.json
    fi
cd ..

echo "*** Installing npm dependencies ***"
rm -rf node_modules
npm install --no-audit

echo "*** Running tests ***"
npm test

echo "*** Generating app dist ***"
npm run clean:dist
npm run build:dist
