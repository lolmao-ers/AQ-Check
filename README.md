# AQ Check

A Project to collect real-time air quality data from all over India.

## Proof of Concept Video

[![Everything Is AWESOME](https://i.imgur.com/yRVlPuz.png
)](https://www.youtube.com/watch?v=CponiMqZM_o "Everything Is AWESOME")

## Image Gallery

<img src="https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/001/770/325/datas/gallery.jpg" />

# Why do we need it?

Pollution is a serious issue in cities such as New Delhi, and precise air quality data over small regions is a necessity.

Our project aims to set up Arduino based devices with various air quality sensors to retrieve AQ data over small regions to provide precise Air Quality results.

# How it works?

-   AQ Check uses low-cost, arduino-based, devices that collect air quality data from areas of upto 50m<sup>2</sup> and send them to a database.
-   Setting these devices up in multiple locations provides data that is much more precise than currently available.

# Development

## Frontend

-   `React`
-   `SCSS`

## Backend:

-   `MongoDB`
-   `Redis`
-   `Express.js`

## DevOps:

-   `Kubernetes`

    -   We used K8s to deploy React, MongoDB, Redis, Node and ElasticSearch on the same cluster in seperate pods.
    -   It also allowed to maintain several replicas of each to prevent any downtime in case something breaks.

-   `Datree`

    -   Datree checks our K8s config files to prevent any security vulnerabilities and ensure the best practices have been followed.

-   `ElasticSearch`

    -   It provides the database for our Twilio bot.

-   `Helm`

    -   We used a Helm chart to effortlessly deploy our ElasticSearch database.

-   `Twilio`

    -   We use a Twilio bot to send daily Air Quality updates to our users via WhatsApp.

-   `GitHub`
    -   Our project repository is stored on GitHub.
    -   Moreover, we use GitHub Actions for CI/CD.

# Future plans

- For testing purposes, we setup one device in Rohini, New Delhi which provides us realtime data for the locality. The rest of the data is dummy data scraped from the web. However, the actual project would consist of these devices being setup in each locality to provide real-time data.
  
- Another feature to be implemented that will use location tracking to provide data from the nearest sensor automatically.
