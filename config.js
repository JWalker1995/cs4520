module.exports = {
    'http_port': process.env.PORT || 1234,
    'http_ip': process.env.IP || 'localhost',
    'search': {
    },
    'pg': {
        'host': 'localhost',
        'user': 'server', //env var: PGUSER
        'database': 'power_newser', //env var: PGDATABASE
        'port': 5432, //env var: PGPORT
        'max': 10, // max number of clients in the pool
        'idleTimeoutMillis': 30000, // how long a client is allowed to remain idle before being closed
    },
};

let secret = require('./secret');
module.exports = Object.assign(module.exports, secret);
