$(document).ready(function() {

const SPOONAPIKEY = "eedaf08410ff4e439dbac4b966ee5e86";
var recipeId = localStorage.getItem("recipeDataId");


$.ajax ({
    url: "https://api.spoonacular.com/recipes/" + recipeId + "/information?apiKey=" + SPOONAPIKEY + "&includeNutrition=true.",
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
    
    // Add Recipe Instructions
    var recipeInstructions = $("<br><h3>");
    recipeInstructions.text("Instructions:");
    var responseInstructions = $(response.instructions);
    var recipeInstructionsText = $("<p>");
    var responseSourceUrl = $("<a>");
    recipeInstructionsText.text("Continue to read on ");
    responseSourceUrl.text(response.sourceUrl);
    responseSourceUrl.attr("href", response.sourceUrl);
    recipeDisplay.append(recipeInstructions);
    recipeDisplay.append(responseInstructions);
    recipeDisplay.append(recipeInstructionsText);
    recipeInstructionsText.append(responseSourceUrl);

    // Add Wine Pairing IF wine pairing is available, otherwise offer the current recommended wine
    if (response.winePairing.pairingText == "") {
    var wineRecommend = $("#wine-display");
    var wineRecommendText = $("<p>");
    wineRecommendText.text("We recommend this red blend");
    wineRecommend.append(wineRecommendText);
    }
    else {
    var wineDisplay = $("#wine-display");
    var winePairingText = $("<p>");
    winePairingText.text(response.winePairing.pairingText);
    wineDisplay.append(winePairingText);
    }


    // Make ajax call for cost breakdown section
    $.ajax ({
        url: "https://api.spoonacular.com/recipes/" + recipeId + "/priceBreakdownWidget.json?apiKey=" + SPOONAPIKEY,
        method: "GET"
    }).then(function(response2) {


        // Create table for cost breakdown section
        for (var j = 0; j <response2.ingredients.length; j++) {
            var ingredientGroceryList = $("#ingredient-grocery-list");
            var ingredientName = $("<td>");
            ingredientName.text(response2.ingredients[j].name);
            var ingredientValueUnit = $("<td>");
            var ingredientUnit = $("<p>");
            ingredientUnit.text(response2.ingredients[j].amount.us.unit);
            ingredientValueUnit.text((response2.ingredients[j].amount.us.value).toFixed(2));
            var ingredientPrice = $("<td>");
            ingredientPrice.text("$" + (((response2.ingredients[j].price)/100).toFixed(2)));

            var newRow = $("<tr>");

            ingredientGroceryList.append(newRow);
            ingredientGroceryList.append(ingredientName);
            ingredientGroceryList.append(ingredientValueUnit);
            ingredientValueUnit.append(ingredientUnit);
            ingredientGroceryList.append(ingredientPrice);

        }
    });

});




});