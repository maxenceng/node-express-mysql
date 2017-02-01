const YOUR_SECRET_PASSWORD = ''

// Configuration file for our database
module.exports = {
    development: {
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            user: 'root',
            database: 'myapp',
            password: YOUR_SECRET_PASSWORD
        }
    },
    production: {
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            user: 'root',
            database: 'myapp',
            password: YOUR_SECRET_PASSWORD
        }
    }
}


