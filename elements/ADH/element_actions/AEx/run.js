function(instance, properties, context) {

/*global google*/

//Load gmapext instances
let gmapext = instance.data.gmapext;
let getMapAddress = instance.data.getMapAddress;

//Load properties
let addressField = properties.address_field;
let idField = properties.id_field;
let tooltipField = properties.tooltip_field;
let infoWindowField = properties.info_window_field;
let markerIconField = properties.marker_icon_field;
let infowindow_maxwidth = properties.infowindow_max;
let attach_event = properties.attach_event;
let autoZoom = properties.auto_zoom;
let autoCenter = properties.auto_center;

//Functions
//Build Marker Obj
function markerObj(mMap, mAddress, mTooltip, mId, mIcon) {
    let obj = {};
    obj.map = mMap;
    obj.position = getMapAddress(mAddress);
    obj.animation = google.maps.Animation.DROP;
    if (mTooltip) {
        obj.tooltip = mTooltip;
    }
    // Custom Marker Attributes / Data / Key-Values
    obj.id = mId;
    if (mIcon) {
        obj.icon = mIcon;
    }
    return obj;
}




//This code get the list as an object which you can then iterate over
let objToFetch = properties.list_of_things.get(0, properties.list_of_things.length());
//Use this code if you need to examine the object length console.log('objToFetch',objToFetch.length);


//Get and add variables to plugin
objToFetch.forEach(e => {
    //get the values from the element
    let address = e.get(addressField);
    let id = e.get(idField);
    let tooltip = (tooltipField != undefined || tooltipField != null) ? e.get(tooltipField) : null;
    let infoWindow = (infoWindowField != undefined || infoWindowField != null) ? e.get(infoWindowField) : null;
    let markerIcon = (markerIconField != undefined || markerIconField != null) ? e.get(markerIconField) : null;

    //Display the marker on the map
    let marker = new google.maps.Marker(markerObj(gmapext, address, tooltip, id, markerIcon));
    //Add marker to list of all markers
    instance.data.all_markers.push(marker);

    //do the logic
    //Add info window if available with event
    if (infoWindow != null) {
        let infowindow = new google.maps.InfoWindow({
            'content': infoWindow,
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
            instance.publishState('marker_clicked_lat', marker.position.lat());
            instance.publishState('marker_clicked_lng', marker.position.lng());
            instance.publishState('marker_clicked', marker.id);
            instance.triggerEvent('marker_clicked');
        });
    }
});

if (autoCenter) {
    let markersArray = instance.data.all_markers;
    if (markersArray.length > 0){
        var bounds = new google.maps.LatLngBounds();
        markersArray.forEach(e => {
            let loc = new google.maps.LatLng(e.position.lat(), e.position.lng(),true);
            bounds.extend(loc);
        });
        gmapext.fitBounds(bounds);
    }
}
    
}