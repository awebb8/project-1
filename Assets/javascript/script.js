$(document).ready(function() {

    // API KEYS FOR ZOMATO AND SPOONACULAR
    const ZOMATOAPIKEY = "9723ed5e62a95b63e3f30544b70f8fdb";
    const SPOONAPIKEY = "c27de7a75c74494f8fe916321c2ede25";


    // $.ajax({
    //     url: "https://api.spoonacular.com/recipes/654959/information?apiKey=c27de7a75c74494f8fe916321c2ede25",
    //     method: "GET"
    // }).then(function(response) {
    //     console.log(response);
    // });

    $("#search-button").on("click", function() {
        // Store user search into searchQuery variable
        var searchQuery = $("#search-input").val();

        // Check which radio button user selected
        if($("input[type=radio]:checked", ".radiobuttons").val() === "option1") {
            // User selected Eat In - Make AJAX call to Spoonacular
            $.ajax({
                url: `https://api.spoonacular.com/recipes/complexSearch?query=${searchQuery}&apiKey=${SPOONAPIKEY}`,
                method: "GET"
            }).then(function(response) {
                console.log(response);
                // Store the response in localStorage so we can retrieve it later in a seperate JS file
                localStorage.setItem("recipesSearchResults", JSON.stringify(response));

                // After making AJAX call, redirect user to search-results.html
                window.location.href = "search-results.html";                    
            });

        }

        else {
            // User selected Eat Out - Make AJAX call to Zomato
            $.ajax({
                url: `https://developers.zomato.com/api/v2.1/search?q=${searchQuery}&apikey=${ZOMATOAPIKEY}`,
                method: "GET"
            }).then(function(response) {
                console.log(response);
                // Store the response in localStorage so we can retrieve it later in a seperate JS file
                localStorage.setItem("restaurantsSearchResults", JSON.stringify(response));

                // After making AJAX call, redirect user to search-results.html
                window.location.href = "search-results.html";                
            });

        }


    });


});
