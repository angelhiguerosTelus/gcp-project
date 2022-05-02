# Google  SQL - MySQL


# Google  Function



# Google Kubernetes Engine (Deployment)



# Google Engine y Network Balancer (Deployment)



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