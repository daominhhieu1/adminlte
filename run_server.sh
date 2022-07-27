
DATE=`date +%Y.%m.%d.%H.%M`
DOCKER_IMAGE=manage_admin
DOCKER_CONTAINER=manage_admin

## Build docker
docker build  --no-cache -t $DOCKER_IMAGE .;

# build master
## Stop and delete service master
if [ $(docker ps -qa -f name=\/$DOCKER_CONTAINER\$) ]; then\
	docker stop $DOCKER_CONTAINER;\
    docker rm $DOCKER_CONTAINER;\    
fi

docker run -dit  --restart always \
-p 5000:5000 \
--name $DOCKER_CONTAINER  $DOCKER_IMAGE npm start

docker image prune -af 
