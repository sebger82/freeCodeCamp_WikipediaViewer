$(function () {
    // variables devlaration
    var inputHtml, resultArr, language = 'pl';
    // function declaration
    function search() {
        // Ajax request, data type should be jsonp to avoid errors
        $.ajax({
            url: 'https://' + language + '.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=' + $('input').val(),
            dataType: 'jsonp',
            success: function (data) {
                // clear the current list in html
                $('ul').empty();
                // store data in the array
                resultArr = data.query.search;
                // for each result, generate the html list item
                for (var result in resultArr) {
                    inputHtml = '<li class="well"><a href="https://' + language + '.wikipedia.org/wiki/' + resultArr[result].title + '"target="_blank"><h3>' + resultArr[result].title + '</h3><p>' + resultArr[result].snippet + '</p></a></li>';
                    // display elements 
                    $('ul').append(inputHtml);
                }
            }
        });
    }
    // primary event to run
    $("form").on("submit", function (event) {
        event.preventDefault();
        search();
        //reset input field
        $(this).trigger("reset"); 
    });
    // language selectors
    $('#english').on("click", function(){
        $('h1').text('The Wikipedia Article Viewer!');
        $('.form-group').html('<label for="search">Search for information about</label><input name="search" type="search" placeholder="Enter phrase here" class="form-control" required id="search">');
        $('#question').text('Search');
        $('#button-random').html('<a role="button" class="btn btn-primary" href="https://en.wikipedia.org/wiki/Special:Random" target="_blank">Show random!</a>');
        $('#author').html('Author <a href="https://seb.wf">Sebastian Urbański</a>');
        language = 'en';
    });
    $('#polish').on("click", function(){
        $('h1').text('Wyszukiwarka artykułów na Wikipedii!');
        $('.form-group').html(' <label for="search">Wyszukaj informację na temat</label><input name="search" type="search" placeholder="Wpisz szukaną frazę" class="form-control" required id="search">');
        $('#question').text('Szukaj');
        $('#button-random').html('<a role="button" class="btn btn-primary" href="https://pl.wikipedia.org/wiki/Special:Random" target="_blank">Pokaż losowy!</a>');
        $('#author').html('Autor <a href="https://seb.wf">Sebastian Urbański</a>');
        language = 'pl';
    });  
});