function(instance, context) {

/* eslint-disable no-console */
/* eslint-disable no-undef */


//Function to load scripts dynamically
function loadMapScript(filepath) {
    if ($('head script[src="' + filepath + '"]').length > 0)
        return;
    var ele = document.createElement('script');
    ele.setAttribute('type', 'text/javascript');
    ele.setAttribute('src', filepath);
    $('head').append(ele);
}

//Load API Key
$(document).ready(function () {
    setTimeout(function () {
        //https://stackoverflow.com/questions/9228958/how-to-check-if-google-maps-api-is-loaded
        if (typeof google === 'object' && typeof google.maps === 'object') {
            console.log('mapext api already loaded');
        } else {
            let key = window.gm_key; //Current key Bubble is using
            loadMapScript(`https://maps.googleapis.com/maps/api/js?key=${key}`);
            console.log('mapext api loaded');
        }
    }, 300);
});



//Create unique ID of instance
let instanceid = (Math.random() * Math.pow(2, 54)).toString(36);

//Create the DIV
let div;
div = $('<div class="gmapext" id="gmapext_' + instanceid + '"></div>');
instance.canvas.append(div);

//Capture Parent div
let parentDiv = $(div).parent();


//create instances
instance.data.instanceid = `gmapext_${instanceid}`;
instance.data.div = div;
instance.data.parentDiv = parentDiv;

}