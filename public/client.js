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
            $news_list.empty();
            obj.items.forEach(function(item) {
                $news_list.append(make_item(item));
            });
        });
    });
});

let make_item = function(item) {
    return '<li><strong><a href="' + item.link + '">' + item.htmlTitle + '</a></strong> - ' + item.htmlSnippet + '</li>';
};
