# Google  SQL - MySQL


# Google  Function



# Google Kubernetes Engine (Backend)



# Google Engine y Network Balancer (Frontend)
## Crear imagen en docker y publicarla
```sh

gcloud auth configure-docker 
gcloud config set compute/zone us-central1-a

docker build --platform linux/amd64 -t angelhigueros11/frontend . 
docker run -it -p 3000:3000 --name project  angelhigueros11/frontend




```


# Cloud Monitoring
## CREAR VM Y HACER DEPLOY
```sh
# Activar APIs and services
gcloud services enable runtimeconfig.googleapis.com
gcloud services enable stackdriver.googleapis.com

# Crear un deployment
gcloud deployment-manager deployments create dsudeployment --config deployment.yaml

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