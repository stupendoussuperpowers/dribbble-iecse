FROM node:alpine

WORKDIR /usr/src/api

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.6.0/wait /wait
RUN chmod +x /wait

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD /wait && npm start