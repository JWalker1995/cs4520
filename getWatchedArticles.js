let url = require('url');
let https = require('https');
let crypto = require('crypto');
let async = require('async');
let db = require('./db');

let config = require('./config');

module.exports = function(userid, callback) {
    var watchedArticles = [{}];
    db.query('SELECT watchedarticleid, link, articledesc, searchkeyword, title FROM WatchedArticle WHERE UserID = $1::int', [userid], 
    function (err, res) {
        if (err) console.log(err);
        else {
            callback(res.rows);
        }
    });
};