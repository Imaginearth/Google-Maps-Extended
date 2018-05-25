function(instance, context) {

    var countId = (Math.random() * Math.pow(2, 54)).toString(36);


    var div;
    div = $('<div id="map_canvas" style="height: 100%;"></div>');


    instance.canvas.append(div);

}