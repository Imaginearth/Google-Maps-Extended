function(instance, properties, context) {


/*global google*/
//Events: https://developers.google.com/maps/documentation/javascript/events


//Load gmapext instances
let gmapext = instance.data.gmapext;

//Load Properties
let listener = properties.listener;


let keyword;
switch (listener) {
case 'Bounds Changed':
    keyword = 'bounds_changed';
    break;

case 'Center Changed':
    keyword = 'center_changed';
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



}