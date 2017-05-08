let express = require('express');
let bodyParser = require('body-parser');
let session = require('express-session');

let config = require('./config');
let db = require('./db');
let search = require('./search');
let viewUpdateWatchlist = require('./viewWatchlistUpdates');
let getWatchedArticles = require('./getWatchedArticles');
let saveToWatchlist = require('./saveToWatchlist');
let deleteFromWatchlist = require('./deleteFromWatchlist');
let sendEmail = require('./sendEmail');
let app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    'extended': true,
}));
app.use(session({
    'secret': '713ld2v2f50B7193p8710E8o98263wHc',
    'resave': false,
    'saveUninitialized': true,
    'cookie': { 'secure': true },
}));

app.use(function(request, reply, next) {
    if (typeof request.session.views !== 'number') {
        request.session.views = 0;
    }
    request.session.views++;
    next();
});

app.post('/search', function(request, reply) {
    search(request.body.term, function(obj) {
        reply.end(JSON.stringify(obj));
    });
});

app.post('/saveToWatchlist', function(request, reply) {
    saveToWatchlist(request.body.link, request.body.articledesc, request.body.title, request.body.searchkeyword, 1, function(obj) {
        reply.end();
    });
});

app.post('/viewWatchlistUpdate', function(request, reply) {
    viewUpdateWatchlist(1, function(obj) {
        reply.end(JSON.stringify(obj));
    });
});

app.post('/getWatchedArticles', function(request, reply) {
    getWatchedArticles(1, function(obj) {
        reply.end(JSON.stringify(obj))
    });
});

app.post('/deleteFromWatchlist', function (request, reply) {
    deleteFromWatchlist(request.body.watchedarticleid, function (obj) { });
});

app.post('/sendEmail', function(request, reply) {
    sendEmail(request.body.link, request.body.title, request.body.articledesc, request.body.emailaddress, 'Test1', 'Test1', false, function () {reply.end()});
});

app.post('/save', function(request, reply) {
    if (!request.session.logged_in) {
        reply.status(403);
        reply.send('Not authorized');
        return;
    }
    
    db.query('SELECT $1::int AS number', ['2'], function(err, res) {
        if(err) {
            return console.error('error running query', err);
        }
        
        console.log('number:', res.rows[0].number);
    });
});

app.listen(config.http_port, config.http_ip, function() {
    console.log('App listening on port ' + config.http_port);
});
