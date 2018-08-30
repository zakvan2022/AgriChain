echo "Starting Agrichain"
export MONGO_URL=mongodb://$AGRICHAIN_MONGO_PORT_27017_TCP_ADDR:$AGRICHAIN_MONGO_PORT_27017_TCP_PORT/agri-chain
cd /home/ubuntu/agrichain
$@
