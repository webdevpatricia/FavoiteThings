
	$(document).ready(function(){

  // initial favorite items array
	var favorites = ["flowers", "succulents", "painting", "cats"];
  // container for the still picture url
  var picStill = "";
  // container for the animated picture url
  var picAnimated = "";

  // function that gets the giphy object and displays it in an image tag
	function displayFavoriteInfo() {
        //setting the local variable favorite to the data name attribute
        var favorite = $(this).attr("data-name");
        //creating the query URL to return the giphy objects
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + favorite + "&apikey=rxWvTqyXRenUfYmNhZXOexgXgY3zoUun&limit=10&rating=g";
        //making the call to giphy with ajax
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
        	console.log(response);
        	//loop through the response to get the urls for the pictures
        	for(var i = 0; i < response.data.length; i++){
          	// assign the still version of the gif 
          	picStill = JSON.stringify(response.data[i].images.downsized_still.url);
                        // assign the animated version of the gif

          	picAnimated = JSON.stringify(response.data[i].images.downsized.url);
            
            // make the first display of the gif still
            $("#favorites-view").prepend('<img class="theImg" src=' + picStill +'/>');
            // if image is clicked toggle it to the gif that is not currently being displayed
            $(".theImg").on("click", function() {
              console.log(this.src);
              if(this.src === '"' + picStill +'"'){
                $("#favorites-view").replaceWith('<img class="theImg" src=' + picAnimated +'/>')
              } else { 
                $("#favorites-view").replaceWith('<img class="theImg" src=' + picStill +'/>')
              };

        	 	});
        	}

        	});

         renderButtons();
        };
      

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


 // This function toggles the gif animation when the gif is clicked
 	// function toggle_animation(id) {
  //      var e = document.getElementById(#favorites-view);

  //      if(e.style.display == 'block')
  //         e.style.display = 'none';
  //      else
  //         e.style.display = 'block';
  //   }



  // Function for displaying the favorites info
  // Using $(document).on instead of $(".favorite").on to add event listens to dynamically generated elements
      $(document).on("click", ".favorite", displayFavoriteInfo);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();
    

    });