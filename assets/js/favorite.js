
	$(document).ready(function(){

  // initial favorite items array
	var favorites = ["flowers", "succulents", "painting", "cats"];


  // function that gets the giphy object and displays it in an image tag
    	function displayFavoriteInfo() {
        $("#favorites-view").empty();
        var favorite = $(this).attr("data-name");
        console.log(favorite);
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + favorite + "&apikey=rxWvTqyXRenUfYmNhZXOexgXgY3zoUun&limit=10";
        console.log(queryURL);
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
        	console.log(response);
        	for(var i = 0; i < response.data.length; i++){
            picRating = JSON.stringify(response.data[i].rating).replace(/^"(.*)"$/, '$1');
            picStill = JSON.stringify(response.data[i].images.downsized_still.url).replace(/^"(.*)"$/, '$1');
           	picAnimated = JSON.stringify(response.data[i].images.downsized.url).replace(/^"(.*)"$/, '$1');
            var imgTag = $("<img>");

            console.log(imgTag.src);
            imgTag.addClass("theImg");
            imgTag.attr("data-still", picStill);
            imgTag.attr("data-animate", picAnimated);
            imgTag.attr("data-state", "still");
            $("#favorites-view").prepend(imgTag);
          }
       	});
           renderButtons();
      };
      
      //This function toggles between the still picture and the animated picture
      $(".theImg").on("click", function() {
          var state = $(this).attr("data-state");
          console.log(state);
          if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
      });
     

      // Function for displaying favorites buttons
      function renderButtons() {
        $("#buttons-view").empty();
        for (var i = 0; i < favorites.length; i++) {
          var a = $("<button>");
          a.addClass("favorite");
          a.attr("data-name", favorites[i]);
          a.text(favorites[i]);
          $("#buttons-view").append(a);
        }
      };

      // This function handles events where one button is clicked
      $("#add-favorite").on("click", function(event) {
        event.preventDefault();
        var favorite = $("#favorite-input").val();
        console.log(favorite);
        favorites.push(favorite);
        console.log(favorites)
        renderButtons();
      });


     $(document).on("click", ".favorite", displayFavoriteInfo);
     // $(document).on("click", ".theImg", displayFavoriteInfo);

      renderButtons();
    });