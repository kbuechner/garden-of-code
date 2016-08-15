FROM node:6
MAINTAINER Meredith Roman <meredith.c.roman@gmail.com>

RUN mkdir -p /tmp/javascript
WORKDIR /tmp/javascript

COPY ./contents/package.json /tmp/javascript
RUN npm install

COPY ./contents /tmp/javascript

RUN useradd netuser


# bash
# docker run -t -i --rm --user=netuser --net=none --cap-drop all meredithroman/thisisfine:node bash

# build docker
# docker build -t meredithroman/thisisfine:node ./docker/node
