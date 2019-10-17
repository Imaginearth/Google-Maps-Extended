function(instance, properties, context) {


/*global google*/

//Load gmapext instances
let allMarkers = instance.data.all_markers;

//Load Properties
let markerID = properties.marker_id;

function toggleBounce(marker) {
    if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}


allMarkers.forEach(e => {
    if (e.id == markerID) {
        toggleBounce(e);
    }
});


}