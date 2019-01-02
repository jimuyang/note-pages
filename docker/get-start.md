

# 容器的好处
Flexible Lightweight Interchangeable Portable Scalable Stackable
* 弹性的 最复杂的应用也可以容器化
* 轻量 容器利用和分享了宿主机内核
* 可互换的 动态更新和部署
* 可移植的
* 可伸缩的
* 可堆叠的

## Image: an executable package that includes everything needed. (code, runtime, libraries, environment vars, conf files)

## Container: a runtime instance of an image -- what the image becomes in memory when executed (what is, an image with state, or a user process). You can see a list of your running containers with the command: docker ps.

## Virtual Machine: VM runs a full-blown 'guest' OS with virtual access to host resources through a hypervisor.

![container](https://docs.docker.com/images/Container%402x.png)

![virtualmachine](https://docs.docker.com/images/VM%402x.png)

## docker start
docker --version
docker info
docker version
docker run hello-world
docker image ls // list the images
docker container ls --all // list the containers
