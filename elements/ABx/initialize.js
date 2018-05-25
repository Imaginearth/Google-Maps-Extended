function(instance, context) {
  
  

  function appendScript(filepath) {
    if ($('head script[src="' + filepath + '"]').length > 0)
        return;

    var ele = document.createElement('script');
    ele.setAttribute("type", "text/javascript");
    ele.setAttribute("src", filepath);
    $('head').append(ele);
}

function appendStyle(filepath) {
    if ($('head link[href="' + filepath + '"]').length > 0)
        return;

    var ele = document.createElement('link');
    ele.setAttribute("type", "text/css");
    ele.setAttribute("rel", "Stylesheet");
    ele.setAttribute("href", filepath);
    $('head').append(ele);
}


//Fetch keys, store instances & load appropriate scripts
if (context.keys["Elements Google Maps API Key"] !== undefined) {
  instance.data.gmapsapikey = context.keys["Elements Google Maps API Key"];
  appendScript('https://maps.googleapis.com/maps/api/js?key=' + instance.data.gmapsapikey);
}else {
  console.error("ERROR: GMaps Directions Element was added without specifying an API key in the plugin tab.  Please add an API key under section Elements Google Maps API Key and reload page!");
};

  
                var countId = (Math.random() * Math.pow(2, 54)).toString(36);


    var div;
    div = $('<div id="GMapsDirections_' + countId + '"'+ 'style="height: 100%;"></div>');


  instance.data.countId = countId;
   instance.canvas.append(div);
  
  



}