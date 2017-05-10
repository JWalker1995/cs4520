let fs = require('fs');
let url = require('url');
let https = require('https');
let crypto = require('crypto');
let nodemailer = require('nodemailer');
let db = require('./db');

let config = require('./config');

module.exports = function (link, title, articledesc, emailaddress, firstname, lastname, isPhoneMessage, callback) {
        var subject = firstname + ' ' + lastname + ' has shared an article with you!';
        var textContent = firstname + ' ' + lastname + 'has shared an article with you:\n';
        var htmlContent = textContent;
        
        textContent += ' Title: ' + title + '\n' + 'Link: ' + link;
        htmlContent += '<a href="' + link + '">' + title + '</a>';
        
        // We need to send messages to SMS with no html, but we want to have 
        var message;
        if (isPhoneMessage)
        {
            textContent = 'Link: ' + link;
            
            message = {
                from: 'no-reply@powernewser.com',
                to: emailaddress,
                subject: subject,
                text: textContent,
                html: textContent
            };
        }
        else 
        {
            textContent += ' Title: ' + title + '\n' + 'Link: ' + link;
            htmlContent += '<a href="' + link + '">' + title + '</a>';
        
            message = {
                from: 'no-reply@powernewser.com',
                to: emailaddress,
                subject: subject,
                text: textContent,
                html: htmlContent
            };
        }
        
        var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {   
            user: 'noreplypowernewser@gmail.com',
            pass: 'PowerNewser' }
        });
        
        transporter.sendMail(message, function (err, info) {
            if (err) console.log(err);
            else
                console.log('message sent');
        });
        
        callback();
};