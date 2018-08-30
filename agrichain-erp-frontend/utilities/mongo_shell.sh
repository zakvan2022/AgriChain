#!/usr/bin/env bash

# Run this in docker to drop into the mongo shell.
/usr/bin/mongo --host $AGRICHAIN_MONGO_PORT_27017_TCP_ADDR --port $AGRICHAIN_MONGO_PORT_27017_TCP_PORT agrichain-development
