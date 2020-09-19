$(document).ready(function() {

    // API KEYS FOR ZOMATO AND SPOONACULAR
    const ZOMATOAPIKEY = "9723ed5e62a95b63e3f30544b70f8fdb";
    const SPOONAPIKEY = "eedaf08410ff4e439dbac4b966ee5e86";

    $("#search-button").on("click", function(event) {
        event.preventDefault();
        // Store user search into searchQuery variable
        var searchQuery = $("#search-input").val();
        // Clear localStorage to prevent past searches from breaking logic
        localStorage.clear();

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
            });

        }

        else {
            function success(pos) {
                var crd = pos.coords;
                $.ajax({
                    url: `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${searchQuery}&latitude=${crd.latitude}&longitude=${crd.longitude}`,
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
        
            navigator.geolocation.getCurrentPosition(success);
        }


    });


});
