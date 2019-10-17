function(instance, properties, context) {

//Load gmapext instances
let markerList = instance.data.all_markers;


// Sets the map on all markers in the array.
function setMapOnAll(map) {
    for (var i = 0; i < markerList.length; i++) {
        markerList[i].setMap(map);
    }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
    setMapOnAll(null);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
    clearMarkers();
    markerList = [];
    instance.data.all_markers= [];
}


deleteMarkers();


}