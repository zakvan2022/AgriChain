#!/bin/bash
AGRICHAIN=$(cd $(dirname "${BASH_SOURCE[0]}")/../../ && pwd -P)
docker run -t -i -P --rm \
    -v $AGRICHAIN:/home/ubuntu/agrichain/ \
    --link agrichain_mongo \
    -p 3000:3000 \
    agrichain/webapp \
    npm run express
