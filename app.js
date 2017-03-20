let express = require('express');

let config = require('./config');
let search = require('./search');

let app = express();

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.send('Hello World!');
});

app.get('/search', function(req, res) {
    search('dogs', function() {
    });
});

app.listen(config.http_port, function() {
    console.log('App listening on port ' + config.http_port);
});
