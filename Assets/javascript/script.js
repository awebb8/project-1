$(document).ready(function() {

    // API KEYS FOR ZOMATO AND SPOONACULAR
    const ZOMATOAPIKEY = "9723ed5e62a95b63e3f30544b70f8fdb";
    const SPOONAPIKEY = "55eea158ec04428d8c173a8ead64a25f";

    $("#search-button").on("click", function(event) {
        event.preventDefault();
        // Store user search into searchQuery variable
        var searchQuery = $("#search-input").val();
        // Clear localStorage to prevent past searches from breaking logic
        localStorage.clear();

        $("#search-button").empty();
        $("#search-button").append($('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>'));
        

        // Check which radio button user selected
        if($("input[type=radio]:checked", ".radiobuttons").val() === "option1") {
            // User selected Eat In - Make AJAX call to Spoonacular
            $.ajax({
                url: `https://api.spoonacular.com/recipes/complexSearch?query=${searchQuery}&apiKey=${SPOONAPIKEY}&addRecipeInformation=true`,
                method: "GET"
            }).then(function(response) {
                console.log(response);
                // Store the response in localStorage so we can retrieve it later in a seperate JS file
                localStorage.setItem("recipesSearchResults", JSON.stringify(response));
                // Store a value in localStorage to determine which radio button user selected
                localStorage.setItem("userRadioButtonOption", "Eat in");

                // After making AJAX call, redirect user to search-results.html
                window.location.href = "search-results.html";                    
            }).fail(function(response) {
                $("#search-button").empty();
                $("#search-button").append($('<i class="fas fa-search">'));
            });


        }

        else {
            function success(pos) {
                var crd = pos.coords;
                $.ajax({
                    url: `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${searchQuery}&latitude=${crd.latitude}&longitude=${crd.longitude}&limit=15`,
                    headers: {
                        'Authorization':'Bearer xQhqk6iKwI8rprXKZO006ZmPHJq4VXj3uHMkRTQl3Otj3mbw86-ZTGwW6CH5BEjuAY8pmnrwFGV3ReAAXIyh9c4o8SxD2yev4EXkaS9Ny9_MXdQq01_urRTbo45jX3Yx',
                    },
                    method: "GET",
                    dataType: 'json'
                }).then(function(response) {
                    // Store the response in localStorage so we can retrieve it later in a seperate JS file
                    localStorage.setItem("restaurantsSearchResults", JSON.stringify(response));

                    // After making AJAX call, redirect user to search-results.html
                    window.location.href = "search-results.html";   
                });

                }
            function error() {
                $("#search-button").empty();
                $("#search-button").append($('<i class="fas fa-search">'));
                console.log("couldnt retrieve your location");
            }
        
            navigator.geolocation.getCurrentPosition(success, error);

        }


    });



    var foodKeywordArray = ["chicken", "broccoli", "pasta", "roast", "ham", "hamburger", "beef", "rice", "seafood", "fast food", "noodles", "salads", "stew", "soup", "tacos", "fried chicken", "gyro", "pizza", "quesadilla", "shrimp", "lobster", "roti", "ravioli", "barbecue", "pork", "meatloaf", "french toast", "hot dogs", "cheese stake", "steak", "crabs", "waffles", "Stromboli", "guacamole", "chicken salad", "hot wings", "deli", "sushi", "Japanese", "mexican", "vegetable", "smoothies", "breakfast", "Jamaican", "baked potato", "noodles", "shrimp", "nachos", "fish", "pasta", "lasagna", "deli"];

    // Event listener for random recipe button
    $("#random-recipe").on("click", function(event) {
        event.preventDefault();
        // Clear localStorage to prevent past searches from breaking logic
        localStorage.clear();

        var randomIndex = Math.floor(Math.random() * foodKeywordArray.length);
        var randomSearch = foodKeywordArray[randomIndex];
        console.log(foodKeywordArray[randomIndex]);

            $.ajax({
                url: `https://api.spoonacular.com/recipes/complexSearch?query=${randomSearch}&apiKey=${SPOONAPIKEY}&addRecipeInformation=true`,
                method: "GET"
            }).then(function(response) {
                console.log(response);

                var randomIndex2 = Math.floor(Math.random() * response.results.length);
                var randomRecipeId = response.results[randomIndex2].id;

                localStorage.setItem("recipeDataId", randomRecipeId);

                window.location.href = "recipe-selected.html";                    
            });

    });

    // Event listener for random restaurant button
    $("#random-restaurant").on("click", function(event) {
        event.preventDefault();
        localStorage.clear();

        var randomIndex = Math.floor(Math.random() * foodKeywordArray.length);
        var randomSearch = foodKeywordArray[randomIndex];
        console.log(foodKeywordArray[randomIndex]);

        function success(pos) {
            var crd = pos.coords;
            $.ajax({
                url: `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${randomSearch}&latitude=${crd.latitude}&longitude=${crd.longitude}&limit=15`,
                headers: {
                    'Authorization':'Bearer xQhqk6iKwI8rprXKZO006ZmPHJq4VXj3uHMkRTQl3Otj3mbw86-ZTGwW6CH5BEjuAY8pmnrwFGV3ReAAXIyh9c4o8SxD2yev4EXkaS9Ny9_MXdQq01_urRTbo45jX3Yx',
                },
                method: "GET",
                dataType: 'json'
            }).then(function(response) {
                console.log(response);

                var randomIndex2 = Math.floor(Math.random() * response.businesses.length);
                var randomRecipeId = response.businesses[randomIndex2].id;

                localStorage.setItem("recipeDataId", randomRecipeId);
                

                window.location.href = "restaurant-selected.html";   
            });
            }
    
        navigator.geolocation.getCurrentPosition(success);

    });

});
