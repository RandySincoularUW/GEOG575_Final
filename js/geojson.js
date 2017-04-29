//* Name: 		geojson.js
//* Purpose: 	Reade geoJSON formatted data and display on Leaflet map
//* History:  	4-Feb-17	Randy Sincoular
//* ----------------------------------------------------------------------

//* Use jQuery & AJAX to load the geoJSON data



function onEachFeature(feature, layer) {

	//* No field named 'popupContent', so create html string using all fields/properties
	var popupContent = "";

	if (feature.properties) {

		//* Loop through all features
		//* and add feature property names (fields) and values to html string
		for (var property in feature.properties){

			// this prints out the value of each field
			// console.log("property: ",feature.properties[property]);
			
			var myValue = String(feature.properties[property]);
			console.log("myValue: ", myValue, " property: ",property);

			//* Do Not Include 'Area' or 'FIPS' Columns in the Popup
			if (property != 'Area' && property != 'FIPS'){
				popupContent += "<p>" + property + ": " + feature.properties[property] + "</p>";
			};

		} // end for()
		
		layer.bindPopup(popupContent);
	};

};  // end onEachFeature()

function readGeoJSONData(map){
  		$.ajax("data/map.geojson", {
        dataType: "json",
        success: function(response){

        	// Modify Marker Point Symbol 
        	var geoJSONMarkerOptions = {
        		radius: 6,
        		fillColor: "green",
        		color: "#000",
        		weight: 1,
        		opacity: 1,
        		fillOpacity: .6
        	};

            // Create a Leaflet GeoJSON layer and add it to the map
            L.geoJson(response,{

            	//* Add a Popup for each feature
            	onEachFeature: onEachFeature,

            	//* Create a marker symbol for each feature
            	pointToLayer: function (feature, latlng){
            		return L.circleMarker(latlng, geoJSONMarkerOptions);
            	}

            	

            }).addTo(map);
        }
    });

 };  // end readGeoJSONData()

//* Read and display the geoJSON data
// readGeoJSONData(map);
