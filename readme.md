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
* In a query with associated model instance, use `include: [{ model: Workout, attributes: [...] }]` to specify what fields to return from that model

__Useful links for Sequelize__

* Sequelize's own [express example](https://github.com/sequelize/express-example)