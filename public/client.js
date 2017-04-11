$(function() {
    let $search_term = $('#search_term');
    $('#search_button').on('click', function() {
        $.ajax({
            'method': 'POST',
            'url': '/search',
            'term': $search_term.val(),
        });
    });
});
