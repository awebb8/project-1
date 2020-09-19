$(document).ready(function(){ 

    var restaurantId = localStorage.getItem("recipeDataId");
    
    $.ajax({
        url: `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${restaurantId}`,
        headers: {
            'Authorization':'Bearer xQhqk6iKwI8rprXKZO006ZmPHJq4VXj3uHMkRTQl3Otj3mbw86-ZTGwW6CH5BEjuAY8pmnrwFGV3ReAAXIyh9c4o8SxD2yev4EXkaS9Ny9_MXdQq01_urRTbo45jX3Yx',
        },
        method: "GET",
        dataType: 'json'
    }).then(function(response) {
        console.log(response);

        $("#restaurant-name").text(response.name);
        // $(".restaurant-price").text(response.price);
        // $("#restaurant-number").text(response.display_phone);

        // Add Restaurant Image
        // var recipeImage = $("<img>");
        // recipeImage.attr("src", response.image_url);
        // recipeImage.attr("style", "width:400px; height:400px;")
        // $("#restaurant-display").append(recipeImage);

        // Displays photos of restaurant in bootstrap carousel
        for(var i = 0; i < response.photos.length; i++) {
            if(i==0) {
                $(".carousel-indicators").append(`<li data-target="#carouselExampleIndicators" data-slide-to="0" class="active">`);
                $(".carousel-inner").append($('<div class="carousel-item active">').append($(`<img src="${response.photos[i]}" class="d-block w-100 restaurantImg" alt="...">`)));
            }
            else {
                $(".carousel-indicators").append(`<li data-target="#carouselExampleIndicators" data-slide-to="${i}" class="active">`);
                $(".carousel-inner").append($('<div class="carousel-item">').append($(`<img src="${response.photos[i]}" class="d-block w-100 restaurantImg" alt="...">`)));
            }
        }

        // Displays rating in stars
        for(var i=0; i < 5; i++) {
            if(i < Math.floor(response.rating)) {
                $("#ratings").append($('<i class="fa fa-star fa-2x">'));
            }
            else if((response.rating - Math.floor(response.rating)) > 0) {
                $("#ratings").append($('<i class="fa fa-star-half-o fa-2x">'));
            }
            else {
                $("#ratings").append($('<i class="fa fa-star-o fa-2x">'));
            }
        }

        // Displays number of reviews
        $("#ratings").append("   " + response.review_count + " ratings");


        if(response.price != undefined) {
            $("#ratings").append($("<p id='price-line'>").text(response.price + "  •  "));
        }
        else {
            $("#ratings").append($("<p id='price-line'>")); 
        }

        for(var i=0; i < response.categories.length; i++) {
            if(i==0) {
                $("#price-line").append(response.categories[i].title);
            }
            else {
                $("#price-line").append(", " + response.categories[i].title);
            }
        }

        if(response.hours[0].is_open_now) {
            $("#hours").append($("<p id='open-text' class='open-close-text' style='display: inline;'>").text("Open"));
        }
        else {
            $("#hours").append($("<p id='close-text class='open-close-text' style='display: inline;'>").text("Closed"));
        }
            $("#hours").append($("<p style='display: inline;'>").text("      " + (response.hours[0].open[0].start).replace(/(.{2})$/,':$1') + " - " + (response.hours[0].open[0].end).replace(/(.{2})$/,':$1')));





    });





});