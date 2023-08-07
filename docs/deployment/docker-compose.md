---
title: Docker Compose
description: Docker Compose
sidebar_position: 1 # Sets this doc to the first position in the sidebar
hide_table_of_contents: false
---

# Docker Compose Deployment

---

This guide deploys falcon with the docker ecosystem and serve it by means of an nginx proxy.

## Prerequisites
- Linux server with the following installed packages:
   - docker
   - docker-compose (version 1.27 or greater)
- A domain with the ability to modify DNS records.
- Ports 80, 443 open on the server. 

## Infrastructure setup

**1.** Create the following DNS A records, pointing to your server IP. If you are deploying locally you can add these to your hosts file pointing to your machine but it only will be accessible by you.

- ui.falcon.*[YourDomain]*
- registry.falcon.*[YourDomain]*
- reporter.falcon.*[YourDomain]*
- dashboard.falcon.*[YourDomain]*
- assets.falcon.*[YourDomain]*
- director.falcon.*[YourDomain]*

**2.** Clone latest release of Falcon Infrastructure repository [Falcon Infrastructure](https://github.com/governify/falcon-infrastructure):
```
git clone https://github.com/governify/falcon-infrastructure.git
```

**3.** Create a `.env` at the root of the folder. This file contains all the environmental variables for the system to work as intended. Bear in mind that both *SERVICES_PREFIX* and *DNS_SUFIX* must start with a dot and end without it.


```
# GENERAL (Mandatory for deployment)
SERVICES_PREFIX=                    # Ex: .bluejay
DNS_SUFFIX=                         # Ex: .bluejay
SERVER_IP=                          # Ex: .bluejay

# CREDENTIALS
LOGIN_USER=governify-admin         # UI Access user
LOGIN_PASSWORD=governify-project   # UI Access pass

# INFRASTRUCTURE (No need to modify)
GOV_INFRASTRUCTURE=http://falcon-assets-manager/api/v1/public/infrastructure.yaml
ASSETS_GOV_INFRASTRUCTURE=/home/project/public/infrastructure.yaml
ASSETS_REPOSITORY_BRANCH=main
INFLUX_URL=http://falcon-influx-reporter:8086
NODE_ENV=production

# COMPOSE CONFIG
COMPOSE_HTTP_TIMEOUT=200                    # No need to modify

# ASSETS MANAGER
KEY_ASSETS_MANAGER_PRIVATE={{RANDOM_KEY1}}  # No need to modify
```

**4.** Deploy the system with the following command:
```
./utils/deploy.sh
```

**5.** (Optional) When the deployment is done, create the SSL certificates for your deployment using [Lets Encript](https://letsencrypt.org/):
```
./utils/init-letsencrypt.sh
```

Governify ecosystem with falcon services should have been deployed in your machine.

## Advanced Infrastructure Deploy
This is a guided setup wizard with extra options to deploy the system. 

#### Requirements
- Linux server with yum package installer or with the following packages already preinstalled:
   - git
   - docker
   - docker-compose (version 1.27 or greater)
- A domain with the ability to modify DNS records.
- Ports 80, 443 open on the server. 

#### Advanced infrastructure deploy

Clone latest release of Falcon Infrastructure repository [Falcon Infrastructure](https://github.com/governify/falcon-infrastructure):
```
git clone https://github.com/governify/falcon-infrastructure.git
```

Now, open a terminal in the root folder and execute setupAdvanced.sh script:
```
./setupAdvanced.sh 
```
![Setup Wizard](/img/deployment/setup_wizard_main.png)

You have to input 1 and press enter in order to go to the configuration menu. You should now follow the steps in order to accomplish the system deployment. This are the different options:

![Setup Wizard](/img/deployment/setup_wizard_configure.png)
    
**1. (Optional) Docker and Docker Compose installation (yum/AWS):** When used it installs all the needed tools for the system to function  using yum package manager.

**2. Environment variables setup:** It opens with `nano` the file .env to enter the different environment variables the system needs to function properly. 

:::note
The first three variables are mandatory for the system to be deployed. If you also want to set up the default tokens for the different APIs you can do it now but is not necessary yet.
:::

**3. (Optional) Automatic DNS records generation (DynaHosting):** In case you have a Dyna Hosting account, you can generate DNS records using this option. When used you will be prompted to enter user and password and it will automatically create them using the domain entered previously in the .env file. If you prefer you can create your DNS records on your own using your provider.

- ui.falcon.*[YourDomain]*
- registry.falcon.*[YourDomain]*
- reporter.falcon.*[YourDomain]*
- dashboard.falcon.*[YourDomain]*
- assets.falcon.*[YourDomain]*
- director.falcon.*[YourDomain]*

**4. System deployment:** This option will pull the docker images and deploy the system. It will ask if you want to instantiate an nginx in the system to work as a reverse proxy. In case you want to use an existing reverse proxy in your machine you can disable it.

**5. (Optional) Lets-encrypt automatic certificates generation** It automatically generates free SSL certificates using [Let's Encript](https://letsencrypt.org/) authority.