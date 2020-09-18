$(document).ready(function() {

    var containerBodyEl = $("#container-body");
    var primaryRowEl = $("#primary-row");
    var titleRowEl = $("#title-row");
    
    // [dp] - Retrieve AJAX responses that are stored in localStorage
    var recipesSearchResults = JSON.parse(localStorage.getItem("recipesSearchResults"));
    var restaurantsSearchResult = JSON.parse(localStorage.getItem("restaurantsSearchResults"));

    // Check which radio button user selected - value is retrieved from localStorage
    if(localStorage.getItem("userRadioButtonOption")) {
        console.log(recipesSearchResults);
        showRecipeResults();
    }
    else {
        console.log(restaurantsSearchResult);
        showRestaurantResults();
    }

    // on click event for image.
    $(".results-image").on("click", function(){
        localStorage.setItem("recipeDataId", $(this).attr("data-id"));
        window.location.href = "recipe-selected.html"
        
    });
   
    
    // Dynamically update search-results.html with response from Spoonacular
    function showRecipeResults() {
    $("primary-row").empty();
    for(var i=0; i<10; i++){
        var resultsCard = $("<div class='card card-body col-sm-3 results-card'>");
    
        var resultsA = $("<a href='#'>");

        var resultsImg = $("<img class='card-img-top results-image' alt='placeholder'>");
        resultsImg.attr("src", recipesSearchResults.results[i].image);
        resultsImg.attr("data-id", recipesSearchResults.results[i].id);
        console.log("data-id");
       
    
        var resultsTitle = $("<h6 class='card-header'>");
        resultsTitle.text(recipesSearchResults.results[i].title);
    
        resultsA.append(resultsImg);

        resultsCard.append(
            resultsA,
            resultsTitle,
            // resultsList   
        );
    
        $("#primary-row").append(resultsCard);
            
        }
    }

    // Dynamically update search-results.html with response from Zomato
    function showRestaurantResults() {
        $("primary-row").empty();
        var count = 0;
        var index = -1;
        var timeInterval = setInterval(function() {
            count++;
            ajaxYelp();

            if (count === 11) {
            clearInterval(timeInterval);
            }
        }, 200);


        function ajaxYelp() {
            // AJAX call to Yelp to grab images
            $.ajax({
                url: `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${restaurantsSearchResult.restaurants[count].restaurant.name}&latitude=${restaurantsSearchResult.restaurants[count].restaurant.location.latitude}&longitude=${restaurantsSearchResult.restaurants[count].restaurant.location.longitude}`,
                headers: {
                    'Authorization':'Bearer xQhqk6iKwI8rprXKZO006ZmPHJq4VXj3uHMkRTQl3Otj3mbw86-ZTGwW6CH5BEjuAY8pmnrwFGV3ReAAXIyh9c4o8SxD2yev4EXkaS9Ny9_MXdQq01_urRTbo45jX3Yx',
                },
                method: "GET",
                dataType: 'json'
            }).then(function(response) {
                index++;
                console.log(response);
                var resultsCard = $("<div class='card card-body col-sm-3 results-card'>");
        
                var resultsImg = $("<img class='card-img-top results-image' alt='placeholder'>");
                resultsImg.attr("src", response.businesses[0].image_url);
                resultsImg.attr("data-id", restaurantsSearchResult.restaurants[index].restaurant.id);
            
                var resultsTitle = $("<h6 class='card-header'>");
                resultsTitle.text(restaurantsSearchResult.restaurants[index].restaurant.name);
            
                // var resultsList =$("<ul class='list-group list-group-flush'>")
            
                // var ratingLine = $("<li class='list-group-item'>");
                // ratingLine.text("Rating");
            
                // var locationLine = $("<li class='list-group-item'>");
                // locationLine.text("location");
            
                // var cuisineLine = $("<li class='list-group-item'>");
                // cuisineLine.text("Cuisine Type");
            
                // var costLine = $("<li class='list-group-item'>");
                // costLine.text("Cost");
            
                // var hoursLine = $("<li class='list-group-item'>");
                // hoursLine.text("Hours");
            
                // resultsList.append(
                //     ratingLine,
                //     locationLine,
                //     cuisineLine,
                //     costLine,
                //     hoursLine
                // );
            
                resultsCard.append(
                    resultsImg,
                    resultsTitle,
                    // resultsList   
                );
            
                $("#primary-row").append(resultsCard);
        

            });
        }


    

        }


    function success(pos) {
        var crd = pos.coords;

        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);

        if(crd.longitude < -100) {
            // window.location.href = "https://www.google.com/search?rlz=1C5CHFA_enUS761US761&sxsrf=ALeKk02aVVAZi9pNbTNDzmXN2icM2nO5jg%3A1599065379393&ei=I81PX9zVF5Hj_AaL-rfICA&q=west+coast&oq=west+coast&gs_lcp=CgZwc3ktYWIQAzINCC4QsQMQgwEQQxCTAjIECAAQQzIHCAAQsQMQQzICCAAyAggAMgIIADIECAAQQzIHCAAQsQMQQzIFCAAQsQMyBAgAEEM6BAgAEEc6AgguOgQIIxAnOgQILhBDOgsILhCxAxDHARCjAjoKCAAQsQMQgwEQQzoOCC4QsQMQgwEQxwEQowI6BwguEEMQkwI6CAguEMcBEK8BOggILhDHARCjAjoFCC4QsQM6CggAELEDEBQQhwI6DgguELEDEIMBEMcBEK8BSgUINxIBMUoFCCQSATFQllxYxWVgu2ZoBHACeACAAYEBiAHXCJIBAzYuNZgBAKABAaoBB2d3cy13aXrAAQE&sclient=psy-ab&ved=0ahUKEwic86Tf9srrAhWRMd8KHQv9DYkQ4dUDCA0&uact=5";
            console.log("West Coast");
        }
        else {
            // window.location.href = "https://www.google.com/search?q=east+coast&rlz=1C5CHFA_enUS761US761&oq=east+coast&aqs=chrome..69i64j46l3j5l4.4159j0j4&sourceid=chrome&ie=UTF-8"
            console.log("East Coast");
        }
        }

    navigator.geolocation.getCurrentPosition(success);



});

