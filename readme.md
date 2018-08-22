# ...

Currently there's no CRUD for users, so seed Adam Eve first.

Start:

```
npm start
```

### Sequelize gotchas

I really dislike Sequelize, but it may be because... no, it's just not that good. These are my personal notes on the little, very annoying gotchas one somehow is expected to know when using Sequelize ORM.

* When using `.findOrCreate()`, make sure you chain a `.spread(modelInstance, created)` instead of a `.then()`, otherwise modelInstance parameter will not be destructured and you can't do `modelInstance.id` ([explanation](https://github.com/sequelize/sequelize/issues/3865))
* Seed all by running `node_modules/.bin/sequelize db:seed:all`
* Undo all migrations by running `node_modules/.bin/sequelize db:migrate:undo:all`