function(instance, properties, context) {

/*global google*/
//Load gmapext instances
let gmapext = instance.data.gmapext;
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