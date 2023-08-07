---
title: Kubernetes
description: Kubernetes
sidebar_position: 2 # Sets this doc to the first position in the sidebar
hide_table_of_contents: false
---

# Kubernetes Deployment

---

This guide explains how to deploy Governify-Bluejay in a Kubernetes Cluster using [HELM Charts](https://helm.sh/).

## Prerequisites

- Kubernetes cluster with HELM installed
- A domain with the ability to modify DNS records.
- Ports 80, 443 open for the cluster.

## Infrastructure setup

**1.** Create Namespace
```
$    kubectl create namespace governify-bluejay
```

**2.** Install Contour
```
$    kubectl apply -f https://projectcontour.io/quickstart/contour.yaml
```

**3.** Wait a few minutes and get the Load Balancer IP Address
```
$    (kubectl get -n projectcontour service envoy -o json) | jq -r '.status.loadBalancer.ingress[0].ip'
```

**4.** Install CertManager
```
$    kubectl apply -f https://github.com/jetstack/cert-manager/releases/download/v1.1.0/cert-manager.yaml
```

**5.** Create a values.yaml file with the following content
```
    global:
        node_env: production
        gov_infrastructure: http://bluejay-assets-manager/api/v1/public/infrastructure.yaml
        services_prefix: .<infrastructure-prefix>
        dns_suffix: .<your-DNS-zone>
        login_user: governify-admin
        login_password: governify-project
    
    assets_manager:
        private_key: somerandomkey
```

**6.** Install charts
```
$    helm repo add governify https://governify.github.io/helm-charts
$    helm repo update
$    helm install -f values.yaml bluejay governify/Governify-Bluejay
```

More information about the configuration options available for Governify-Bluejay HELM chart can be found at our [HELM Charts repository](https://github.com/governify/helm-charts/tree/main/infrastructure/Governify-Bluejay).