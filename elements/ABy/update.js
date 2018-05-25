function(instance, properties, context) {

var directionDisplay;
  var directionsService = new google.maps.DirectionsService();
  var map;

  function initialize() {
    directionsDisplay = new google.maps.DirectionsRenderer();
    var chicago = new google.maps.LatLng(41.850033, -87.6500523);
    var myOptions = {
      zoom: 6,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      center: chicago
    }
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    directionsDisplay.setMap(map);
    calcRoute();
  }
  
  function calcRoute() {

    var request = {
        origin: new google.maps.LatLng(47.667853,-122.377425),
        destination: new google.maps.LatLng(32.813466,-117.156854),
        waypoints: [
		{location:new google.maps.LatLng(42.496403,-124.413128),stopover:true},{location:new google.maps.LatLng(42.044817,-124.249557),stopover:true}
		  ],
        optimizeWaypoints: true,
        travelMode: google.maps.DirectionsTravelMode.DRIVING
    };
    directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
        var route = response.routes[0];
      } else {
        alert("directions response "+status);
      }
    });
  };
  
    initialize();
    //Call the initMap Function to draw the map
  //$(document).ready(function(){
  // we call the function

//});


}