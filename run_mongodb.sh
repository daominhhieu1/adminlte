NETWORK_NAME=net-node
if [ -z $(docker network ls --filter name=^${NETWORK_NAME}$ --format="{{ .Name }}") ] ; then 
     docker network create ${NETWORK_NAME}; 
fi

sudo docker run --name mongodb \
--net $NETWORK_NAME \
-v /mongodata_docker:/data/db \
-p 27017:27017 \
-d mongo:latest

