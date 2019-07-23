function(instance, properties, context) {

/*global google*/
//Events: https://developers.google.com/maps/documentation/javascript/events


//load Instances
let div = instance.data.div;
let instanceid = instance.data.instanceid;
//Load properties
let map_type = properties.map_type;
let center_location = properties.center_location;
let zoom = properties.zoom;


//Builds a single address or array of locations
let getMapAddress = function initAddress(bubbleGeoAddress) {
    let obj = {};
    if (bubbleGeoAddress.prop && bubbleGeoAddress.prop.constructor === Array) {
        //this is an array process as an array of objects {lat: -34.397, lng: 150.644}
    } else {
        obj.lat = bubbleGeoAddress.lat;
        obj.lng = bubbleGeoAddress.lng;
    }
    return obj;
};
//Attach function to instance
instance.data.getMapAddress = getMapAddress;

//Determin Map type
let getMapType = function initType(typeString) {
    let mapTypeSwitch;
    switch (typeString.toLowerCase()) {
    default:
        mapTypeSwitch = 'roadmap';
        break;

    case 'roadmap':
        mapTypeSwitch = 'roadmap';
        break;

    case 'satellite':
        mapTypeSwitch = 'satellite';
        break;

    case 'hybrid':
        mapTypeSwitch = 'hybrid';
        break;

    case 'terrain':
        mapTypeSwitch = 'terrain';
        break;
    }

    return mapTypeSwitch;
};
//Attach function to instance
instance.data.getMapType = getMapType;


//Building map object
function initObj(geoCenter, type, zoom) {
    let obj = {};

    //Determine center
    obj.center = getMapAddress(geoCenter);
    obj.mapTypeId = getMapType(type);
    obj.zoom = zoom;

    return obj;
}


//Init Map
function initMap() {
    //Init the map and add to instance
    instance.data.gmapext = new google.maps.Map(document.getElementById(instanceid), initObj(center_location, map_type, zoom));
}


//Start the map
$(document).ready(function(){
    setTimeout(function(){
 
        initMap();
 
    },1000);
});
    
}