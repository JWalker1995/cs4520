let express = require('express');

let config = require('./config');

let app = express();

app.get('/', function(req, res) {
    res.send('Hello World!');
});

app.listen(config.http_port, function() {
    console.log('App listening on port ' + config.http_port);
});
