const http = require('http');


const keepHerokuAlive = function () {
    setInterval(() => {
        const options = {
            host: 'limitless-oasis-97054.herokuapp.com',
            port: 80,
            path: '/'
        }
        http
            .get(options, (res) => {
                res.on('data', (chunk) => {
                    try {
                        console.log('heroku response: ' + chunk);
                    } catch (err) {
                        console.log(err.message);
                    }
                })
            })
            .on('error', (err) => {
                console.log('Error: ' + err.message);
            });
    }, 20 * 60 * 1000);
}

module.exports = {
    keepHerokuAlive,
}