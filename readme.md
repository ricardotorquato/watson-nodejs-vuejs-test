# IBM Watson + Node.JS + Vue.JS

## About Project
I've built this project to learn a little bit about IBM Watson. It's a simple back-end built in Node.JS + a front-end with a single component (yeah, I should refactory that) built in Vue.JS.

## Configuration
You need to add your keys on the `./webapi/config.json` file.

```
{
    "assistant" : {
        "url"      : "https://gateway.watsonplatform.net/assistant/api",
        "username" : "#########################",
        "password" : "#########################",
        "version"  : "2018-09-16"
    },
    "workspace" : "#########################"
}
```

## Run with docker compose
You can run both back-end and front-end by using docker compose:

```
docker-compose up
```

## Run back-end without docker compose
Inside `./webapi` you can use the following to run the Node.JS project:

```
node index.js
```

## Run front-end without docker compose
Inside `./web/src` you can use the following to run the Vue.JS project:

```
vue serve
```

## Ports

The back-end runs on `http://localhost:3000` and have just one endpoint `[POST] /conversation` that receives an object with the `text` in the body like this

```
{
    "text": "Olá"
}
```

The front-end runs on `http://localhost:8080`