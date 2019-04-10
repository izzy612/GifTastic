$(document).ready(function () {
	var cartoon = ["rick and morty", "bobs burgers", "the simpsons", "rugrats", "spongebob", "hey arnold", "daria"];

	// Add buttons for original cartoon array
	function renderButtons() {
		$("#cartoon-buttons").empty();
		for (i = 0; i < cartoon.length; i++) {
			$("#cartoon-buttons").append("<button class='btn btn-info' data-cartoon='" + cartoon[i] +  "'>" + cartoon[i] + "</button>");
		}
	}

	renderButtons();

	// Adding a button for cartoon entered
	$("#add-cartoon").on("click", function () {
		event.preventDefault();
		var cartoon = $("#cartoon-input").val().trim();
		cartoon.push(cartoon);
    renderButtons();
    $("cartoon-input").val("");
		return;
	});


	// Getting gifs from api
	$("button").on("click", function () {
		var cartoon = $(this).attr("data-cartoon");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
			cartoon + "&api_key=dc6zaTOxFJmzC&limit=10"

		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function (response) {
			var results = response.data;
			$("#cartoon").empty();
			for (var i = 0; i < results.length; i++) {
				var cartoonDiv = $("<div>");
				var p = $("<p>").text("Rating: " + results[i].rating);
				var cartoonImg = $("<img>");

				cartoonImg.attr("src", results[i].images.original_still.url);
				cartoonImg.attr("data-still", results[i].images.original_still.url);
				cartoonImg.attr("data-animate", results[i].images.original.url);
				cartoonImg.attr("data-state", "still");
				cartoonImg.attr("class", "gif");
				cartoonDiv.append(p);
				cartoonDiv.append(cartoonImg);
				$("#cartoon").append(cartoonDiv);
			}
		});
	});

	function changeState(){
		var state = $(this).attr("data-state");
		var animateImage = $(this).attr("data-animate");
		var stillImage = $(this).attr("data-still");

		if (state == "still") {
			$(this).attr("src", animateImage);
			$(this).attr("data-state", "animate");
		}

		else if (state == "animate") {
			$(this).attr("src", stillImage);
			$(this).attr("data-state", "still");
		}
	}

	
	$(document).on("click", ".gif", changeState);

});
