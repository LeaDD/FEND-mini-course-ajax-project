
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    //STREETVIEW*****************************************

    //Create location string to feed to streetview API
    var preLoc = 'http://maps.googleapis.com/maps/api/streetview?size=600x300&location=';
    var address = $('#street').val() + ', ' + $('#city').val();

    //If the image element does not already exist then create
    //and configure it
    if($('.bgimg').length === 0) {
        var bgPic = document.createElement('img');
        bgPic.classList.add('bgimg');
        //Append the streetview image to the DOM
        document.body.appendChild(bgPic);
    };

    //Add or update image source value & greeting
    $('.bgimg').attr('src', preLoc + address);
    $greeting.text("So, you want to live at " + address + '?');

    //NYT*************************************************

    //Update section header with user's chosen city
    $nytHeaderElem.text('New York Times Articles about ' + $('#city').val());

    //Create URL to use for NYT API
    var nytUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
    nytUrl += address + '&' + $.param({
      'api-key': "42ad017c5fbe42dd9aa999eee93786bd"
    });

    //Fire AJAX request for articles
    $.getJSON(nytUrl, function(data) {
            //Variable to hold the response location for articles
            var articles = data.response.docs;

            //Iterate over articles
            for(var i = 0; articles.length > i; i++) {
                //Create list item for each article in array
                var article = document.createElement('li');

                //Configure each article with class and content from array
                article.innerHTML = '<a href ="'+ articles[i].web_url+'">'
                    +articles[i].headline.main+'</a>'+'<p>'+articles[i].snippet
                    +'</p>';
                article.classList.add('article');

                //Append to the unordered list node
                $nytElem.append(article);
            }
        }).fail(function(err) {
            $nytHeaderElem.text('New York Times Articles could not be loaded');
        });

    //WIKIPEDIA*******************************************

    //Create URL to use for Wikipedia API
    var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=query&titles='
        + $('#city').val()
        + '&redirects&prop=info&rvprop=content&rvsection=0&format=json&inprop=url';

    //Fire AJAX request for pages
    $.ajax({
        url: wikiUrl,
        dataType: 'jsonp',
        success: function(data) {
            //Variable to hold response object for pages
            var pagesObj = data.query.pages;

            //console.log(pagesObj);
            //console.log(Object.keys(pagesObj));

            //Iterate over the object and for each pageid (those are the keys
            //in the object) create a list node with the pages URL and title
            //var pageIds = [];
            for(prop in pagesObj) {
                var wiki = document.createElement('li');

                //Configure the list item
                wiki.innerHTML = '<a href="' + pagesObj[prop].fullurl + '">'
                    + pagesObj[prop].title + '</a>';

                    //Append to the unodered list node
                $wikiElem.append(wiki);
            }
        }
    });

    return false;
};

$('#form-container').submit(loadData);
