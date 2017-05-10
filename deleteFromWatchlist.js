let fs = require('fs');
let url = require('url');
let https = require('https');
let crypto = require('crypto');
let async = require('async');
let db = require('./db');

let config = require('./config');

module.exports = function (watchedArticleID, callback) {
    db.query('DELETE FROM watchedarticle WHERE watchedarticleid = $1::int', [watchedArticleID], function (err, res) {
        if (err) console.log(err);
        callback();
    });
};