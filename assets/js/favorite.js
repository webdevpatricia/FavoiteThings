
	$(document).ready(function(){


	var favorites = ["flowers", "succlents", "painting", "cats"];

	function displayFavoriteInfo() {

        var favorite = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + favorite + "&apikey=rxWvTqyXRenUfYmNhZXOexgXgY3zoUun";

        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
        	$("#favorites-view").JSON(response);
          renderButtons();
        });
      }


      // Function for displaying favorites data
      function renderButtons() {

        // Deleting the buttons prior to adding new favorites
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of movies
        for (var i = 0; i < favorites.length; i++) {

          // Then dynamicaly generating buttons for each favorite in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of favorite to our button
          a.addClass("favorite");
          // Adding a data-attribute
          a.attr("data-name", favorites[i]);
          // Providing the initial button text
          a.text(favorites[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }

// This function handles events where one button is clicked
      $("#add-favorite").on("click", function(event) {
        event.preventDefault();

        // This line grabs the input from the textbox
        var favorite = $("#favorite-input").val();
        console.log(favorite);

        // Adding the favorite from the textbox to our array
        favorites.push(favorite);
        console.log(favorites)

        // Calling renderButtons which handles the processing of our favorites array
        renderButtons();
      });



  // Function for displaying the favorites info
  // Using $(document).on instead of $(".movie").on to add event listens to dynamically generated elements
      $(document).on("click", ".favorite", displayFavoriteInfo);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();
    

    });