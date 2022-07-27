echo $(docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' mongodb)
DATE=`date +%Y.%m.%d.%H.%M`
DOCKER_IMAGE=manage_admin
DOCKER_CONTAINER=manage_admin

## Build docker
docker build  --no-cache -t $DOCKER_IMAGE .;

NETWORK_NAME=net-node
if [ -z $(docker network ls --filter name=^${NETWORK_NAME}$ --format="{{ .Name }}") ] ; then 
     docker network create ${NETWORK_NAME} ; 
fi
# build master
## Stop and delete service master
if [ $(docker ps -qa -f name=\/$DOCKER_CONTAINER\$) ]; then\
	docker stop $DOCKER_CONTAINER;\
    docker rm $DOCKER_CONTAINER;\    
fi

docker run -dit  --restart always \
--net $NETWORK_NAME \
-p 5000:5000 \
--name $DOCKER_CONTAINER  $DOCKER_IMAGE npm start

docker image prune -af 
