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

let make_item = function(item, number) {
    return '<li><a href="#" onclick="saveToWatchlist(\'' + item.link + '\', \'' + $('#search_term').val() +'\', \'' + item.htmlSnippet.replace('\n', '') + '\', \'' + item.htmlTitle.replace('\n', '') 
        + '\');">Save to watchlist</a><br /><strong><a href="' + item.link + '">' + item.htmlTitle + '</a></strong> - ' + item.htmlSnippet 
        + '<br /><a href="#" onclick="sendEmail(\'' + item.link + '\', \'' + item.htmlTitle.replace('\n', '') + '\', \'' + item.htmlSnippet.replace('\n', '') + '\', $(\'#textfield_' + number + '\').val());">Shared via email</a> <input type="text" id="textfield_' + number +'" />' + '<br /></li>';
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

function saveToWatchlist(url, keyword, articleDesc,  title) {
    console.log(url);
    console.log(keyword);
    console.log(articleDesc);
    console.log(title);
    $.ajax({
            'method': 'POST',
            'url': '/saveToWatchlist',
            'data' : {
                'link' : url,
                'searchkeyword' : keyword,
                'articledesc' : articleDesc,
                'title' : title
            }
        }).done(function(obj) {});
}

function deleteFromWatchlist(watchedarticleid) {
        $.ajax({
            'method': 'POST',
            'url': '/deleteFromWatchlist',
            'data' : {
                'watchedarticleid' : watchedarticleid
            }
        }).done(function(obj) {});
}

let make_watchlist_item = function(item) {
    return '<li><strong><a href="' + item.link + '">' + item.htmlTitle + '</a></strong> - ' + item.htmlSnippet + '</li>';
};

let make_watched_articles_item = function(item) {
    //console.log('<li><a href="#">Remove from watchlist</a><br />Keywords used for search: ' + item.searchkeyword + '<br />' + '<a href="' + item.link + '">' + item.title + '</a>'  + item.articledesc + '</li>');
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

$(document).ready(function () {
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
        console.log(watchedArticles);
        watchedArticles.empty();
        obj.forEach(function(item) {
            watchedArticles.append(make_watched_articles_item(item));
        });
    });
});


