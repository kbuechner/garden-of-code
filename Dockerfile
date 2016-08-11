FROM node:6
MAINTAINER Meredith Roman <meredith.c.roman@gmail.com>

RUN mkdir -p /tmp/javascript
WORKDIR /tmp/javascript

COPY ./docker/node/package.json /tmp/javascript
RUN npm install

COPY ./docker/node /tmp/javascript

RUN useradd netuser


# sudo docker run -t -i --rm --user=netuser --net=none --cap-drop all meredithroman/thisisfine:v1 bash
