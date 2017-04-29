/* main.js by Randy Sincoular 16-Jan-17 */

"use strict";

/* ------------------- */
/* jQuery Example */
/* ------------------- */


function myfunc() {


    var mydiv = document.getElementById("mydiv");

    mydiv.innerHTML = "Hello World jQuery Example";
} ;


window.onload = myfunc();


// initialize the cities function when the script loads
function initialize() {
    cities();
} ;

// function to create a table with cities and their population
function cities(){

    // define two arrays for cities and population
    var cityPop = [
        {
            city: 'Madison',
            population: 233209
        },
        {
          city: 'Milwaukee',
          population: 594833
        },
        {
          city: 'Green Bay',
          population: 104057
        },
        {
          city: 'Superior',
          population: 27244
        }
    ];


     // append the table element to the div
    // -----------------------------------------------
    $("#mydiv").append("<table>");


    // append a header row to the table
    // --------------------------------------------
  //  var headerRow = document.createElement("tr");   // javascript

  $("table").append("<tr>");        // jQuery


    // add the "City" and "Population" columns to the header row
    // ------------------------------------------------------------------------------
    // var cityHeader = document.createElement("th");           // javascript
    // cityHeader.innerHTML = "City";
    // headerRow.appendChild(cityHeader);

    $("tr").append("<th>City</th><th>Population</th>");     // jQuery

    // loop to add a new row for each city
    // ----------------------------------------------

    for (var i = 0; i < cityPop.length; i++){

      // assign longer html strings to a variable
      var rowHtml = "<tr><td>" + cityPop[i].city + "</td><td>" + cityPop[i].population + "</td></tr>";

    // add the row's html string to the table
    $("table").append(rowHtml);
  };

}; // end function





// call the initialize function when the document has loaded
window.onload = initialize();


// change the text color
 $('#mydiv').css('color', 'red');

 //change the text size and alignment
 $('#mydiv').css({
     'font-size': '2em',
     'text-align': 'left'
 });


 //click listener with anonymous handler function
    $('table').on('click', function(){
        alert('Madison Rocks! Go Badgers!');
    });

    //alias method for the click event listener
    $('table').click(function(){
        alert('Visit Superior and see the big lake!');
    });

    //named handler function for removable listener
    function clickme(){
        alert('Yeah Green Bay! Go Packers!');
    };

    //add the event listener
    $('table').on('click', clickme);

    //remove the event listener
    $('table').off('click', clickme);

/*

// +++++++++++++++++++++++++++++++
// AJAX Sample Code
// Read the saved geojson file: map.geojson
// +++++++++++++++++++++++++++++++

function jsAjax(){
    // Step 1: Create the request
    var ajaxRequest = new XMLHttpRequest();

    //Step 2: Create an event handler to send received data to a callback function
    ajaxRequest.onreadystatechange = function(){
        if (ajaxRequest.readyState === 4){
            callback(ajaxRequest.response);
        };
    };

    //Step 3: Open the server connection
    ajaxRequest.open('GET', 'data/map.geojson', true);

    //Step 4: Set the response data type
    ajaxRequest.responseType = "json";

    //Step 5: Send the request
    ajaxRequest.send();
};

//define callback function
function callback(response){
    //tasks using the data go here
    // console.log(response);

    console.log("in callback()")

    // Print out results from reading the *.geojson file
    console.log(JSON.stringify(response));
};
*/


// ++++++++++++++++++++++
// AJAX Sample to read individual pieces from the map.geojson file
// ++++++++++++++++++++++++
function jQueryAjax(){
    //define a variable to hold the data
    var mydata;

    //basic jQuery ajax method
    $.ajax("data/map.geojson", {
        dataType: "json",
        success: function(response){
            mydata = response;

            //check the data
            console.log("Check the data (inside): ", mydata);
        }
    });

    //check the data
    console.log("Check the data: (outside of junction)", mydata);
};



window.onload = jQueryAjax();
