let fs = require('fs');
let url = require('url');
let https = require('https');
let crypto = require('crypto');
let async = require('async');
let db = require('./db');
let search = require('./search');

let config = require('./config');

module.exports = function(userid, callback) {
    // this will need to pull the watchlist entries for user from database
    let watchlistEntries = [];
    let watchlistRequest = [];
    let watchlistResults = [];
    db.query('SELECT link, searchkeyword FROM watchedarticle WHERE userid = $1::int', [userid], function (err, res) {
        if (err) console.log(err);
        else {
            console.log(res);
            for (var i = 0; i < res.rows.length; ++i) {
                var link = res.rows[i]["link"];
                var urlObj = url.parse(link, false, false);
                watchlistEntries[i] = { hostSite : urlObj.hostname, keywords :  res.rows[i]['searchkeyword']};
            }
            
                for (var i = 0; i < watchlistEntries.length; ++i) {
                    let hostSite = watchlistEntries[i]['hostSite'];
                    let keywords = watchlistEntries[i]['keywords'];
                    
                    let newRequest = function(innerCallback) {
                        search('site:' + hostSite + ' ' + keywords, innerCallback);
                    };
    
                    watchlistRequest.push(newRequest);
            }
            
            async.parallel(watchlistRequest, function () {
                callback(watchlistResults);
            });
        }
    });
    
    function processResponse(data, innerCallback) {
        let obj = JSON.parse(data);
        let items = obj.items;
    console.log(data);
        if (typeof (items) != 'undefined') {
            for (var i = 0; i < items.length; ++i) {
                let watchlistResponse = { 'link': items[i]['link'], 'htmlTitle': items[i]['htmlTitle'], 'htmlSnippet': items[i]['htmlSnippet'] };
                watchlistResults.push(watchlistResponse);
            }
        }
    
        innerCallback();
    }
    
//    for (var i = 0; i < watchlistEntries.length; ++i) {
//        let hostSite = watchlistEntries[i]['hostSite'];
//        let keywords = watchlistEntries[i]['keywords'];
    
//        let newRequest = function (innerCallback) {
//            let path = url.format({
//                'protocol': 'https',
//                'hostname': 'www.googleapis.com',
//                'pathname': '/customsearch/v1',
//                'query': {
//                    'key': config.search.api_key,
//                    'cx': config.search.search_engine,
//                    'q': 'site:' + hostSite + ' ' + keywords,
//                },
//            });
    
//            https.get(path, function (res) {
//                let data = '';
//                res.on('data', function (chunk) {
//                    data += chunk.toString();
//                });
//                res.on('end', function () {
//                    processResponse(data, innerCallback);
//                });
//            }).on('error', function (err) {
//                throw err;
//            });
//        };
    
//        watchlistRequest.push(newRequest);
//    }
    
//    async.parallel(watchlistRequest, function () {
//        callback(watchlistResults);
//    });
};