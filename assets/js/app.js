$("#submitWeather").on("click", function (e) {
    e.preventDefault();
    var city = $("#inputCity").val();

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&&units=imperial" + "&appid=9acf091dc63eaffd665c2bc101fd67c2";

    $.ajax({
        url: queryURL,
        method: "GET",
        success: function (response) {
            console.log(response);
            $("#city").html(response.name + " " + moment().format("dddd, MMMM Do"));
            $("#temp").html("Tempature: " + response.main.temp + "&#8457");
            $("#humidity").html("Humidity: " + response.main.humidity + "%");
            $("#windSpeed").html("Wind Speed: " + response.wind.speed + " MPH");
        //    getUV("UV Index: " + response.coord.lat, response.coord.lon);
        //    fiveDay(city);
        }
    })
});

var lat = (response.coord.lat);
var lon = (response.coord.lon);

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