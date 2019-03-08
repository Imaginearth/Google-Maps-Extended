function(instance, properties, context) {

//load Instances
let div = instance.data.div;
let instanceid = instance.data.instanceid;


//Load gmapext instances
let gmapext = instance.data.gmapext;
let getMapAddress = instance.data.getMapAddress;
let getMapType = instance.data.getMapType;


//load Properties
let map_type = properties.map_type;
let center_to_address = properties.center_to_address;
let zoom = properties.zoom;
let attach_event = properties.attach_event;
let types_to_plot = properties.types_to_plot;
let geolocation_field = properties.geolocation_field;
let label_field = properties.label_field;




//Get the address and build object array of lat/lng
let locations = []; //The array that will hold the list of markers

let arrayPlots; //Get Bubble list of GeoLocations
properties.types_to_plot != null ? arrayPlots = properties.types_to_plot.get(0, properties.types_to_plot.length()) : arrayPlots = [];
console.log('arrayPlots',arrayPlots);

//Cycle through each iteam and create a locations array with only lat and lng
for (var i = 0; i < arrayPlots.length; i++) {
    
    //Get the bubble Geo Location Object from arrayPlots
    let bubGeo = arrayPlots[i].get(geolocation_field);
    let bubLabel = arrayPlots[i].get(label_field);

    console.log('bubGeo', bubGeo);
    
    // Create new object and push to locations array
    let obj = {};
    obj.lat = bubGeo.lat;
    obj.lng = bubGeo.lng;
    obj.label = bubLabel;
    
    locations.push(obj);
}
    
    
console.log('locations', locations);



}