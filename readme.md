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

* When using `.findOrCreate()`, make sure you chain a `.spread(modelInstance, created)` instead of a `.then()`, otherwise modelInstance parameter will not be destructured and you can't do `modelInstance.id` ([explanation][sequelize_1])
* Same point on `findOrCreate()`, there's no need to re-specify in `default: {}` what has already been specified in the mandatory `where: {}` parameter
* Seed all by running `node_modules/.bin/sequelize db:seed:all`
* Undo all migrations by running `node_modules/.bin/sequelize db:migrate:undo:all`
* In a query, use `attributes` to specify what fields to return and use `include` to fetch associated model instance in the same query
* In a query with associated model instance, use `include: [{ model: workout, attributes: [...] }]` to specify what fields to return from that model

### Deployment with Heroku

* To run commands in Heroku CLI, run `heroku run <command>`. Example:
```
heroku run sequelize db:migrate --env production
```

* See heroku logs if app crashes or fails to load, run 
```
heroku logs --tail
```

__Useful links for Sequelize__

* Sequelize's own [express example][sequelize_2]

### Environment variables

* [dotenv][env_1] package only allows you to set new environment variables in a separate, uncommitted .env file ([issue][env_2]). Overwriting is not possible without writing some JavaScript in the main server.js file. That's kind of stupid, but it is what it is. 
* For something non-secret, the simplest way to set env variables (and overwrite existing value) is: 
```
process.env.TZ = 'UTC'
```

### Date, datetime, timezone

I've never really had the opportunity to design and develop an app from scratch for users in multiple timezones. But obviously, it is a requirement of most applications. Here are some takeaways from my few trips down the rabbit hole:

* The simplest setup recommended by many replies in [forums][tz_1] is to: (1) store all datetime in UTC format in the database, (2) obtain user's timezone from browser (and don't store timezone info in User table in the database), (3) convert to user's local time on the front-end
* One big problem with converting datetime on the front-end is deference of business logic to the front-end when it should be in the back. For example, in this workout tracker, I want to show users individual workouts by day (eg. bench press and squats on 30 Sep 2018). This grouping cannot be done in UTC in the backend, because if a user in Singapore (UTC+8) does an exercise at 7:50am and 8:10am on the same day, grouping them in the back-end will cause these two exercises to be grouped incorrectly - the first exercise falls into the group of exercises done one day before the second. The only way to do it is to keep that business logic on the presentation layer in the front-end.
* There is such a thing as a [tz database][tz_2] that can be seeded into a database for consistent back-end side reference and conversion.
* Timezone strings are a good, more or less future-proof way of storing a user's timezone in the database according to at least [this Stackoverflow question][tz_3] and my experience.
* Use [`Intl`][tz_4] object in modern browsers to obtain timezone strings. Specifically:
```javascript
Intl.DateTimeFormat().resolvedOptions().timeZone
```


<!-- links -->
[sequelize_1]: https://github.com/sequelize/sequelize/issues/3865
[sequelize_2]: https://github.com/sequelize/express-example
[env_1]: https://github.com/motdotla/dotenv
[env_2]: https://github.com/motdotla/dotenv/issues/199
[tz_1]: https://dev.to/mandarbadve/how-to-handle-date-date-time-and-timezone-in-api-ui-database-1o4k
[tz_2]: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
[tz_3]: https://stackoverflow.com/questions/33465054/storing-timezone-in-a-database
[tz_4]: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Intl