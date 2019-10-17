function(instance, properties, context) {

/*global google*/

//load Instances
//Load gmapext instances
let gmapext = instance.data.gmapext;
let getMapAddress = instance.data.getMapAddress;


//load Properties
let address = properties.address;
let center_to_address = properties.center_to_address;
let zoom = properties.zoom;
let zoom_level = properties.zoom_level;
let tooltip = properties.tooltip;
let info_window = properties.info_window;
let attach_event = properties.attach_event;
let mId = properties.mId;
let infowindow_maxwidth = properties.infowindow_maxwidth;
let custom_marker_image = properties.custom_marker_image;
let marker_icon_uri = properties.marker_icon_uri;

//Build Marker Obj
function markerObj(mMap, mposition, mTooltip) {
    let obj = {};
    obj.map = mMap;
    obj.position = getMapAddress(mposition);
    obj.animation = google.maps.Animation.DROP;
    if (mTooltip) {
        obj.tooltip = mTooltip;
    }

    // Custom Marker Attributes / Data / Key-Values
    obj.id = mId;

    if (custom_marker_image) {
        obj.icon = marker_icon_uri;
    }


    return obj;
}


//Display the marker on the map
let marker = new google.maps.Marker(markerObj(gmapext, address, tooltip));
//Add marker to list of all markers
instance.data.all_markers.push(marker);



//Determin additional settings
if (center_to_address) {
    gmapext.panTo(getMapAddress(address));
}

//Determin zoom level
if (zoom) {
    gmapext.setZoom(zoom_level);
}




//Add info window if available with event
if (info_window) {
    let infowindow = new google.maps.InfoWindow({
        'content': info_window,
        'maxWidth': (infowindow_maxwidth == null || infowindow_maxwidth == undefined || infowindow_maxwidth == 0) ? null : infowindow_maxwidth
    });
    marker.addListener('click', function () {
        infowindow.open(gmapext, marker);
    });
}

//Attach additional event that returns the marker id
if (attach_event) {
    marker.addListener('click', function () {
        //Update State and trigger event    
        instance.publishState('marker_clicked_lat',marker.position.lat());
        instance.publishState('marker_clicked_lng',marker.position.lng());
        instance.publishState('marker_clicked', marker.id);
        instance.triggerEvent('marker_clicked');
    });
}
    
}