let express = require('express');
let bodyParser = require('body-parser');

let config = require('./config');
let search = require('./search');

let app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    'extended': true,
}));

app.get('/', function(req, res) {
    res.send('Hello World!');
});

app.post('/search', function(req, res) {
    search(req.body.term, function() {
    });
});

app.listen(config.http_port, function() {
    console.log('App listening on port ' + config.http_port);
});
