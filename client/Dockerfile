FROM node:16.19.0

WORKDIR /app

COPY . /app/

RUN npm install && npm build

EXPOSE 80

CMD ["server", "start"]
