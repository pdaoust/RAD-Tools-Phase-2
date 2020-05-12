#!/bin/bash

[ -f ./conductor-config.toml ] && rm -rf ./conductor-config.toml
cp ./conductor-config.example.toml ./conductor-config.toml
[ ! -d ./keystores ] && mkdir keystores
[ ! -d ./keystores/agent1 ] && mkdir keystores/agent1
[ -f ./keystores/agent1/AGENT_1_PUB_KEY.keystore ] && rm -rf ./keystores/agent1/AGENT_1_PUB_KEY.keystore
hc keygen -n --path ./keystores/agent1/AGENT_1_PUB_KEY.keystore | sed -ne 's/^Public address:\.*//p' | xargs -I {} sh -c 'mv ./keystores/agent1/AGENT_1_PUB_KEY.keystore ./keystores/agent1/{}.keystore; sed -i "s/<AGENT_1_PUB_KEY>/{}/" ./conductor-config.toml'
ln -s ./conductor-config.toml ./ui-src/src/conductor-config.toml
echo "Generated new keypair for Agent 1"
echo "Added Agent 1 to Conductor"

# nb: This is currently commented out in favor of a work around due to .cargo/config override option throwing an error at build time.
#      Comment back in once crate is compatible again with HC.
# 
# hc package | sed -ne 's/^DNA hash: \.*//p' | xargs -I {} sed -i "s/<DNA_HASH>/{}/" ../conductor-config.toml