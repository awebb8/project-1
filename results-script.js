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
        var resultsCard = $("<div class='card card-body col-xs-3 results-card'>");
    
        var resultsA = $("<a href='#'>");

        var resultsImg = $("<img class='card-img-top results-image' alt='placeholder'>");
        resultsImg.attr("src", recipesSearchResults.results[i].image);
        resultsImg.attr("data-id", recipesSearchResults.results[i].id);
        console.log("data-id");
       
    
        var resultsTitle = $("<h6 class='card-header'>");
        resultsTitle.text(recipesSearchResults.results[i].title);
    
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
        for(var i=0; i<10; i++){


            // AJAX call to Yelp to grab images
            $.ajax({
                url: `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${restaurantsSearchResult.restaurants[i].restaurant.name}&location=${restaurantsSearchResult.restaurants[i].restaurant.location.city}`,
                headers: {
                    'Authorization':'Bearer xQhqk6iKwI8rprXKZO006ZmPHJq4VXj3uHMkRTQl3Otj3mbw86-ZTGwW6CH5BEjuAY8pmnrwFGV3ReAAXIyh9c4o8SxD2yev4EXkaS9Ny9_MXdQq01_urRTbo45jX3Yx',
                },
                method: "GET",
                dataType: 'json'
            }).then(function(response) {
                console.log(response);
            });







            var resultsCard = $("<div class='card card-body col-sm-3 results-card'>");
        
            // var resultsImg = $("<img class='card-img-top' alt='placeholder'>");
            // resultsImg.attr("src", recipesSearchResults.results[i].image);
        
            var resultsTitle = $("<h6 class='card-header'>");
            resultsTitle.text(restaurantsSearchResult.restaurants[i].restaurant.name);
        
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
                // resultsImg,
                resultsTitle,
                // resultsList   
            );
        
            $("#primary-row").append(resultsCard);
                
            }
        }



















});

