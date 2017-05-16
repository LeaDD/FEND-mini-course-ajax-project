
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

    return false;
};

$('#form-container').submit(loadData);
