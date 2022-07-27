DATE=`date +%Y.%m.%d.%H.%M`
DOCKER_IMAGE=mongodb
DOCKER_CONTAINER=mongodb
NETWORK_NAME=net-node
if [ -z $(docker network ls --filter name=^${NETWORK_NAME}$ --format="{{ .Name }}") ] ; then 
     docker network create ${NETWORK_NAME}; 
fi
if [ $(docker ps -qa -f name=\/$DOCKER_CONTAINER\$) ]; then\
	docker stop $DOCKER_CONTAINER;\
    docker rm $DOCKER_CONTAINER;\    
fi
sudo docker run --name $DOCKER_IMAGE \
--net $NETWORK_NAME \
-v /mongodata_docker:/data/db \
-p 27017:27017 \
-d mongo:latest

