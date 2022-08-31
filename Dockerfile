FROM node:alpine

WORKDIR /user-app

ADD package*.json ./

RUN npm install

RUN npm install pm2 -g

ADD . .

CMD ["pm2-runtime", "server.js"]