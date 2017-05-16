
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // YOUR CODE GOES HERE!
    //Create location string to feed to streetview API
    var loc = "http://maps.googleapis.com/maps/api/streetview?size=600x300&location=" +
        $('#street').val() + $('#city').val();


    //Create and configure the image element
    var bgPic = document.createElement("img");
    bgPic.src = loc;
    bgPic.classList.add('bgimg');

    //Append the streetview image to the DOM
    document.body.appendChild(bgPic);

    return false;
};

$('#form-container').submit(loadData);
