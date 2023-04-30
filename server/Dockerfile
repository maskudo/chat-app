FROM node:16

WORKDIR /usr/src/app

copy package*.json ./

RUN npm i --silent

COPY . .

EXPOSE 5000

CMD ["npm","start"]
