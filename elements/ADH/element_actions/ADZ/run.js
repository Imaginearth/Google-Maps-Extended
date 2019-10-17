function(instance, properties, context) {

/* eslint-disable no-undef */
//Load gmapext instances
let gmapext = instance.data.gmapext;
let getMapAddress = instance.data.getMapAddress;

//Load properties
let origin_address = properties.origin_address;
let destination_address = properties.destination_address;
let travel_mode = properties.travel_mode;
let unit_system = properties.unit_system;
let avoid_tolls = properties.avoid_tolls;
let avoid_ferries = properties.avoid_ferries;
let avoid_highways = properties.avoid_highways;
let optimize_waypoints = properties.optimize_waypoints;
let waypoints_list = [];
properties.waypoints_list != null ? waypoints_list = properties.waypoints_list.get(0, properties.waypoints_list.length()) : waypoints_list = [];
let driving_options = properties.driving_options;
let transit_options = properties.transit_options;



//Determin unit system
function getUnitSystem() {
    let v;
    switch (unit_system) {
    case 'Metric':
        v = google.maps.UnitSystem.METRIC;
        break;

    case 'Imperial':
        v = google.maps.UnitSystem.IMPERIAL;
        break;

    default:
        v = google.maps.UnitSystem.METRIC;
        break;
    }

    return v;
}


//Build directions object
function initDirections() {

    let obj = {};

    //Main keys
    obj.origin = getMapAddress(origin_address);
    obj.destination = getMapAddress(destination_address);
    obj.travelMode = travel_mode.toUpperCase();
    obj.unitSystem = getUnitSystem();

    //Avoid options
    if (avoid_tolls) {
        obj.avoidTolls = avoid_tolls;
    }

    if (avoid_ferries) {
        obj.avoidFerries = avoid_ferries;
    }

    if (avoid_highways) {
        obj.avoidHighways = avoid_highways;
    }

    //Waypoints
    if (waypoints_list.length > 0) {
        let waypts = [];
        for (let i = 0; i < waypoints_list.length; i++) {
            waypts.push({
                'location': getMapAddress(waypoints_list[i]),
                'stopover': true,
            });
        }
        obj.waypoints = waypts;

        //optimize
        if (optimize_waypoints) {
            obj.optimizeWaypoints = optimize_waypoints;
        }
    }

    //Driving options
    if (driving_options.length > 0) {
        let doObj = {};
        for (let i = 0; i < driving_options.length; i++) {
            if (driving_options[i].key === 'departureTime') {
                let setDate = new Date(driving_options[i].value).getTime(); //get current milliseconds from epoch
                let nowDate = Date.now(); //get current milliseconds  in epoch
                let depDate = nowDate - setDate; //calculate offset of time in milliseconds 
                doObj.departureTime = new Date(Date.now() + depDate); // pass as Date object
            }
            if (driving_options[i].key === 'trafficModel') {
                doObj.trafficModel = driving_options[i].value;
            }
        }
        obj.drivingOptions = doObj;
    }

    //Transit Options
    if (transit_options.length > 0){
        //TODO: Add travel options
        // eslint-disable-next-line no-console
        console.log('Travel options are not configured.  Please reach out to the plugin developer...');
    }

    return obj;
}


//Calculate and display
function calcRoute() {
    //Init the directions service
    let directionsService = new google.maps.DirectionsService();
    let directionsDisplay = new google.maps.DirectionsRenderer();

    //Attach the service to the map
    directionsDisplay.setMap(gmapext);
    directionsService.route(initDirections(), function (result, status) {
        if (status == 'OK') {
            directionsDisplay.setDirections(result);
        }
    });
}

//Execute the directions
calcRoute();

}