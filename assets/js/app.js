$("#submitWeather").on("click", function (e) {
    e.preventDefault();
    var city = $("#inputCity").val();

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&&units=imperial" + "&appid=9acf091dc63eaffd665c2bc101fd67c2";
    fiveDay(city);
    
    $.ajax({
        url: queryURL,
        method: "GET",
        success: function (response) {
            localStorage.setItem("searchedCity", city);
            createPTag(localStorage.getItem("searchedCity"));
            $("#city").html(response.name + " " + moment().format("dddd, MMMM Do") + '<i class="fas fa-cloud"></i>');
            $("#temp").html("Tempature: " + response.main.temp + "&#8457");
            $("#humidity").html("Humidity: " + response.main.humidity + "%");
            $("#windSpeed").html("Wind Speed: " + response.wind.speed + " MPH");

           getUV(response.coord.lat, response.coord.lon);
        }
    })
});

function createPTag(searchedCity){
    var localP = $("<p/>").text(searchedCity);
    localP.appendTo(".field");
}

function forcastIcon(){

}

function getUV(lat,lon){

    var uvIndexQueryURL = "http://api.openweathermap.org/data/2.5/uvi?appid=9acf091dc63eaffd665c2bc101fd67c2&lat=" + lat + "&lon=" + lon;
    $.ajax({
        url: uvIndexQueryURL,
        method: "GET",
        success: function (response) {
          
           $("#uvIndex").html("UV Index: " + response.value);
        }
    })

}
function fiveDay(city){

    var fiveDayQueryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=9acf091dc63eaffd665c2bc101fd67c2";
/* <div class="tile is-child box">
<p></p>
</div> */
    // create a global div in order to hold all 5 days
    $.ajax({
        
        url:fiveDayQueryURL,
        method:"GET",
        success: function (response){
            $("#weatherForcast").empty();
            var weather = response.list;
            console.log(response);
            for (let i = 0; i < weather.length; i++) {
                var icon = weather[i].weather[0].icon;
                var date= (weather[i].dt_txt).split(" ")[0]
                console.log(icon);
                var divTile = $("<div class='tile is-child'/>");
                var forcastDate= $("<p/>");
                var forcastTemp= $("<p/>");
                var forcastHumidity= $("<p/>");
                var forcastIcon= $("<img>");
                if(weather[i].dt_txt.includes("15:00:00")){
                    forcastDate.html(date);
                    forcastDate.appendTo(divTile);
                    forcastTemp.html("Temp: " + weather[i].main.temp + "&#8457");
                    forcastTemp.appendTo(divTile);
                    forcastIcon.attr("src", "http://openweathermap.org/img/w/" + icon + ".png");
                    forcastIcon.appendTo(divTile);
                    forcastHumidity.html("Humidity: " + weather[i].main.humidity + "%");
                    forcastHumidity.appendTo(divTile);
                    divTile.appendTo("#weatherForcast");
                }
            } 


        }
    })

}
