//* main.js by Randy Sincoular
//* 
//* Purpose:	GEOG 575. Final Project
//*
//* History
//* 10-Apr-17	Original Coding
//* 17-Apr-17	Added custom marker symbols for all features
//* 18-Apr-17	Created X, Y variables for icon sizes.  Reduced size of icons to 20,20
//*	18-Apr-17	Bolded popup for businesses and added phone number
//* 18-Apr-17	Add mouseover for businesses
//* 18-Apr-17	Added link to font-awesome and Home Button to zoom to Cottage Grove

"use strict";


//* Cottage Grove
//* var mymap = L.map('map').setView([43.076, -89.199], 7);

//* Fit Map to State of Wisconsin: Lower Right, Upper Left


var grayscale = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});


var streets = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});


//* Weather Radar
var nexrad = L.tileLayer.wms("http://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi", {
    layers: 'nexrad-n0r-900913',
    format: 'image/png',
    transparent: true,
    attribution: "Weather data © 2012 IEM Nexrad"
});

var myStyle = {
	"color" : "#ff7800",
	"weight" : 2,
	"opacity" : .5
};



// +++++++++++++++++++++++++++
//* Friday, 14-Apr-17
//* trying to add parcels as optional layer
/*
var parcelStyle = {
	opacity: .5,
	fillOpacity: .2
};

function createPointOverlay(data,layerName,style) {
	var overlay = L.geoJSON(data, {
		pointToLayer: function(feature, latlng) {
			return L.circleMarker(latlng, style);
		}
	});
	
	overlay.addTo(map);	// add the data to the map
	
	control.addOverlay(overlay,layerName);	// add the layer to the layer control
};

$.getJSON("data/cg_parcels.geojson", function(data) {createPointOverlay(data,"Parcel Boundaries",parcelStyle)});

var control = L.control.layers(baseMaps);
// control.addTo(map);
*/

// +++++++++++++++++++++++++++
// 14-apr-17
/*
var parcelLayer = L.geoJson("data/cg_places.geojson",{
	pointToLayer: function (feature,latlng) {
		return L.circleMarker(latlng, {
			opacity: .5
		});
	}
});
*/


// +++++++++++++++++++++++


function style(feature) {
	return {
		fillColor: "red",
		color: "green",
		opacity: .5
	};
};  // end style()

// var parcelLayer = L.geoJson("data/cg_parcels.geojson",{style: style}).addTo(map);	// 14-apr-17

//var test = 
	
// var myParcels = new L.LayerGroup(parcelLayer);			// 14-apr-17

//* Option for Two Different Basemaps
var baseMaps = {
	"Grayscale": grayscale,
	"OSM Streets": streets
};

//* Weather Radar Overlay, Parcel Layer Options
// Sat, 15-apr-17 move below
/*
var overlayMaps = {
	"WX Radar": nexrad,
	"Parcels": parcelLayer
};
*/

var mapBounds = new L.LatLngBounds(new 
	L.LatLng(41.473, -93.72),        //* Southwest Corner
	new L.LatLng(46.82, -84.95));	 //* Northeast Corner

// var fitMap = new L.LatLngBounds(new L.LatLng(46.326, -92.37), new L.LatLng(42.501, -88.104));

//* add Friday, 14-Apr-17
//* Initial Extent of Map: Cottage Grove, WI.  SW Corner, NECorner
var fitMap = new L.LatLngBounds(new L.LatLng(43.05878, -89.2237137), new L.LatLng(43.112944, -89.174309));


var counties;					//* Holds County population data
var popup = L.popup();


var map = L.map('map', {
	'zoomDelta': .2,			//* Control amount of zoom
	'zoomSnap': .5,				//* Give more granularity when zooming
	'maxBounds': mapBounds,		//* Restrict map view to Wisconsin
	'layers': [grayscale], 		//* Layer and basemap option
	'zoomControl': false 		//* Turn off zoom control
			 
}).fitBounds(fitMap);			//* Sets initial map view

/* almost like setting a max zoom out */
map.setMinZoom(6);

//* +++++++++++++++++++
//* Tuesday, 18-Apr-17

// Toggle for Home button
/*
L.easyButton('<img src="/icons/home.png">', function(btn, map){
    var CottageGrove = [43.076, -89.199];
    map.setView(CottageGrove);
}).addTo(map);
*/

var home = {
  lat: 43.076,
  lng: -89.199,
  zoom: 13
}; 

//* Home Button
L.easyButton("fa-home fa-fw",function(btn,map){
  map.setView([home.lat, home.lng], home.zoom);
},'Zoom To Home').addTo(map);


//* ++++++++++++++++++++++++++

// Sat. 15-apr-17

//* Sat. 15-Apr-17
//* No Errors, but the places layer is not added as a checkbox to the overlay

/*
var my_json;
var TOC = L.control.layers(baseMaps);


$.getJSON("data/cg_places.geojson", function(data) {
	my_json = L.geoJson(data, {
		pointToLayer: function(feature,latlng) {
			var smallIcon = new L.Icon({
				options: {
					iconSize: [22,22],
					iconAnchor: [13,20],
					popupAnchor: [1,-20],
					iconURL: "icons/flag.png"
				}
			});
			return L.marker(latlng, {icon: smallIcon});
			
		},
		onEachFeature: function (feature, layer) {
		layer.bindPopup(feature.properties.Name + feature.properties.Phone)
	}
	});
	
	//my_json.addTo(markers.addTo(map));
	TOC.addOverlay(my_json,"CG Places");
	
});
*/


//* Sat. 15-apr-17

// Point style
var stationStyle = {
  opacity: 0.5,
  fillOpacity: 0.7
};

var parcelStyle = {
	opacity: .5,
	color: "black",
	weight: .1,
	fillOpacity: .4,
	linecolor: "green"
};
//* Weather Radar Overlay, Parcel Layer Options
// Sat. Move here 15-apr-17
var overlayMaps = {
	"WX Radar": nexrad,
	// "Parcels": parcelLayer2
};

// Get GeoJSON data
/* Break it down and KISS.  Get the data and call a function upon completion.
 *
 * We use a anonymous function to call the createOverlay function.  This is because the callback only has 
 * the signature with submitting one object, the JSON object.  Once called it passes to the actual function with the
 * customisation that we wanted.  This allows you to use this with multiple JSON objects served from AWS. 
 */

//* --------------------------------------------
//* Option #1  - Adding an geoJson Overlay Layer
//*		This option allows me to add the parcel layer, but I can't style it
//*		I can also add the point places layer (pointToLayer).
//*		The layer control works but I can't add the NEXRAD layer to it
//*
//* --------------------------------------------

var cg_places = "data/cg_places.geojson";
var cg_parcels = "data/cg_parcels.geojson";

// Sat. 15-apr-17  
// This works but I can't style the parcels (polygon) layer.  
// So, I am trying option #2 below
// $.getJSON(cg_parcels, function (data) { createPointOverlay(data, "Parcels", parcelStyle)});

// Sat. 15-apr-17  This works for places (points).  
// But, I don't know how to add the NeXRAD layer to the layer control
// $.getJSON(cg_places, function (data) { createPointOverlay(data, "CG Businesses", stationStyle) });

// Create the control and add it to the map;
// var control = L.control.layers(baseMaps); // Grab the handle of the Layer Control, it will be easier to find.
// control.addTo(map);


//* Callback to create overlay layer
//* Creating a layer from a async call probably will be a common task.  
//* Refactor out the function to make a layer, you can use this function with multiple layers. 
//*
function createPointOverlay(data, layerName, style) {
  	console.log("layer name: ", layerName);
	
	var overlay = L.geoJson(data, { // Make the layer from the JSON and grab the handle.
    
	  pointToLayer: function (feature, latlng) {
		
		switch (feature.geometry.type) {
			case 'Point': return L.circleMarker(latlng, style); 
			// sat. 15-apr-17
			// case 'Polygon': return L.polygon(latlng,style);
			case 'Polygon': return L.polygon(latlng,{
				color: "red",
				weight: 1,
				fillOpacity: .5
			});
		}
		// console.log("Geometry type: ", feature.geometry.type)
    	// return L.circleMarker(latlng, style); 
		  
    } // end pointToLayer()
	  
  }); // end geoJson()
	
  overlay.addTo(map); 						// Add the data to the map, now you can see the point layer.
  control.addOverlay(overlay, layerName); 	// Add the layer to the Layer Control.

	
}; // end createPointOverlay()

//* --------------------------------------------
//* Option #3 - Adding an geoJson Overlay Layer
//*		This works;  I can draw the parcel layer 
//*		and style it.  Just can't add the layer to 
//*  	a layer control yet.
//* --------------------------------------------

var overlay;
var overlayParcels;



//* ++++++++++++++++++++++++++++++++++++++++++++++
//* Sat. 15-Apr-17
//* Option #2 for Adding a Layer to a Layer Control
/*
var parcelLayer2 = $.getJSON(cg_parcels, function(hoodData) {
	
	//* Loop through all the data
	overlayParcels = L.geoJson(hoodData, {
		style: function(feature) {
		var fillColor;
		var density = feature.properties.Zipcode;
		if (density == '53527') fillColor = "yellow";
		else fillColor = "#f7f7f7"; 
		
		return {color: "#f02323", weight: .5, fillColor: fillColor, fillOpacity: .6}
	},
	onEachFeature: function(feature,layer) {
		layer.bindPopup("feature.properties.Name")
	}
}).addTo(map);
	
	// This is the section that does not work yet.  Can't figure out 
	// how to add the layer to the layer control
	// No errors, but the parcels layer does Not get add
	// to the layer control
	var control = L.control.layers(baseMaps);
	control.addOverlay(overlayParcels, "Parcels");
	
});

*/




//* +++++++++++++++++++++++++++++++++++++++++++++
//* Option #3 - Geojson add to control layer
//* +++++++++++++++++++++++++++++++++++++++++++++
//* ++++++++++++++++++++++++++++++++++++++++++++++
//* Sat. 15-Apr-17
//* Option #3 for Adding a Layer to a Layer Control
var parcelLayer2 = $.getJSON(cg_parcels, function(hoodData) {
	
	//* Loop through all the data
	overlayParcels = L.geoJson(hoodData, {
		style: function(feature) {
		var fillColor;
		var density = feature.properties.Zipcode;
		if (density == '53527') fillColor = "yellow";
		else fillColor = "#f7f7f7"; 
		
		return {color: "#817b7b", weight: .2, fillColor: fillColor, fillOpacity: .4}
	},
	onEachFeature: function(feature,layer) {
		layer.bindPopup("<b>Property Owner: </b>" + feature.properties.Owner)
	}
}).addTo(map);
	

	
//* Specify the Overlay Layers	
var overlays = {
	"WX Radar": nexrad,
	"Parcels" : overlayParcels
};

//* Add the layer control to the map
L.control.layers(baseMaps,overlays).addTo(map);
	
});




// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//* ******************************************
//* Option #4
//*		Error: results in Invalid GeoJSON Object
//*
//* *****************************************
/*
var geojsonParcels = L.geoJson(cg_parcels, {
	onEachFeature: onEachFeature
}).addTo(map);

function onEachFeature(feature, layer) {
	if (feature.properties) {
		layer.bindPopup(feature.properties.Owner);
	}
}; // end onEachFeature()

var overlays = {
	"geoJson": geojsonParcels
};

L.control.layers(baseMaps,overlays).addTo(map);
*/

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


//* Add Saturday: Add Layer Control to Map
// This worked for lab 1
// L.control.layers(baseMaps,overlayMaps).addTo(map);




/*
var OpenStreetMap_Mapnik = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
*/


// var marker = L.marker([43.076, -89.199]).addTo(map);


//* Map Click to show latitude/longitude

 function onMapClick(e) {popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
};

console.log(" onMapClick() set ...");

map.on('click', onMapClick);




// Add Friday, 24-Feb-17
//* Custom control to add text in slider box
/* Sundary, 23-Apr-17
L.Control.myMessage = L.Control.extend({
	onAdd: function(map) {
		var mapMessage = L.DomUtil.create("mapMessage");
		
		// mapMessage.text = "test"
		mapMessage.innerHTML = "<p>1960 &nbsp&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp 2015</p><p>Click along slider <br>bar to change year</p><p class='dataSource'>Data Source: U.S. Census</p>";
		
		return mapMessage;
	},
	onRemove: function(map) {
		
	}
});
*/

L.control.mymsg = function(opts) {
	return new L.Control.myMessage(opts) 
}

//* Sunday, 23-Apr-17
//* L.control.mymsg({ position: 'bottomleft'}).addTo(map);
	

function myfunc() {


    var mydiv = document.getElementById("mydiv");

    //* This places text on the page
	//* mydiv.innerHTML = "Hello World jQuery Example";
	
} ;  // end myfunc()


//* Add Sunday P.M., 12-Feb-17 from temporal slider article
//* 
function createSliderUI(timestamps) {
	
	// Variables
	// timestamps[0]: Pop_1960
	// timestamps[5]: Pop_2010
	
	var sliderControl = L.control({ position: 'bottomleft'});
	
	
	//console.log(" #### In createSliderUI(): timestamps: ", timestamps);
	
	
	sliderControl.onAdd = function(map) {
		var slider = L.DomUtil.create("input", "range-slider");
		
		
		L.DomEvent.addListener(slider, 'mousedown', function(e) {
			L.DomEvent.stopPropagation(e);
			
		});
		

		
		
		$(slider)
			.attr({'type': 'range',
				   'max' : timestamps[timestamps.length -1],
				   'min' : timestamps[0],
				   'step': 1,
				   'value': String(timestamps[0])})
		
			//* This function fires whenever the slider is moved/clicked on
			//* -----------------------------------------------------------
			.on('input change', function(){
			
				// console.log(" **** Slider Clicked  **************");
			
			
				//* Get the new index value
				var index = $(this).val();
			
				// console.log(" Slider now at index: ", index);
			
				//* Get the index value
				var index = $('.range-slider').val();
				
				//* Set Time Slider to Correct Year
				if (index <= 1964) {
					index = 1960
				}
				else if (index >= 1965 && index <= 1974) {
					index = 1970
				}
				else if (index >= 1975 && index <= 1984) {
					index = 1980
				}
				else if (index >= 1985 && index <= 1994) {
					index = 1990
				}
				else if (index >= 1995 && index <= 2004) {
					index = 2000
				}
				else if (index >= 2005 && index <= 2010) {
					index = 2010
				}
				else if (index >= 2011) {
					index = 2015
				}
			
				// console.log(" *New index: ", index);
				// console.log(" Slider max: ", timestamps[timestamps.length-1]);
				// console.log(" Slider min: ", timestamps[0]);
			
				//* Add Wed 15-Feb-17 to try and fix slider position
			
				// console.log("  *Slider Position: ",this.value);
			
			
				//* Update slider
				$('.range-slider').val(index);
				
			
				// console.log(" ** $(this).val().toString(): ", $(this).val().toString() );
			
				// console.log("  $(this.value): ",this.value);
			
				// console.log(" String(timestamps[0]) : ",String(timestamps[0]));
			
			
			
				// add wed 15-feb-17
				updatePropSymbols2(index);
		
		 		
				$(".temporal-legend").text(this.value);
			
				// $(".temporal-legend").text("Year: ",+ this.value); // add 20-Feb-17
				
		});
		
		return slider;
		
	}
	
	sliderControl.addTo(map)
	
	createTemporalLegend(timestamps[0]);
	
};  // end createSliderUI()



function updatePropSymbols2(timestamp) {
	
	// Example for record #10 (Clark County)
	// props[timestamp]:	31527		*population for 1960
	// timestamp:			Pop_1960	*current population header being used
	
	counties.eachLayer(function(layer) {
		
		
		
		//* Information on each County Population Field, ex County name, Area, Pop_2015, Area, etc
		//* props.Pop_2015 = the population count for year 2015
		
		var props = layer.feature.properties;
		
		// console.log(" props: ", layer.feature.properties);
		// console.log(" timestamp: ", timestamp);
		
		// console.log(" props[timestamp]: ", props[timestamp]);
				
		var radius = calcPropRadius2(props[timestamp]);
				
		
		// console.log(" radius: ", radius);

		
		//* props[timestamp] = County Name, ex: Adams
		//* timestamp = "County",   ex. "County"

		// console.log(" props.County: ", String(props.County));
		// console.log(" props.Pop_2015: ", props[timestamp]);
		
		var myYear = 2010
					
		// console.log(" props.Pop_2010: ", props[myYear]);

		
		
		// add bolding and commas in number
		var popupContent = "<b>" + String(props.County) + " County Population: " + "</b>" + String(props[timestamp].toLocaleString());

		
		layer.setRadius(radius);
		layer.bindPopup(popupContent, {offset: new L.Point(0,-radius)});
		
	});
	
	
}; // end updatePropSymbols2()

function calcPropRadius2(attributeValue) {
	
	
	var scaleFactor = .00000001;
	var area = attributeValue + scaleFactor;
	
	return Math.sqrt(area/Math.PI) * .1;
	
}; // end calcPropRadius()



function createPropSymbols2(timestamps, data) {
	
	//* timestamps = an array that contains the county 
	//* population values from 1960 to 2015 for each county
	
	
	counties = L.geoJson(data, {
		
		pointToLayer: function(feature, latlng) {
			
			return L.circleMarker(latlng, {
				fillColor: "green",
				color: "black",
				weight: 1,
				fillOpacity: .5
			}).on({
				
				mouseover: function(e) {
					this.openPopup();
					this.setStyle({color: 'yellow'});
				},

				mouseout: function(e) {
					this.closePopup();
					this.setStyle({color: "blue"});
				}
			});
		}
	}).addTo(map);
	
	//* Send the first date in the time series
	// console.log(" ** timestamps[0]: ", timestamps[0]);
	
	//* Send first Date. ex. 1960
	updatePropSymbols2(timestamps[0]);
	
};  // end createPropSymbols2()



//* --------------------------------
//* Add Sunday Night - from article
//* --------------------------------

function processData(data) {
	
		// attribute:				Pop_1960	*First pass through
		// properties[attribute]:	7566		*1960 population value for first record

		var timestamps = [];
		var min = Infinity;
		var max = -Infinity;

		//* feature: 0 = the first record
		//* feature: 1 = 2nd record
	
		//* Properties = the entire object
		//*    ex. County: Adams, State: Wisconsin, Pop_2015: 20148
	
		//* Attribute = the individual fields for each record
		//*    ex. attribute: County
		//*        attribute: State
	
		//* Loop through each record in the JSON file
		//* ------------------------------------------
		for (var feature in data.features) {

			// console.log(" feature: ", feature);

			var properties = data.features[feature].properties;

			// console.log(" properties: ", properties);
			
			//* Loop through each field in the current record
			//* ---------------------------------------------
			for (var attribute in properties) {
				
				// console.log(" attribute: ", attribute);

				//* Do Not include the columns listed below:
				
				if ( attribute != 'County' &&
				  	 attribute != 'State' &&
				   	 attribute != 'FIPS' &&
					 attribute != 'Long' &&
					 attribute != 'Lat' &&
				  	 attribute != 'ID' ) {
						
					// 
					// This passes in the first year of the first record
					// if ( $.inArray(properties[attribute],timestamps) === -1) {
					
					if ( $.inArray(attribute,timestamps) === -1) {
						
						timestamps.push(attribute);	
						// console.log(" pushed attribute: ", attribute);
						// console.log(" properties[attribute]: ",properties[attribute]);
					}

					if (properties[attribute] < min) {	
						min = properties[attribute];
						// console.log(" set min value: ", properties[attribute]);
					}
						
					if (properties[attribute] > max) {
						max = properties[attribute];
						// console.log(" set max value: ", properties[attribute]);
					};
				};
			};
		}; // end for()

		return {
			timestamps : timestamps,
			min : min,
			max : max
		}
	};  // end processData()

function createTemporalLegend(startTimestamp) {
		
	var temporalLegend = L.control ({position: 'bottomleft'});
	
	
	temporalLegend.onAdd = function(map) {
		
		var output = L.DomUtil.create("output","temporal-legend");
		
		var sliderText = L.DomUtil.create("slider_text","temporal-legend");
		
		$(sliderText).text("This is a message");
		
		//* Use jQuery to set Title for the Time Slider of the 'output' element
		
		$(output).text(startTimestamp);  // comment out 19-Feb-17
		
		var mydiv = document.getElementById("mydiv");
					
		
		$(sliderText).text("Click a point along the slider to change Year");
		
		// $(output).text("<h2 id='slider_text'>" + startTimestamp + "</h2>");
		

		


		//* end changes 19-feb-17
		
		
		return output;
		
	}
	
	
	//* Add the legend control to the map
	// temporalLegend.addTo(map);
	
}; // end createTemporalLegend()

//* Create the Circle Legend

function createLegend(min, max) {
	if (min < 10) {
		min = 10;
	};
	
	
	function roundNumber(inNumber) {
		return (Math.round(inNumber/10) * 10);
	}
	
	//* Set Location of the Legend: bottomright
	var legend = L.control ({position: 'bottomright'});
	
	legend.onAdd = function(map) {
	var legendContainer = L.DomUtil.create("div", "legend");
	var symbolsContainer = L.DomUtil.create("div","symbolsContainer");
	var classes = [roundNumber(min), roundNumber((max-min)/2), roundNumber(max)];
	var legendCircle;
	var lastRadius = 0;
	var currentRadius;
	var margin;
		
	L.DomEvent.addListener(legendContainer, 'mousedown', function(e) {
		L.DomEvent.stopPropagation(e);
	});
	
	//* Title of circle legend
	$(legendContainer).append("<h2 id='legendTitle'>County Population</h2>");
	
	for (var i = 0; i <= classes.length-1; i++) {
		legendCircle = L.DomUtil.create("div","legendCircle");
		
		currentRadius = calcPropRadius2(classes[i]);
		
		
		margin = -currentRadius - lastRadius -2;
		
		$(legendCircle).attr("style", "width: " + currentRadius*2 + "px; height: " + currentRadius*2 + "px; margin-left: " + margin + "px" );
		
		$(legendCircle).append("<span class='legendValue'>" + classes[i] +"</span>");
		
		$(symbolsContainer).append(legendCircle);
		
		lastRadius = currentRadius;
		
	}; // end for()
		
	$(legendContainer).append(symbolsContainer);
		

	return legendContainer;
		
	};  // end function(map)
	
	//* Add the legend to the map
	legend.addTo(map);
	
}; // end createLegend()

var currentZoomLevel = map.getZoom();
console.log("Current Map Zoom Level: ", currentZoomLevel);

//* Sun 16-Apr-17
//* Point Symbols

var iconX = 20;
var iconY = 20;

// Symbol: 1 Church
var churchIcon = L.icon({
	iconUrl: "icons/chapel.png",
	iconSize: [iconX,iconY],
	iconAnchor: [12,12],
	popupAnchor: [-5, -20]
});

// Symbol: 2  Bank
var bankIcon = L.icon({
	iconUrl: "icons/atm.png",
	iconSize: [iconX,iconY],
	iconAnchor: [12,12],
	popupAnchor: [-5, -20]
});

// Symbol: 3 School
var schoolIcon = L.icon({
	iconUrl: "icons/school.png",
	iconSize: [iconX,iconY],
	iconAnchor: [12,12],
	popupAnchor: [-5, -20]
});

// Symbol: 4 Daycare
var daycareIcon = L.icon({
	iconUrl: "icons/daycare.png",
	iconSize: [iconX,iconY],
	iconAnchor: [12,12],
	popupAnchor: [-5, -20]
});

// Symbol: 5 Fire Department
var fireDeptIcon = L.icon({
	iconUrl: "icons/fire_dept.png",
	iconSize: [iconX,iconY],
	iconAnchor: [12,12],
	popupAnchor: [-5, -20]
});

// Symbol: 6
var policeIcon = L.icon({
	iconUrl: "icons/police.png",
	iconSize: [iconX,iconY],
	iconAnchor: [12,12],
	popupAnchor: [-5, -20]
});

// Symbol: 7
var airportIcon = L.icon({
	iconUrl: "icons/airport.png",
	iconSize: [iconX,iconY],
	iconAnchor: [12,12],
	popupAnchor: [-5, -20]
});

// Symbol: 8
var supermarketIcon = L.icon({
	iconUrl: "icons/supermarket.png",
	iconSize: [iconX,iconY],
	iconAnchor: [12,12],
	popupAnchor: [-5, -20]
});

// Symbol: 10
var pharmacyIcon = L.icon({
	iconUrl: "icons/pharmacy.png",
	iconSize: [iconX,iconY],
	iconAnchor: [12,12],
	popupAnchor: [-5, -20]
});

// Symbol: 11
var healthCareIcon = L.icon({
	iconUrl: "icons/hospital.png",
	iconSize: [iconX,iconY],
	iconAnchor: [12,12],
	popupAnchor: [-5, -20]
});

// Symbol: 12
var recreationIcon = L.icon({
	iconUrl: "icons/sport_centre.png",
	iconSize: [iconX,iconY],
	iconAnchor: [12,12],
	popupAnchor: [-5, -20]
});

// Symbol: 13 Livestock Feed
var livestockIcon = L.icon({
	iconUrl: "icons/livestock.png",
	iconSize: [iconX,iconY],
	iconAnchor: [12,12],
	popupAnchor: [-5, -20]
});

// Symbol: 14
var assistedLivingIcon = L.icon({
	iconUrl: "icons/assisted_living.png",
	iconSize: [iconX,iconY],
	iconAnchor: [12,12],
	popupAnchor: [-5, -20]
});

// Symbol: 15
var governmentIcon = L.icon({
	iconUrl: "icons/cityhall.png",
	iconSize: [iconX,iconY],
	iconAnchor: [12,12],
	popupAnchor: [-5, -20]
});

// Symbol: 16
var utilityIcon = L.icon({
	iconUrl: "icons/utility.png",
	iconSize: [iconX,iconY],
	iconAnchor: [12,12],
	popupAnchor: [-5, -20]
});

// Symbol: 17
var parkIcon = L.icon({
	iconUrl: "icons/shelter.png",
	iconSize: [iconX,iconY],
	iconAnchor: [12,12],
	popupAnchor: [-5, -20]
});


// Symbol: 19
var golfIcon = L.icon({
	iconUrl: "icons/golf.png",
	iconSize: [iconX,iconY],
	iconAnchor: [12,12],
	popupAnchor: [-5, -20]
});


// Symbol: 20
var batteryIcon = L.icon({
	iconUrl: "icons/battery.png",
	iconSize: [iconX,iconY],
	iconAnchor: [12,12],
	popupAnchor: [-5, -20]
});

// Symbol: 21
var bikeIcon = L.icon({
	iconUrl: "icons/bicycle.png",
	iconSize: [iconX,iconY],
	iconAnchor: [12,12],
	popupAnchor: [-5, -20]
});

// Symbol: 22
var chemicalIcon = L.icon({
	iconUrl: "icons/chemical.png",
	iconSize: [iconX,iconY],
	iconAnchor: [12,12],
	popupAnchor: [-5, -20]
});

var gasIcon = L.icon({
	iconUrl: "icons/fuel.png",
	iconSize: [iconX,iconY],
	iconAnchor: [12,12],
	popupAnchor: [-5, -20]
});

var barIcon = L.icon({
	iconUrl: "icons/bar.png",
	iconSize: [iconX,iconY],
	iconAnchor: [12,12],
	popupAnchor: [-5, -20]
});

//* Import GeoJSON data
function getData(map){
	
	
	//* --------------------------------------------------------------
	//* Load and Draw Cottage Grove Place Locations from geoJSON file
	//* --------------------------------------------------------------
	// Sat.  15-apr-17
	
	//* Variables for different symbols
	var gasMarker, barMarker, churchMarker, schoolMarker, daycareMarker, policeMarker, utilityMarker, assistedLivingMarker,
		pharmacyMarker, supermarketMarker, bankMarker, recreationMarker, fireDeptMarker, livestockMarker, chemicalMarker,
		batteryMarker, bikeMarker, governmentMarker, healthCareMarker, airportMarker, parkMarker, golfMarker;
	
	
	var myLayers = $.getJSON("data/cg_places.geojson")
	// var myLayers = $.getJSON("data/map.geojson")
		.done(function(data) {
		
			//* Draw CG Place point locations
			L.geoJson(data,{
				pointToLayer: function(feature,latlng) {
					switch(feature.properties.Symbol) {
						
						// Church
						case 1:
							churchMarker = L.marker(latlng, {
								icon: churchIcon
								
							}). bindPopup("<b>" + feature.properties.Name + "</b>" + "<br>" + feature.properties.Phone + "</br>");
							
							console.log("** Church found..." + feature.properties.Name);
							return churchMarker.on({
								
								//* Mouseover Popup
								mouseover: function(e) {
									this.openPopup();
								},
								mouseout: function(e) {
									this.closePopup();
								}
							});
									
							break;

						// Bank
						case 2:
							bankMarker = L.marker(latlng, {
								icon: bankIcon
								
							}). bindPopup(feature.properties.Name);
							
							console.log("** bank found..." + feature.properties.Name);
							return bankMarker.on({
								
								//* Mouseover Popup
								mouseover: function(e) {
									this.openPopup();
								},
								mouseout: function(e) {
									this.closePopup();
								}
							});
							
							break;
							
						// School
						case 3:
							schoolMarker = L.marker(latlng, {
								icon: schoolIcon
								
							}). bindPopup("<b>" + feature.properties.Name + "</b>" + "<br>" + feature.properties.Phone + "</br>");
							
							console.log("** School found..." + feature.properties.Name);
							return schoolMarker.on({
								
								//* Mouseover Popup
								mouseover: function(e) {
									this.openPopup();
								},
								mouseout: function(e) {
									this.closePopup();
								}
							});
							
							break;

						// Daycare
						case 4:
							daycareMarker = L.marker(latlng, {
								icon: daycareIcon
								
							}). bindPopup("<b>" + feature.properties.Name + "</b>" + "<br>" + feature.properties.Phone + "</br>");
							
							console.log("** Daycare found..." + feature.properties.Name);
							return daycareMarker.on({
								
								//* Mouseover Popup
								mouseover: function(e) {
									this.openPopup();
								},
								mouseout: function(e) {
									this.closePopup();
								}
							});
							break;

						// Fire Department
						case 5:
							fireDeptMarker = L.marker(latlng, {
								icon: fireDeptIcon
								
							}). bindPopup("<b>" + feature.properties.Name + "</b>" + "<br>" + feature.properties.Phone + "</br>");
							
							console.log("** Fire Dept found..." + feature.properties.Name);
							return fireDeptMarker.on({
								
								//* Mouseover Popup
								mouseover: function(e) {
									this.openPopup();
								},
								mouseout: function(e) {
									this.closePopup();
								}
							});
							break;
							
						// Police
						case 6:
							policeMarker = L.marker(latlng, {
								icon: policeIcon
								
							}). bindPopup("<b>" + feature.properties.Name + "</b>" + "<br>" + feature.properties.Phone + "</br>");
							
							console.log("** Police found..." + feature.properties.Name);
							return policeMarker.on({
								
								//* Mouseover Popup
								mouseover: function(e) {
									this.openPopup();
								},
								mouseout: function(e) {
									this.closePopup();
								}
							});
							break;	
							
						// Airport
						case 7:
							airportMarker = L.marker(latlng, {
								icon: airportIcon
								
							}). bindPopup("<b>" + feature.properties.Name + "</b>" + "<br>" + feature.properties.Phone + "</br>");
							
							console.log("** Airport found..." + feature.properties.Name);
							return airportMarker.on({
								
								//* Mouseover Popup
								mouseover: function(e) {
									this.openPopup();
								},
								mouseout: function(e) {
									this.closePopup();
								}
							});
							
							break;	
							
							
							
						// Grocery, Super Market
						case 8:	
							supermarketMarker = L.marker(latlng, {
								icon: supermarketIcon
								
							}). bindPopup("<b>" + feature.properties.Name + "</b>" + "<br>" + feature.properties.Phone + "</br>");
							
							console.log("** Super Market found..." + feature.properties.Name);
							return supermarketMarker.on({
								
								//* Mouseover Popup
								mouseover: function(e) {
									this.openPopup();
								},
								mouseout: function(e) {
									this.closePopup();
								}
							});
							break;
							
						// Gas Station
						case 9:
							gasMarker = L.marker(latlng, {
								icon: gasIcon
								
							}). bindPopup("<b>" + feature.properties.Name + "</b>" + "<br>" + feature.properties.Phone + "</br>");
							
							console.log("** Gas Station found..." + feature.properties.Name);
							return gasMarker.on({
								
								//* Mouseover Popup
								mouseover: function(e) {
									this.openPopup();
								},
								mouseout: function(e) {
									this.closePopup();
								}
							});
							break;

						// Pharmacy
						case 10:
							pharmacyMarker = L.marker(latlng, {
								icon: pharmacyIcon
								
							}). bindPopup("<b>" + feature.properties.Name + "</b>" + "<br>" + feature.properties.Phone + "</br>");
							
							console.log("** Pharmacy found..." + feature.properties.Name);
							return pharmacyMarker.on({
								
								//* Mouseover Popup
								mouseover: function(e) {
									this.openPopup();
								},
								mouseout: function(e) {
									this.closePopup();
								}
							});
							break;

						// Health Care
						case 11:
							healthCareMarker = L.marker(latlng, {
								icon: healthCareIcon
								
							}). bindPopup("<b>" + feature.properties.Name + "</b>" + "<br>" + feature.properties.Phone + "</br>");
							
							console.log("** Health Care found..." + feature.properties.Name);
							return healthCareMarker.on({
								
								//* Mouseover Popup
								mouseover: function(e) {
									this.openPopup();
								},
								mouseout: function(e) {
									this.closePopup();
								}
							});
							break;
							
						//* Recreation
						case 12:
							recreationMarker = L.marker(latlng, {
								icon: recreationIcon
								
							}). bindPopup("<b>" + feature.properties.Name + "</b>" + "<br>" + feature.properties.Phone + "</br>");
							
							console.log("** Recreation found..." + feature.properties.Name);
							return recreationMarker.on({
								
								//* Mouseover Popup
								mouseover: function(e) {
									this.openPopup();
								},
								mouseout: function(e) {
									this.closePopup();
								}
							});
							break;

						//* Livestock Feed
						case 13:
							livestockMarker = L.marker(latlng, {
								icon: livestockIcon
								
							}). bindPopup("<b>" + feature.properties.Name + "</b>" + "<br>" + feature.properties.Phone + "</br>");
							
							console.log("** Livestock found..." + feature.properties.Name);
							return livestockMarker.on({
								
								//* Mouseover Popup
								mouseover: function(e) {
									this.openPopup();
								},
								mouseout: function(e) {
									this.closePopup();
								}
							});
							break;
							
						//* Assisted Living
						case 14:
							assistedLivingMarker = L.marker(latlng, {
								icon: assistedLivingIcon
								
							}). bindPopup("<b>" + feature.properties.Name + "</b>" + "<br>" + feature.properties.Phone + "</br>");
							
							console.log("** Assisted Living found..." + feature.properties.Name);
							return assistedLivingMarker.on({
								
								//* Mouseover Popup
								mouseover: function(e) {
									this.openPopup();
								},
								mouseout: function(e) {
									this.closePopup();
								}
							});
							break;
							

						//* Government
						case 15:
							governmentMarker = L.marker(latlng, {
								icon: governmentIcon
								
							}). bindPopup("<b>" + feature.properties.Name + "</b>" + "<br>" + feature.properties.Phone + "</br>");
							
							console.log("** Government found..." + feature.properties.Name);
							return governmentMarker.on({
								
								//* Mouseover Popup
								mouseover: function(e) {
									this.openPopup();
								},
								mouseout: function(e) {
									this.closePopup();
								}
							});
							
							break;
							
						//* Utility
						case 16:
							utilityMarker = L.marker(latlng, {
								icon: utilityIcon
								
							}). bindPopup("<b>" + feature.properties.Name + "</b>" + "<br>" + feature.properties.Phone + "</br>");
							
							console.log("** Utility found..." + feature.properties.Name);
							return utilityMarker.on({
								
								//* Mouseover Popup
								mouseover: function(e) {
									this.openPopup();
								},
								mouseout: function(e) {
									this.closePopup();
								}
							});
							break;

							
						//* Park
						case 17:
							parkMarker = L.marker(latlng, {
								icon: parkIcon
								
							}). bindPopup("<b>" + feature.properties.Name + "</b>" + "<br>" + feature.properties.Phone + "</br>");
							
							console.log("** Park found..." + feature.properties.Name);
							return parkMarker.on({
								
								//* Mouseover Popup
								mouseover: function(e) {
									this.openPopup();
								},
								mouseout: function(e) {
									this.closePopup();
								}
							});
							break;
							
						//* Bar/Restaurant
						case 18:
							barMarker = L.marker(latlng, {
								icon: barIcon
								
							}). bindPopup("<b>" + feature.properties.Name + "</b>" + "<br>" + feature.properties.Phone + "</br>");
							
							console.log("** Restaurant found..." + feature.properties.Name);
							return barMarker.on({
								
								//* Mouseover Popup
								mouseover: function(e) {
									this.openPopup();
								},
								mouseout: function(e) {
									this.closePopup();
								}
							});
							break;

							
						//* Golf
						case 19:
							golfMarker = L.marker(latlng, {
								icon: golfIcon
								
							}). bindPopup("<b>" + feature.properties.Name + "</b>" + "<br>" + feature.properties.Phone + "</br>");
							
							console.log("** Golf found..." + feature.properties.Name);
							return golfMarker.on({
								
								//* Mouseover Popup
								mouseover: function(e) {
									this.openPopup();
								},
								mouseout: function(e) {
									this.closePopup();
								}
							});
							break;
							
							
						//* Battery
						case 20:
							batteryMarker = L.marker(latlng, {
								icon: batteryIcon
								
							}). bindPopup("<b>" + feature.properties.Name + "</b>" + "<br>" + feature.properties.Phone + "</br>");
							
							console.log("** Battery found..." + feature.properties.Name);
							return batteryMarker.on({
								
								//* Mouseover Popup
								mouseover: function(e) {
									this.openPopup();
								},
								mouseout: function(e) {
									this.closePopup();
								}
							});
							break;

						//* Bike trail
						case 21:
							bikeMarker = L.marker(latlng, {
								icon: bikeIcon
								
							}). bindPopup("<b>" + feature.properties.Name + "</b>" + "<br>" + feature.properties.Phone + "</br>");
							
							console.log("** Drumline Bike Trail found..." + feature.properties.Name);
							return bikeMarker.on({
								
								//* Mouseover Popup
								mouseover: function(e) {
									this.openPopup();
								},
								mouseout: function(e) {
									this.closePopup();
								}
							});
							break;

						//* Bike trail
						case 22:
							chemicalMarker = L.marker(latlng, {
								icon: chemicalIcon
								
							}). bindPopup("<b>" + feature.properties.Name + "</b>" + "<br>" + feature.properties.Phone + "</br>");
							
							console.log("** Chemical Plan found..." + feature.properties.Name);
							return chemicalMarker.on({
								
								//* Mouseover Popup
								mouseover: function(e) {
									this.openPopup();
								},
								mouseout: function(e) {
									this.closePopup();
								}
							});
							break;
							
					}
					console.log(feature.properties.Name + feature.properties.Symbol)
					
					currentZoomLevel = map.getZoom();
					console.log("Current Map Zoom Level: ", currentZoomLevel);
					
					return L.marker(latlng);
				}
			}).addTo(map);
			
			// map.fitBounds()
			var info = processData(data);
		
			
			// createPropSymbols2(info.timestamps,data);
				
			// createLegend(info.min, info.max);
			
			// createSliderUI(info.timestamps);
				
		
	}) // end function()
	
	.fail(function() { alert("An error occurred loading the geoJSON data: ", "data/map.geojson")});
	
	
 }; // end getData()
  	



window.onload = myfunc();

console.log("calling getData()");

getData(map);



