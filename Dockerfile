FROM node:18.14.2-alpine3.16 AS dev

RUN mkdir -p /home/app

WORKDIR /home/app

COPY package.json .

RUN npm i

EXPOSE 8080

CMD ["npm", "run", "start"]
