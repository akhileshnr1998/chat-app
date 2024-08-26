# scalable-chat-app

Attempt to create a chat app using web sockets and made scalable using Redis Pub/Sub

## Steps to test it out

### Pre-requisites

1. Install node
2. Install docker and docker-compose

### Install node modules

```sh
npm i
```

### Install redis using docker-compose file

```sh
sudo docker-compose up
```

### Initialise server

1. In development (watch) mode

```sh
npm run dev
```

1. In production mode

```sh
npm start
```
