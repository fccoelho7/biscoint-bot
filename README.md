# Biscoint Bot

Buy BTC automatically for you using Biscoint

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku CLI](https://cli.heroku.com/) installed.

```sh
$ git clone https://github.com/fccoelho7/biscoint-bot.git # or clone your own fork
$ cd biscoint-bot
$ yarn
$ yarn dev
```

Your app should now be running on [localhost:3000](http://localhost:3000/).

Don't forget to create a new `.env` file with yours.

## Deploying to Heroku

```
$ heroku create
$ git push heroku main
$ heroku open
```

or

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## Setting up a CRON job

1. Install Heroku Scheduler
1. Create a new job
1. Run the file `node ./services/buy.js`

## Documentation

For more information about using Node.js on Heroku, see these Dev Center articles:

- [Getting Started on Heroku with Node.js](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [Heroku Node.js Support](https://devcenter.heroku.com/articles/nodejs-support)
- [Node.js on Heroku](https://devcenter.heroku.com/categories/nodejs)
- [Best Practices for Node.js Development](https://devcenter.heroku.com/articles/node-best-practices)
- [Using WebSockets on Heroku with Node.js](https://devcenter.heroku.com/articles/node-websockets)
