function(properties, context) {

function distance(lat1, lon1, lat2, lon2, unit) {
    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p) / 2 +
        c(lat1 * p) * c(lat2 * p) *
        (1 - c((lon2 - lon1) * p)) / 2;

    let r = 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km

    switch (unit) {
        case 'meter':
            b = r * 1000;
            break;

        case 'mile':
            b = r * 0.621371;
            break;

        case 'foot':
            b = r * 3280.84;
            break;

        case 'yard':
            b = r * 1093.61;
            break;

        default:
            b = r
            break;
    }

    return b;
}

    let m  = distance(properties.from_latitude, properties.from_longitude, properties.to_latitude, properties.to_longitude, properties.output_unit);

return {distance:m}



}