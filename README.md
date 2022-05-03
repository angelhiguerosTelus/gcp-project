# Google  SQL - MySQL


# Google  Function



# Google Kubernetes Engine (Deployment)
```sh
# Deploy del frontend
npm run build

# Crear imagen de docker, ejecucion del contenedor para prueba local y subirlo al hub docker
docker build -t umgtato/finalproject .   
docker run -d -p 3001:3001 --name final umgtato/finalproject
docker push umgtato/finalproject:v1

#configuracion del GKE
gcloud config set compute/zone us-central1-a 
gcloud container clusters create cluster-final --num-nodes=3
touch deployment.yml
#pegar configuracion de docker.
nano deployment.yml 
kubectl apply -f deployment.yml
```


# Google Engine y Network Balancer (Deployment)

docker run -d -p 3000:3000 --name frontend angelhigueros11/frontend
docker push angelhigueros11/frontend

# Cloud Monitoring
## CREAR VM Y HACER DEPLOY
```sh
# Activar APIs and services
gcloud services enable runtimeconfig.googleapis.com
gcloud services enable stackdriver.googleapis.com

# Crear un deployment
gcloud deployment-manager deployments create dsudeployment --config deployment.yaml


# 34.74.191.102
# 35.237.49.178


docker stop frontend
docker rm  frontend
 docker rmi angelhigueros11/frontend:latest
docker run -d -p 80:3000 --name frontend  angelhigueros11/frontend:latest



```
## INSTALAR HERRAMIENTAS EN LA VM 
```sh

# instalar stress
sudo apt install stress-ng
sudo apt install stress 

curl -sSO  https://dl.google.com/cloudagents/install-monitoring-agent.sh
curl -sSO  https://dl.google.com/cloudagents/install-logging-agent.sh

sudo bash install-logging-agent.sh
sudo bash install-monitoring-agent.sh


# Peticiones de prueba
stress-ng --cpu 1 --timeout 60s --metrics-brief
```