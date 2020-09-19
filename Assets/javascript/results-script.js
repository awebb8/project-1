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
        
        if(localStorage.getItem("userRadioButtonOption")) {
            window.location.href = "recipe-selected.html"
        }
        else {
            window.location.href = "restaurant-selected.html"
        }
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
            var resultsCard = $("<div class='card card-body col-xs-3 results-card'>");
        
            var resultsA = $("<a href='#'>");
    
            var resultsImg = $("<img class='card-img-top results-image' alt='placeholder'>");
            resultsImg.attr("src", restaurantsSearchResult.businesses[i].image_url);
            resultsImg.attr("data-id", restaurantsSearchResult.businesses[i].id);
           
        
            var resultsTitle = $("<h6 class='card-header'>");
            resultsTitle.text(restaurantsSearchResult.businesses[i].name);
        
            resultsA.append(resultsImg);
    
            resultsCard.append(
                resultsA,
                resultsTitle,
                // resultsList   
            );
        
            $("#primary-row").append(resultsCard);
                
            }    
        }



});

