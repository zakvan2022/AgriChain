FROM ubuntu:16.04

RUN apt-get update

# Base utilities
RUN apt-get install -y sudo curl vim git python

# See: https://deb.nodesource.com/node_8.x/pool/main/n/nodejs/
RUN curl -o /tmp/nodejs.deb https://deb.nodesource.com/node_8.x/pool/main/n/nodejs/nodejs_8.10.0-1nodesource1_amd64.deb && dpkg -i /tmp/nodejs.deb
 

# Install mongodb shell
# See https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-16-04
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
RUN echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.2 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-3.2.list
RUN apt-get update
RUN apt-get install -y mongodb-org mongodb-org-shell mongodb-org-tools

RUN useradd ubuntu
RUN mkdir /home/ubuntu
RUN chown ubuntu:ubuntu /home/ubuntu

RUN ls /home

USER root

### Entry point
ENTRYPOINT ["sh","/home/ubuntu/agrichain/docker/webapp/entrypoint.sh"]
USER ubuntu
