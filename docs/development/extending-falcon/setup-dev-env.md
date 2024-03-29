---
title: Setup Development Environment
description: Setup Development Environment
sidebar_position: 1 # Sets this doc to the first position in the sidebar
hide_table_of_contents: false
---

# Setup Development Environment

---

## Infrastructure
The infrastructure and microservices are already configured to work straight away and be connected (docker or node). All the infrastructure will be exposed so no docker network is needed. All the components will be deployed locally using the following ports:

| Component          | Port        |
|--------------------|-------------|
| Render             | 5100        |
| Assets             | 5200        |
| Reporter           | 5300        |
| Registry           | 5400        |
| Collector-dynamic  | 5501        |
| Dashboard          | 5600        |
| Director           | 5800        |
| Prometheus         | 5900        |
| DB-Mongo-Registry  | 5001        |
| DB-Influx-Reporter | 5002        |


The default configuration of the infrastructure is available [here](https://github.com/governify/falcon-infrastructure/blob/main/assets/public/infrastructure-local.yaml).

## Deploying the system using Docker-Compose

The prerequisites for deploying the system are:
 - **Git** for cloning the repository
 - **Docker** (v20.0.0 or greater) and **docker-compose** (v1.25.0 or greater) installed 
 - Having the **ports** showed up in the last section available.

### Steps

**0.** In case you are running a linux machine, you need to asociate the host.docker.internal url to 172.17.0.1 (docker's gateway)
```
host-manager -add host.docker.internal 172.17.0.1
```

**1.** Clone the repository and checkout to the develop branch:
```
git clone https://github.com/governify/falcon-infrastructure
cd falcon-infrastructure
git checkout origin/develop
```

**2.** Deploy the system
```
docker-compose -f ./docker-compose-local.yaml --env-file ./.env-local up -d
```

Bear in mind that any key or configuration can be setted up in the .env-local file instead of .env. On any docker-compose-local.yaml or .env-local change, run the step 2 again it order for it to take place. Also any service deployed with node won't use the .env-local variables so make sure they are properly configured.

### Develop a feature in an existing microservice

To develop a feature is as simple as shutting the container down and then starting the microservice cloned from GitHub. E.g. If the collector-dynamic wants to be modified:

1. Stop the container:
```
docker stop falcon-collector-dynamic
```

2. Clone and start the microservice:
```
git clone https://github.com/governify/collector-dynamic
cd collector-dynamic
npm i
node index
```

It will start in the same port as the container was and will be properly connected to the entire infrastructure.


## Deploying the system in a Kubernetes cluster

:::caution
For development purposes it is more appropiate to use docker-compose due to its simplicity. Nevertheless, if the production environment is a Kubernetes cluster, it is recommended to test the system on this locally deployed cluster first.
:::

Governify provides Helm charts for deploying Falcon services inside a Kubernetes cluster. The following steps describe how to deploy the infrastructure inside a development cluster (or a single-node cluster like minikube):

### Steps

**1.** Create Namespace
```
$    kubectl create namespace governify-falcon
```

**2.** Configure kubernetes for assigning NodePorts in range (3000-9000) by adding `--service-node-port-range=3000-6000` to the kubernetes kube-apiserver config file. If using docker-desktop [check this page](https://stackoverflow.com/questions/64758012/location-of-kubernetes-config-directory-with-docker-desktop-on-windows).

**3.** Create a values.yaml file with the following content
```
global:
    node_env: development
    gov_infrastructure: <assets_call_to_infrastructure-local.yaml>
    login_user: <username>
    login_password: <password>

assets-manager:
    gov_infrastructure: <local_path_to_infrastructure-local.yaml>
    assets_repository: <repository_url> (defaults to current assets repository inside github governify organization)
    assets_repository_branch: <branch> (default: main)
```

**4.** Install charts
```
$    helm repo add governify https://governify.github.io/helm-charts
$    helm repo update
$    helm install -f values.yaml <release_name> governify/<chart_name>
```

More information about the configuration options available for Governify-Falcon HELM chart can be found at our [HELM Charts repository](https://github.com/governify/helm-charts/tree/main/infrastructure/Governify-Falcon).