let fs = require('fs');
let url = require('url');
let https = require('https');
let crypto = require('crypto');

let config = require('./config');

module.exports = function(query, callback) {
    let cache_key = 'cache/search_' + crypto.createHash('md5').update(query).digest('hex') + '.json';

    fs.readFile(cache_key, function(err, data) {
        if (err && err.code === 'ENOENT') {
            execute_request();
        } else if (err) {
            throw err;
        } else {
            process_result(data);
        }
    });

    let execute_request = function() {
        let path = url.format({
            'protocol': 'https',
            'hostname': 'www.googleapis.com',
            'pathname': '/customsearch/v1',
            'query': {
                'key': config.search.api_key,
                'cx': config.search.search_engine,
                'q': query,
            },
        });

        console.log('Requesting ' + path);

        https.get(path, function(res) {
            console.log('statusCode:', res.statusCode);
            console.log('headers:', res.headers);

            let data = '';
            res.on('data', function(chunk) {
                data += chunk.toString();
            });
            res.on('end', function() {
                process_result(data);

                fs.writeFile(cache_key, data, function(err) {
                    if (err) throw err;
                });
            });
        }).on('error', function(err) {
            throw err;
        });
    };

    let process_result = function(data) {
        let obj = JSON.parse(data);
        return obj.items.map(function(item) {
            return {
                'link': item.link,
                'htmlTitle': item.htmlTitle,
            }
            let link = url.parse(item.link);
            let domain_key = link.hostname.replace(/[^a-zA-Z0-9_]/g, '_');
            let scraper = require('./scrapers/' + domain_key + '.js');
            scraper()
        });
    };
};
