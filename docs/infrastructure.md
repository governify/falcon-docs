---
title: Infrastructure
description: Infrastructure
sidebar_position: 2 # Sets this doc to the first position in the sidebar
hide_table_of_contents: True
---

# Infrastructure

---

:::info
The infrastructure files are available in the [Falcon Assets Repository](https://github.com/governify/assets-falcon)
:::

The services of Bluejay Infrastructure are presented in the table below, along with their local ports, DNS, docker Image and GitHub repository.

|            Component                                 |Local Port|       DNS           |        Docker Image               |
|------------------------------------------------------|----------|---------------------|-----------------------------------|
| [Render](https://github.com/governify/render)        | 5100     | ui.*[domain]*       |governify/render:<vX.X.X/develop>  |
| [Assets](https://github.com/governify/assets-manager)| 5200   | assets.*[domain]*   |governify/assets-manager:<vX.X.X/develop>|
| [Reporter](https://github.com/governify/reporter)    | 5300     | reporter.*[domain]* |governify/reporter:<vX.X.X/develop>    |
| [Registry](https://github.com/governify/registry)    | 5400     | registry.*[domain]* |governify/registry:<vX.X.X/develop>|
| [Dashboard](https://github.com/governify/dashboard)  | 5600     | dashboard.*[domain]*|governify/dashboard:<vX.X.X/develop> |
| [Director](https://github.com/governify/director)    | 5800     | director.*[domain]* |governify/director:<vX.X.X/develop>|
| [Join](https://github.com/governify/join-bluejay)    | 6100     | join.*[domain]*     |governify/join-bluejay:<vX.X.X/develop>|
| Prometheus                                           | 5900     | ❌                  |prom/prometheus    |
| [Collector-Dynamic](https://github.com/governify/collector-dynamic)| 5501  | ❌ |governify/collector-events:<vX.X.X/develop>  |
| DB-Mongo-Registry                                    | 5001      | ❌   |  ❌ |mongo                                | 
| DB-Influx-Reporter                                    | 5002      | ❌   |  ❌ | influxdb:1.8.4-alpine                       | 
| DB-Collector-Redis                                    | 5003      | ❌   |  ❌ | redis                                |
