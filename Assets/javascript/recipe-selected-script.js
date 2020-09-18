$(document).ready(function() {

const SPOONAPIKEY = "c27de7a75c74494f8fe916321c2ede25";

$.ajax ({
    url: "https://api.spoonacular.com/recipes/716429/information?apiKey=" + SPOONAPIKEY + "&includeNutrition=true.",
    method: "GET"
}).then(function(response) {
    console.log(response);
    console.log(response.extendedIngredients[2].original);
    console.log(response.winePairing.pairingText);

    // Create variable for recipe section
    var recipeDisplay = $("#recipe-display");

    // Add Recipe Name
    var recipeName = $("#recipe-name");
    recipeName.text(response.title);

    // Add Recipe Image
    var recipeImage = $("<img>");
    recipeImage.attr("src", response.image);
    recipeDisplay.append(recipeImage);

    // Add Recipe Ingredients
    var ingredients = $("<h3>");
    ingredients.text("Ingredients:");
    recipeDisplay.append(ingredients);
    for (var i = 0; i < response.extendedIngredients.length; i++) {
        var ingredientList = $("<li>");
        ingredientList.text(response.extendedIngredients[i].original);
        recipeDisplay.append(ingredientList);
    }

    // Add Wine Pairing
    var wineDisplay = $("#wine-display");
    var winePairingText = $("<p>");
    winePairingText.text(response.winePairing.pairingText);
    wineDisplay.append(winePairingText);

});




});