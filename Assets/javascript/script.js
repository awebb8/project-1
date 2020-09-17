$(document).ready(function() {

    // API KEYS FOR ZOMATO AND SPOONACULAR
    const ZOMATOAPIKEY = "9723ed5e62a95b63e3f30544b70f8fdb";
    const SPOONAPIKEY = "c27de7a75c74494f8fe916321c2ede25";


    // $.ajax({
    //     url: "https://api.spoonacular.com/recipes/complexSearch?query=pasta&apiKey=c27de7a75c74494f8fe916321c2ede25",
    //     method: "GET"
    // }).then(function(response) {
    //     console.log(response);
    // });

    // $.ajax({
    //     url: "https://api.spoonacular.com/recipes/654959/information?apiKey=c27de7a75c74494f8fe916321c2ede25",
    //     method: "GET"
    // }).then(function(response) {
    //     console.log(response);
    // });


    $(".search_icon").on("click", function() {
        console.log("you clicked the button: " + $(".search_input").val());
        var searchQuery = $(".search_input").val();

        // Make AJAX call to Zomato based on user query
        $.ajax({
            url: `https://developers.zomato.com/api/v2.1/search?q=${searchQuery}&apikey=${ZOMATOAPIKEY}`,
            method: "GET"
        }).then(function(response) {
            console.log(response);
        });

        


    });

});
