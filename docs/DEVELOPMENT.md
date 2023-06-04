# Development environment setup
Head to the generic [instructions](https://github.com/jg-full-stack-projects/development/blob/master/DEVELOPMENT.md) first. The instructions below will be specific to this repository

# Environment variables
An example env file is provided (development and production are identical), if you are deploying to a production(like) environment make sure you change the following varaiables:
|Variable|
|--------|
|POSTGRES_PASSWORD|
|JWT_SECRET|

The rest is optional (setting up the email is highly recommended though.)

# First time startup
When starting up the first time you will need to do some setting up (this might be the case when the user model is evolving too, to keep the database in sync.)

Start up the containers and then run the migrations
```
cd app
ln -snf ../.env .
npm run db:generate
npm run db:push
```