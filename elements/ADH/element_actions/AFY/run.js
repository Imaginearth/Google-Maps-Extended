function(instance, properties, context) {


/*global google*/
//Load gmapext instances
let gmapext = instance.data.gmapext;
//Load function
let getMapAddress = instance.data.getMapAddress;

//Load properties
let location = properties.location;
let adjust_zoom = properties.adjust_zoom;
let zoom_level = properties.zoom_level;


let bLoc = getMapAddress(location);
let loc = new google.maps.LatLng(bLoc.lat, bLoc.lng);
gmapext.setCenter(loc);

if (adjust_zoom){
    if (zoom_level >= 0)
        gmapext.setZoom(zoom_level);
}



}