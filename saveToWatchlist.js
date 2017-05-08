let fs = require('fs');
let url = require('url');
let https = require('https');
let crypto = require('crypto');
let async = require('async');
let db = require('./db');

let config = require('./config');

module.exports = function (link, articledesc, title, searchkeyword, userid, request, callback) {
    var insertStatement = 'INSERT INTO watchedarticle (link, articledesc, userid, searchkeyword, title) \n';
    insertStatement += 'VALUES ($1::varchar(200), $2::varchar(500), $3::int, $4::varchar(500), $5::varchar(500)); \n';
    db.query(insertStatement, [link, articledesc, userid, searchkeyword, title], function(err, res) {
        if (err) console.log(err);
    });
};