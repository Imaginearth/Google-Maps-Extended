function(instance, properties, context) {


//Load gmapext instances
let gmapext = instance.data.gmapext;
let getMapType = instance.data.getMapType;


//load Properties
let map_type = properties.map_type;


//Set maptype
gmapext.setMapTypeId(getMapType(map_type));



}