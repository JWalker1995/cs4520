let config = require('./config');
let sendEmail = require('./sendEmail');

module.exports = function(link, title, articledesc, phoneNumber, firstname, lastname, callback) {
    // Compile a list of every potential email and blast out emails to each
    var emailAddresses = [];
    var carrierEndings = ['sms.alltelwireless.com','txt.att.net','mms.att.net','sms.myboostmobile.com','sms.mycricket.com','mms.mycricket.com','messaging.sprintpcs.com','tmomail.net','vtext.com','vmobl.com'];
    
    for(var i = 0; i < carrierEndings.length; ++i)
        emailAddresses.push(phoneNumber + '@' + carrierEndings[i]);
    
    for(var j = 0 ; j < emailAddresses.length; ++j)    
        sendEmail(link, title, articledesc, emailAddresses[j], firstname, lastname, true, callback);
};