---
id: ci-cd-101
title: CI/CD 101
date: 2019-05-17
---

## What is CI/CD?

Continuous Integration and Continous Deployment is the process of automating the delivery pipeline from a code push to a production deployment. This delivery pipeline can be automated so that once events are triggered the heavy lifting of building, validating, auditing and deploying can be done by machines to create an iterative cycle that empowers product team members to focus more on the things that need to be done and less on how to move them from a developer environment to a production environment.

## Why?

* Product evolution

Products are constantly evolving and scope and requirements can change over time, having a process that embraces that change can lead to the ability to deliver quality products in a reduced amount of time and effort.

* Small batches

It has been proven by delivering short and small changes incrementally have a lower total cost of ownership for the maintenance of products over time.

* Automation Pipeline

Leveraging automation pipelines allows the product team to adjust and modify the gates through a deployment system adding/removing additional modules and constraints in the process without having to build the deployment process from scratch.

## Components

To have a CI/CD process you need three components to create effective CI/CD pipelines:

* Source Control
* Deployment Platform
* CI/CD Pipeline service

Source Control -----> CI/CD Pipeline ------> Deployment Platform

There are plenty of products to choose from for each of these platforms and some are better than others, in this article we will be convering the following:

* Gitlab (Source Control)
* Jenkins (CI/CD Pipeline)
* Cloud Foundry (Deployment Platform)

### Gitlab

Gitlab is a source control platform that enabled product teams to work on the same source code files and providing the ability to merge these source code files into one branch that can be sent through a pipeline for deployment. 

### Jenkins

We will focus mostly on Jenkins today as it is arguably the most commonly used open source CI/CD pipeline tool today.

### Cloud Foundry 

An open source platform as a service that allows you to deploy cloud application and services using several different frameworks and developer platforms. It can handle deployment, scale and routing.

## Example Project

Lets use an example project to deploy, this project is a simple crud application that uses a free database service and has a api and frontend web application.

> Demo App

With this demo app, we will configure a CI/CD pipeline that will build the application, validate the application, then deploy the application. This is a simple flow, but should give you an idea of how to go about creating deployment pipelines.

## Tutorial

### Requirements

### Setup

### Create a Pipeline

### Create a jenkinsFile

### Add Webhook

### Add Secrets to Jenkins


## Patterns

There are two primary patterns for automation that can create zero downtime deployment processes.

1. Blue/Green Pattern
2. Canary Pattern
3. Immutable

### Blue/Green 

The blue/green pattern, will deploy your application using two application names myapp-blue and myapp-green and toggle between the names during deployment, then use the alias command to set a target url to point to the freshest app name. For example, if the target is currently pointing to myapp-blue, then the new deployment would push to myapp-green, then run a smoke test on myapp-green, if it passes, then the pipeline will move the alias from myapp-blue to myapp-green. And myapp-blue will be available for a period of time to rollback.

> Add drawing here

### Canary 

> TBD

### Immutable

> TBD

### Summary

CI/CD is a powerful tool in your toolbelt when building and managing products, you will get a return on investment everytime by spending the time to get your CI/CD pipeline setup right for your products. 

 
