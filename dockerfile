FROM node:10-alpine

WORKDIR /usr/src
COPY package.json /usr/src

RUN npm install
 
COPY . /usr/src
ARG PORT
EXPOSE ${PORT}
CMD ["npm","start"]

