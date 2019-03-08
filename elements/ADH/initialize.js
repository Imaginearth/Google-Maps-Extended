function(instance, context) {

//Create unique ID of instance
let instanceid = (Math.random() * Math.pow(2, 54)).toString(36);


//Load API Key
//Get Bubble Dynamic List and store in a variable
let gmapAPI = context.keys['Google Maps API Key (Elements)'];

function loadMapScript(filepath) {
    if ($('head script[src="' + filepath + '"]').length > 0)
        return;
    var ele = document.createElement('script');
    ele.setAttribute('type', 'text/javascript');
    ele.setAttribute('src', filepath);
    $('head').append(ele);
}


  
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