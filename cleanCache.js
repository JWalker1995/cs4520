let path = require('path');
let fs = require('fs');

module.exports = function() {
    fs.readdir('cache', function(err, files) {
        if (err) {throw err;}
        files.forEach(function(file) {
            file = path.resolve('cache', file);
            fs.stat(file, function(err, stat) {
                if (err) {throw err;}
                let now = new Date().getTime();
                let exp_time = new Date(stat.ctime).getTime() + 3600000;
                if (now > exp_time) {
                    fs.unlink(file, function(err) {
                        if (err) {throw err;}
                    });
                }
            });
        });
    });
};