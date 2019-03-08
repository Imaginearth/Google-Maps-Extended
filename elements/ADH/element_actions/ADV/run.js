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

//Load Properties
let traffic = properties.traffic;
let transit = properties.transit;
let bicycling = properties.bicycling;


//Add trafic layer
if (traffic){
    let trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(gmapext);
}

//Add transit layer
if (transit){
    let transitLayer = new google.maps.TransitLayer();
    transitLayer.setMap(gmapext);
}


//Add transit layer
if (bicycling){
    let bikeLayer = new google.maps.BicyclingLayer();
    bikeLayer.setMap(gmapext);
}


}