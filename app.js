let pg = require('pg');
let express = require('express');
let bodyParser = require('body-parser');

let config = require('./config');
let search = require('./search');

let app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    'extended': true,
}));

app.post('/search', function(req, res) {
    search(req.body.term, function(obj) {
        res.end(JSON.stringify(obj));
    });
});

app.post('/save', function(req, res) {
});

app.listen(config.http_port, config.http_ip, function() {
    console.log('App listening on port ' + config.http_port);
});
