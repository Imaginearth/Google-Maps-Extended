function(instance, properties, context) {

    
    /*global google*/
//Events: https://developers.google.com/maps/documentation/javascript/events

//Load gmapext instances
let gmapext = instance.data.gmapext;

//Load Properties
let listener = properties.listener;
let delay = properties.delay;


let keyword;
let eventFunction;



switch (listener) {
case 'Bounds Changed':
    keyword = 'bounds_changed';
    eventFunction = function(){
        let obj= gmapext.getBounds();
        let ne = obj.getNorthEast();
        instance.publishState('map_bounds_northeast_lat',ne.lat());
        instance.publishState('map_bounds_northeast_lng',ne.lng());
        let sw = obj.getSouthWest();
        instance.publishState('map_bounds_southwest_lat',sw.lat());
        instance.publishState('map_bounds_southwest_lng',sw.lng());
    };
    break;

case 'Center Changed':
    keyword = 'center_changed';
    eventFunction = function(){
        let obj= gmapext.getCenter();
        instance.publishState('map_center_lat',obj.lat());
        instance.publishState('map_center_lng',obj.lng());
    };
    break;

case 'Click':
    keyword = 'click';
    break;

case 'Double Click':
    keyword = 'dblclick';
    break;

case 'Drag':
    keyword = 'drag';
    break;

case 'Drag End':
    keyword = 'dragend';
    break;

case 'Drag Start':
    keyword = 'dragstart';
    break;

case 'Heading Changed':
    keyword = 'heading_changed';
    break;

case 'Idle':
    keyword = 'idle';
    break;

case 'Map Type Changed':
    keyword = 'maptypeid_changed';
    break;

case 'Mouse Move':
    keyword = 'mousemove';
    break;

case 'Mouse Out':
    keyword = 'mouseout';
    break;

case 'Mouse Over':
    keyword = 'mouseover';
    break;

case 'Projection Changed':
    keyword = 'projection_changed';
    break;

case 'Resize':
    keyword = 'resize';
    break;

case 'Right Click':
    keyword = 'rightclick';
    break;

case 'Tiles Loaded':
    keyword = 'tilesloaded';
    break;

case 'Tilt Changed':
    keyword = 'tilt_changed';
    break;

case 'Zoom Changed':
    keyword = 'zoom_changed';
    break;

}


// Remove existing event liestner 
google.maps.event.clearListeners(gmapext, keyword);


//Attach Events with delay like this
google.maps.event.addListener(gmapext, keyword, (function () {
    let timer;
    return function () {
        clearTimeout(timer);
        timer = setTimeout(function () {
            if (eventFunction) eventFunction(); //check if the function exists first
            instance.publishState('event_listener_fired',keyword);
            instance.triggerEvent('event_listener');
        }, delay);
    };
}()));




}