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
//* 23-Apr-17	Added Geocoding option
//* 25-Apr-17 	Added "About" button and started tweaking appearance of the map
//* 27-Apr-17	Added Emergency Contacts button
//* 29-Apr-17	Got Emergency Contacts button working; populated with contacts for CG area


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


//* Tues. 25-Apr-17 Nice Map Styling

    // if use clicks 'about' show it
    $('#huh').on('click tap', function(){
        $('#about').fadeIn(400);

    });
    
    // clicking anywhere removes the 'about'
    $('#about').on('click tap', function(){
        $('#about').fadeOut(400);
    });

//* Turn Emergency Contacts On/Off
//* ------------------------------
//* Clicking on Emergency Contacts Button
    $('#contacts').on('click tap', function(){
        $('#emergency').fadeIn(400);

    });


    //* Clicking anywhere removes the 'Emergency Contacts Page'
    $('#emergency').on('click tap', function(){
        $('#emergency').fadeOut(400);
    });



//* 23-Apr-17 Geocoding Option
/*
new L.Control.GeoSearch({
     provider: new L.GeoSearch.Provider.OpenStreetMap(),
     position: 'topcenter',
     showMarker: true
}).addTo(map);
*/



function style(feature) {
	return {
		fillColor: "red",
		color: "green",
		opacity: .5
	};
};  // end style()


//* Option for Two Different Basemaps
var baseMaps = {
	"Grayscale": grayscale,
	"OSM Streets": streets
};


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
	'layers': [streets], 		//* Layer and Initial basemap option
	'zoomControl': false 		//* Turn off zoom control
			 
}).fitBounds(fitMap);			//* Sets initial map view

/* almost like setting a max zoom out */
map.setMinZoom(6);




//* Latitude/Longitude Location of Home for Easy Button
var home = {
  lat: 43.076,
  lng: -89.199,
  zoom: 13
}; 

//* -----------------
//* Zoom Home Button
//* -----------------
L.easyButton("fa-home fa-fw",function(btn,map){
  map.setView([home.lat, home.lng], home.zoom);
},'Zoom To Home').addTo(map);

//* --------------------
//* Add Geocoder to Map
//* --------------------
var geocoder = L.Mapzen.geocoder('mapzen-Cr8v2MA', {
	autocomplete: true,
	params: {
		'boundary.country': 'USA',
		layers: 'address,venue,county'
	}
});
geocoder.addTo(map);



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


// Get GeoJSON data
/* Break it down and KISS.  Get the data and call a function upon completion.
 *
 * We use a anonymous function to call the createOverlay function.  This is because the callback only has 
 * the signature with submitting one object, the JSON object.  Once called it passes to the actual function with the
 * customisation that we wanted.  This allows you to use this with multiple JSON objects served from AWS. 
 */

//* --------------------------------------------
//* Option #1  - Adding a geoJson Overlay Layer
//*		This option allows me to add the parcel layer, but I can't style it
//*		I can also add the point places layer (pointToLayer).
//*		The layer control works but I can't add the NEXRAD layer to it
//*
//* --------------------------------------------

var cg_places = "data/cg_places.geojson";
var cg_parcels = "data/cg_parcels.geojson";


//* Callback to create overlay layer
//* Creating a layer from a async call probably will be a common task.  
//* Refactor out the function to make a layer, you can use this function with multiple layers. 
//*
function createPointOverlay(data, layerName, style) {
  	//* console.log("layer name: ", layerName);
	
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

		  
    } // end pointToLayer()
	  
  }); // end geoJson()
	
  overlay.addTo(map); 						// Add the data to the map, now you can see the point layer.
  control.addOverlay(overlay, layerName); 	// Add the layer to the Layer Control.

	
}; // end createPointOverlay()


var overlay;
var overlayParcels;


//* ++++++++++++++++++++++++++++++++++++++++++++++++
//* Option #3 - add Geojson Parcels to control layer
//* ++++++++++++++++++++++++++++++++++++++++++++++++

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
		layer.bindPopup("<b>Property Owner: </b>" + feature.properties.Owner + "<br>" + "<b>Billing Address: </b>" + feature.properties.BillingStr + "</br>" + "<b>Billing City: </b>" + feature.properties.BillingCty)
	}
}).addTo(map);
	

	
//* Specify the Overlay Layers	
var overlays = {
	"WX Radar": nexrad,
	"Parcels" : overlayParcels
};

	
	
//* Add the layer control to the map
//* Sat. Modify for draw tools
L.control.layers(baseMaps,overlays, {position: 'topleft'}).addTo(map);
//* L.control.layers(baseMaps,overlays, {'drawnlayer': drawnItems}, {position: 'topleft'}).addTo(map);
	
});


//* Map Click to show latitude/longitude

 function onMapClick(e) {popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
};

// console.log(" onMapClick() set ...");

map.on('click', onMapClick);



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
	color: '#725139',
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
							
							// console.log("** Church found..." + feature.properties.Name);
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
								
							}). bindPopup("<b>" + feature.properties.Name + "</b>" + "<br>" + feature.properties.Phone + "</br>");
							
							// console.log("** bank found..." + feature.properties.Name);
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
							
							// console.log("** School found..." + feature.properties.Name);
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
							
							// console.log("** Daycare found..." + feature.properties.Name);
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
							
							// console.log("** Fire Dept found..." + feature.properties.Name);
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
							
							// console.log("** Police found..." + feature.properties.Name);
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
							
							// console.log("** Airport found..." + feature.properties.Name);
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
							
							// console.log("** Super Market found..." + feature.properties.Name);
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
							
							// console.log("** Gas Station found..." + feature.properties.Name);
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
							
							// console.log("** Pharmacy found..." + feature.properties.Name);
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
							
							// console.log("** Health Care found..." + feature.properties.Name);
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
							
							// console.log("** Recreation found..." + feature.properties.Name);
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
							
							// console.log("** Livestock found..." + feature.properties.Name);
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
							
							// console.log("** Assisted Living found..." + feature.properties.Name);
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
							
							// console.log("** Government found..." + feature.properties.Name);
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
							
							// console.log("** Utility found..." + feature.properties.Name);
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
							
							// console.log("** Park found..." + feature.properties.Name);
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
							
							// console.log("** Restaurant found..." + feature.properties.Name);
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
							
							// console.log("** Golf found..." + feature.properties.Name);
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
							
							// console.log("** Battery found..." + feature.properties.Name);
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
							
							// console.log("** Drumline Bike Trail found..." + feature.properties.Name);
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
							
							// console.log("** Chemical Plan found..." + feature.properties.Name);
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
					// console.log(feature.properties.Name + feature.properties.Symbol)
					
					currentZoomLevel = map.getZoom();
					// console.log("Current Map Zoom Level: ", currentZoomLevel);
					
					return L.marker(latlng);
				}
			}).addTo(map);
			
				
		
	}) // end function()
	
	.fail(function() { alert("An error occurred loading the geoJSON data: ", "data/map.geojson")});
	
	
 }; // end getData()
  	



window.onload = myfunc();

// console.log("calling getData()");

getData(map);



