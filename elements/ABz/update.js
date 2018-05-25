function(instance, properties, context) {
function(instance, properties, context) {

  //example http://jsfiddle.net/alifarahat/2ae6uvvy/2/
  
  //Creates google.maps.latLng from Lat/Lng
    function getLatLngFromString(lati,long) {
    return new google.maps.LatLng(parseFloat(lati), parseFloat(long)); 
}


  
function initMap() {

  //Load locations from array in lat/lng & info details
var vlat = [-33.718234,-33.727111,-33.848588,-33.851702,-34.671264,-35.304724,-36.817685,-36.828611,-37.750000,-37.759859,-37.765015,-37.770104,-37.773700,-37.774785,-37.819616,-38.330766,-39.927193,-41.330162,-42.734358,-42.734358,-42.735258,-43.999792
];
var vlng = [150.363181,150.371124,151.209834,151.216968,150.863657,148.662905,175.699196,175.790222,145.116667,145.128708,145.133858,145.143299,145.145187,145.137978,144.968119,144.695692,175.053218,174.865694,147.439506,147.501315,147.438000,170.463352
];
  var vinfo = ["Test 2","Test 3","Test 4","Test 5","Test 6","Test 7","Test 8","Test 9","Test 10","Test 11","Test 12","Test 13","Test 14","Test 15","Test 16","Test 17","Test 18","Test 19","Test 20","Test 21","Test 22","Test 23"
]
  var latlngbounds = new google.maps.LatLngBounds();
var locations = [];
for (var i = 0; i < vlat.length; i++)
{
    locations.push({ lat: vlat[i], lng: vlng[i],info: vinfo[i]});
    latlngbounds.extend(getLatLngFromString(vlat[i],vlng[i]));
};


console.log(locations);
console.log(latlngbounds)


  //Build Map options
var myLatlng = new google.maps.LatLng(-15.7942357, -47.8821945);
var mapOptions = {
  zoom: 8,
  center: myLatlng,
  mapTypeId: 'satellite'
};
  //initalize the map with the set optons
var map = new google.maps.Map(document.getElementById('map'),
    mapOptions);
    map.fitBounds(latlngbounds);
  
          // Create an array of alphabetical characters used to label the markers.
        var vtitle = ["A","B","C","D","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","HELLO","X","Y","Z"];
  
  
  var infoWin = new google.maps.InfoWindow();
  // Add some markers to the map.
  // Note: The code uses the JavaScript Array.prototype.map() method to
  // create an array of markers based on a given "locations" array.
  // The map() method here has nothing to do with the Google Maps API.
  
  
  var markers = locations.map(function(location, i) {
    var marker = new google.maps.Marker({
      position: location,
      label: vtitle[i],
      title: "Hello World"
    });
    google.maps.event.addListener(marker, 'click', function(evt) {
      infoWin.setContent(location.info);
      infoWin.open(map, marker);
    })
    return marker;
  });

  // markerCluster.setMarkers(markers);
  // Add a marker clusterer to manage the markers.
  var markerCluster = new MarkerClusterer(map, markers, {
    imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
  });

}



    //Call the initMap Function to draw the map
  $(document).ready(function(){
  // we call the function
  initMap();
});

	

}


}