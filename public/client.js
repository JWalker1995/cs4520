function escapeHtml(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

$(function() {
    let $search_term = $('#search_term');
    let $news_list = $('#news_list');
    $('#search_button').on('click', function() {
        $.ajax({
            'method': 'POST',
            'url': '/search',
            'data': {
                'term': $search_term.val(),
            },
            'dataType': 'json',
        }).done(function(obj) {
            var val = 0;
            $news_list.empty();
            obj.items.forEach(function(item) {
                ++val;
                $news_list.append(make_item(item, val));
            });
        });
    });
});

let update_watchlist = function () {
    let watchlist = $('#watchlist_updates');
    let watchedArticles = $('#watched_article_list');
    $.ajax({
        'method': 'POST',
        'url': '/viewWatchlistUpdate',
        'dataType': 'json',
    }).done(function(obj) {
        watchlist.empty();
        obj.forEach(function(item) {
            watchlist.append(make_watchlist_item(item));
        });
    });
    
    $.ajax({
        'method' : 'POST',
        'url' : '/getWatchedArticles',
        'dataType' : 'json'
    }).done(function(obj) {
        watchedArticles.empty();
        obj.forEach(function(item) {
            watchedArticles.append(make_watched_articles_item(item));
        });
    });
};

let make_item = function(item, number) {
    let save_code = 'saveToWatchlist(' + JSON.stringify(item.link) + ', ' + JSON.stringify($('#search_term').val()) + ', ' + JSON.stringify(item.htmlSnippet) + ', ' + JSON.stringify(item.htmlTitle) + ')';
    let email_code = 'sendEmail(' + JSON.stringify(item.link) + ', ' + JSON.stringify(item.htmlTitle) + ', ' + JSON.stringify(item.htmlSnippet) + ', $(\'#textfield_' + number + '\').val()))';
    let sms_code = 'sendSMS(' + JSON.stringify(item.link) + ', ' + JSON.stringify(item.htmlTitle) + ', ' + JSON.stringify(item.htmlSnippet) + ', $(\'#textfield_' + number + '\').val()))';
    
    return '<li><a href="#" onclick="' + escapeHtml(save_code) + '">Save to watchlist</a><br /><strong><a href="' + item.link + '">' + item.htmlTitle + '</a></strong> - ' + item.htmlSnippet 
        + '<br /><a href="#" onclick="' + escapeHtml(email_code) + '">Share via email</a> <input type="text" id="textfield_' + number +'" />' + '<br />' 
        + '<br /><a href="#" onclick="' + escapeHtml(sms_code) + '">Share via Text</a><br /></li>';
};

function sendEmail(link, title, articledesc, emailaddress) {
    $.ajax({
        'method' : 'POST',
        'url' : '/sendEmail',
        'data' : {
            'link' : link,
            'title' : title,
            'articledesc' : articledesc,
            'emailaddress' : emailaddress
        }
    });
}

function sendSMS(link, title, articledesc, phonenumber) {
    $.ajax({
        'method' : 'POST',
        'url' : '/sendSMS',
        'data' : {
            'link' : link,
            'title' : title,
            'articledesc' : articledesc,
            'emailaddress' : phonenumber
        }
    });
}

function saveToWatchlist(url, keyword, articleDesc,  title) {
    $.ajax({
            'method': 'POST',
            'url': '/saveToWatchlist',
            'data' : {
                'link' : url,
                'searchkeyword' : keyword,
                'articledesc' : articleDesc,
                'title' : title
            }
        }).done(update_watchlist);
}

function deleteFromWatchlist(watchedarticleid) {
        $.ajax({
            'method': 'POST',
            'url': '/deleteFromWatchlist',
            'data' : {
                'watchedarticleid' : watchedarticleid
            }
        }).done(update_watchlist);
}

let make_watchlist_item = function(item) {
    return '<li><strong><a href="' + item.link + '">' + item.htmlTitle + '</a></strong> - ' + item.htmlSnippet + '</li>';
};

let make_watched_articles_item = function(item) {
    return '<li><a href="#" onclick="deleteFromWatchlist(' + item.watchedarticleid + ');">Remove from watchlist</a><br />Keywords used for search: ' + item.searchkeyword + '<br />' + '<a href="' + item.link + '">' + item.title + '</a> Description:&nbsp;'  + item.articledesc + '</li>';  
};

let showWatchedArticles = function() {
    var modal = document.getElementById('watched_articles');
    
    modal.style.display = "block";
};

let closeWatchedArticles = function() {
    var modal = document.getElementById('watched_articles');
    
    modal.style.display = "none";
}

$(document).ready(update_watchlist);
