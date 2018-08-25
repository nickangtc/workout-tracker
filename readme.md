# ...

Currently there's no CRUD for users, so seed Adam Eve first.

Start:

```
npm start
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

__Useful links for Sequelize__

* Sequelize's own [express example](https://github.com/sequelize/express-example)