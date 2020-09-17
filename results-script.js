


$("primary-row").empty();
for(var i=0; i<10; i++){ // currently iterates only 10 times. will need to set it to iterate based on the results sent.
    var resultCard = $("<div class='card col-sm-3 results-card'>");

    var resultsImg = $("<img>");
    iconImg.attr("src", "http://placekitten.com/200/200");

    var resultsTitle = $("<h6 class='card-header'>");
    resultsTitle.text("Restaurant/recipe name");

    var ratingLine = $("<li class='list-group-item'>");
    ratingLine.text("Rating");

    var locationLine = $("<li class='list-group-item'>");
    locationLine.text("location");

    var cuisineLine = $("<li class='list-group-item'>");
    cuisineLine.text("Cuisine Type");

    var costLine = $("<li class='list-group-item'>");
    costLine.text("Cost");

    var hoursLine = $("<li class='list-group-item'>");
    hoursLine.text("Hours");

    resultsCard.append(
        resultsImg,
        resultsTitle,
        ratingLine,
        locationLine,
        cuisineLine,
        costLine,
        hoursLine
    );

    $("#primary-row").append(forecastCard);


}




// var forecastQueryURL =
// "https://api.openweathermap.org/data/2.5/onecall?units=imperial&lat=" +
// latitude +
// "&lon=" +
// longitude +
// "&exclude=current,minutely,hourly&appid=" +
// apiKey;

// $.ajax({
// url: forecastQueryURL,
// method: "GET",
// }).then(function (response) {




// $("#primary-row").empty();
// for (let i = 1; i < daysToForecast.length + 1; i++) { 
//   var forecastCard = $("<div class='col-sm-2 card forecast card-body'>");
    // console.log("test-1");
//   var forecastDay = $("<h6>");
//   var unixSeconds = response.daily[i].dt;
//   var unixMilliseconds = unixSeconds * 1000;
//   var forecastDateUnix = new Date(unixMilliseconds);
//   var forecastDoW = forecastDateUnix.toLocaleString("en-US", {
//     weekday: "long",
//   });
//   forecastDay.text(forecastDoW);
//   var hrLine = $("<hr />");
//   var iconP = $("<p>");
//   var iconImg = $("<img>");
//   iconImg.attr(
//     "src",
//     "http://openweathermap.org/img/wn/" +
//       response.daily[i].weather[0].icon +
//       ".png"
//   );
//   iconP.append(iconImg);
//   var tempP = $("<p>").text(
//     "Temp: " + Math.round(response.daily[i].temp.day) + " °F"
//   );
//   var humidP = $("<p>").text(
//     "Humidity: " + response.daily[i].humidity + "%"
//   );
//   forecastCard.append(
//     forecastDay,
//     hrLine,
//     iconP,
//     tempP,
//     humidP
//   );
//   $("#primary-row").append(forecastCard);
// }
// });