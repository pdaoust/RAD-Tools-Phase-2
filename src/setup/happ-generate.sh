#!/bin/bash

SCHEMA_PATH="src/setup/type-specs/sample-type-spec.json" && [[ $1 != "" ]] && SCHEMA_PATH=$1

npm run happ:remove
cp -r ./src/happ-template ./happ
sed -i "s/<HAPP_NAME>/happ/g" ./happ/package.json
cp $SCHEMA_PATH ./happ/
npm run ui:generate $SCHEMA_PATH
npm run hc:generate-dna $SCHEMA_PATH
sed -i "s/<HAPP_NAME>/happ/g" ./happ/ui-src/package.json
npm run happ:install
cd happ
npm run hc:package
cd ..
npm run hc:generate-conductor
rm -rf ./target ./.cargo
