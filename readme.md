# ...

Currently there's no CRUD for users, so seed Adam Eve first.

Start:

```
npm start
```

## First time setup

Create, migrate, and seed DB:

```
node_modules/.bin/sequelize db:create
node_modules/.bin/sequelize db:migrate
node_modules/.bin/sequelize db:seed:all
```

## Learnings

What's a technical side project without learnings?

### Express

* Response status can be chained: `res.status(500).json(error)`

### Sequelize

* When using `.findOrCreate()`, make sure you chain a `.spread(modelInstance, created)` instead of a `.then()`, otherwise modelInstance parameter will not be destructured and you can't do `modelInstance.id` ([explanation](https://github.com/sequelize/sequelize/issues/3865))
* Same point on `findOrCreate()`, there's no need to re-specify in `default: {}` what has already been specified in the mandatory `where: {}` parameter
* Seed all by running `node_modules/.bin/sequelize db:seed:all`
* Undo all migrations by running `node_modules/.bin/sequelize db:migrate:undo:all`
* In a query, use `attributes` to specify what fields to return and use `include` to fetch associated model instance in the same query
* In a query with associated model instance, use `include: [{ model: workout, attributes: [...] }]` to specify what fields to return from that model

### Deployment with Heroku

* To run commands in Heroku CLI, run `heroku run <command>`. Eg. `heroku run sequelize db:migrate --env production`
* See heroku logs if app crashes or fails to load, run `heroku logs --tail`

__Useful links for Sequelize__

* Sequelize's own [express example](https://github.com/sequelize/express-example)

### Environment variables

* [dotenv](https://github.com/motdotla/dotenv) package only allows you to set new environment variables in a separate, uncommitted .env file ([issue](https://github.com/motdotla/dotenv/issues/199)). Overwriting is not possible without writing some JavaScript in the main server.js file. That's kind of stupid, but it is what it is. 
* For something non-secret, the simplest way to set env variables (and overwrite existing value) is `process.env.TZ = 'UTC'`