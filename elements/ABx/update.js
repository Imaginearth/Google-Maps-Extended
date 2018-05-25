function(instance, properties, context) {
  
  
  
  var countId = instance.data.countId;
  console.log(countId)
  

  
  
  $(window).on('load', function() {
    // your code here

  

    

    
      if (typeof google === 'object' && typeof google.maps === 'object'){
    console.log("Google Maps JS Loaded @@");
  }else{
    console.log("Google Maps JS NOT Loaded @@");
  }
    
      //Determin travel mode
  var vtravelmode
  if (properties.travel_mode == "Driving"){
    vtravelmode = google.maps.TravelMode.DRIVING;
  }else if( properties.travel_mode == "Bicycling"){
      vtravelmode = google.maps.TravelMode.BICYCLING;
    }else if (properties.travel_mode == "Transit" ){
      vtravelmode = google.maps.TravelMode.TRANSIT;
    }else if (properties.travel_mode == "Walking" ){
      vtravelmode = google.maps.TravelMode.WALKING;
    }
    
    

  //Set Variables
  //Zoom
  var vzoom = parseInt(properties.initial_zoom);
  console.log("vzoom: " + vzoom);
  
  //Center Map
  var vcenter_lng = properties.center_map_address.lng;
  var vcenter_lat = properties.center_map_address.lat;
  
  console.log("vcenter_lat: " + vcenter_lat);
  console.log("vcenter_lng: " + vcenter_lng);
  
  //Origin
  var vorigin_lat = properties.origin_address.lat;
  var vorigin_lng = properties.origin_address.lng;
  console.log("vorigin_lat: " + vorigin_lat);
  console.log("vorigin_lng: " + vorigin_lng);
  
  //Destination
  var vdest_lat = properties.destination_address.lat;
  var vdest_lng = properties.destination_address.lng;
  console.log("vdest_lat: " + vdest_lat);
  console.log("vdest_lng: " + vdest_lng);
  


  function initMap() {
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  var map = new google.maps.Map(document.getElementById('GMapsDirections_' + countId), {
    zoom: vzoom,
    center: {
      lat: vcenter_lat,
      lng: vcenter_lng
    }
  });
  
  
  //**  Enable below for Traffic layer
  //var trafficLayer = new google.maps.TrafficLayer();
  //trafficLayer.setMap(map);


  directionsDisplay.setMap(map);
  directionsService.route({
    origin: new google.maps.LatLng(vorigin_lat, vorigin_lng),
    destination: new google.maps.LatLng(vdest_lat, vdest_lng),
    travelMode: vtravelmode,
    unitSystem: google.maps.UnitSystem.METRIC
  }, 
  
  function(response, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
      var route = response.routes[0];
              for (var i = 0; i < route.legs.length; i++) {
          var routeSegment = i + 1;
          console.log(routeSegment);
          console.log( route.legs[i].start_address);
          console.log( route.legs[i].end_address);
          console.log( route.legs[i].distance.text);
        }
      computeTotalDistance(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
};
  
  
        function computeTotalDistance(result) {
      var totalDist = 0;
      var totalTime = 0;
      var myroute = result.routes[0];
      for (i = 0; i < myroute.legs.length; i++) {
        totalDist += myroute.legs[i].distance.value;
        totalTime += myroute.legs[i].duration.value;      
      }
console.log("Total Distance: " + totalDist);
          console.log("Total Time: " + totalTime);
      }
  
  
  //Call the initMap Function to draw the map
  //$(document).ready(function(){
  // we call the function
  initMap();
});

      


}