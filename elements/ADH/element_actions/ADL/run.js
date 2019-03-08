function(instance, properties, context) {

/*global google*/
/*global infowindow*/
//load Instances
let div = instance.data.div;
let instanceid = instance.data.instanceid;


//Load gmapext instances
let gmapext = instance.data.gmapext;
let getMapAddress = instance.data.getMapAddress;
let getMapType = instance.data.getMapType;


//load Properties
let map_type = properties.map_type;
let address = properties.address;
let center_to_address = properties.center_to_address;
let tooltip = properties.tooltip;
let info_window = properties.info_window;
let attach_event = properties.attach_event;

//Build Marker Obj
function markerObj(position, map, markerTitle) {
    let obj = {};
    obj.position = getMapAddress(position);
    obj.map = map;

    if (markerTitle) {
        obj.title = markerTitle;
    }
    return obj;
}


//Determin additional settings
if (center_to_address) {
    gmapext.setCenter(getMapAddress(address));
}

//Set maptype
gmapext.setMapTypeId(getMapType(map_type));

//Display marker
var marker = new google.maps.Marker(markerObj(address, gmapext, tooltip));

//Add info window
if (info_window) {
    let infowindow = new google.maps.InfoWindow({
        'content': info_window
    });

    marker.addListener('click', function () {
        infowindow.open(gmapext, marker);
        //Update State and trigger event
        if (attach_event) {
            instance.publishState('marker_clicked', address);
            instance.triggerEvent('marker_clicked');
        }
    });
}

}