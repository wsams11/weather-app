

$("#submitWeather").on("click", function (e) {
    e.preventDefault()
    console.log("i clicked the button")
    var city = $("#inputCity").val();

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=9acf091dc63eaffd665c2bc101fd67c2";
    
 
    
    

    $.ajax({
        url: queryURL,
        method: "GET",
        success: function (response) {
            console.log(response);
            $("#city").html(response.name);
            $("#temp").html(response.main.temp);
            $("#humidity").html(response.main.humidity);
            $("#windSpeed").html(response.wind.speed);
           getUV(response.coord.lat, response.coord.lon);
           fiveDay(city);
        }
    })

  

    
    

})


function getUV(lat,lon){

    var uvIndexQueryURL = "http://api.openweathermap.org/data/2.5/uvi?appid=9acf091dc63eaffd665c2bc101fd67c2&lat=" + lat + "&lon=" + lon;
    $.ajax({


        url: uvIndexQueryURL,
        method: "GET",
        success: function (response) {
          
           $("#uvIndex").html(response.value);
        }
    })

}
function fiveDay(city){
    var fiveDayQueryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=9acf091dc63eaffd665c2bc101fd67c2";

    // create a global div in order to hold all 5 days
    var divContainer = $("<div>");
    $.ajax({

        url:fiveDayQueryURL,
        method:"GET",
        success: function (response){
            console.log(response);
            for (let i = 0; i < 5; i++) {
                console.log(response.list[i]);
                
                //  create a div for a specific day
                var dayContainer = $("<div>");

                // create a p tag for a specific day
                var  tempInfo = $("<p>").text(response.list[i].temp);

                dayContainer.append(tempInfo)

                divContainer.append(dayContainer);
                // create another p tag for a specific day
            }


        }
    })

}































 // The below code fills in the first row of the table
//  var city = "Tempe,az";
//  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=b6907d289e10d714a6e88b30761fae22";

//  $.ajax({
//    url: queryURL,
//    method: "GET",
//  }).then(function(response) {
//    // Create a new table row element
//    var tRow = $("<tr>");

//    // Methods run on jQuery selectors return the selector they we run on
//    // This is why we can create and save a reference to a td in the same statement we update its text
//    var temp = $("<td>").text(response.main.temp);
//    var humidity = $("<td>").text(response.main.humidity);
//    var windSpeed = $("<td>").text(response.wind.wind.speed);

//    // Append the newly created table data to the table row
//    tRow.append(temp, humidity, windSpeed);
//    // Append the table row to the table body
//    $("tbody").append(tRow);
//  });

