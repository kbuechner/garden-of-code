FROM node:6
MAINTAINER Meredith Roman <meredith.c.roman@gmail.com>

RUN mkdir -p /tmp/javascript
WORKDIR /tmp/javascript

COPY ./contents/package.json /tmp/javascript
RUN npm install

COPY ./contents /tmp/javascript

RUN useradd netuser


# sudo docker run -t -i --rm --user=netuser --net=none --cap-drop all meredithroman/thisisfine:v1 bash

# docker build -t meredithroman/thisisfine:node ./docker/node
