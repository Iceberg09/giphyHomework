var topics = ["kit-kat", "twix", "snickers", "cheetos"];


//Create function to remove all buttons from the page and re-render them with all items in the topic array.
function renderButtons() {
    //Remove all buttons from the div with the id of snacks-view.
    $("#snacks-view").empty();

    //For loop to add each button to the page for each item in the topics array
    for (var i = 0; i < topics.length; i++) {
        var button = $("<button>");
        button.addClass("snack");
        button.attr("data-snack", topics[i]);
        button.text(topics[i]);
        $("#snacks-view").append(button);
    }
};

$("#add-snack").on("click", function (event) {
    event.preventDefault();

    //Take the snack that was entered into the form and add it to the topics array.
    var snack = $("#snack-input").val().trim();
    topics.push(snack);

    //Render buttons on screen to include new snack(s) added.
    renderButtons();
});

$(document).on("click", "button", function () {
    // Grabbing and storing the data-animal property value from the button
    var snack = $(this).attr("data-snack");
    console.log(snack);

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + snack + "&api_key=9gJNVXxJsV6nFJ8gvqqDbBt0B8qCZ2mv&limit=10";

    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        var results = response.data;

        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div>");
            var giphyRating = $("<p>").html("Rating: " + results[i].rating);
            var giphyImage = $("<img>");

            giphyImage.attr("src", results[i].images.fixed_height_small_still.url);
            giphyImage.attr("data-still", results[i].images.fixed_height_small_still.url);
            giphyImage.attr("data-animate", results[i].images.fixed_height_small.url);
            giphyImage.attr("data-state", "still");
            giphyImage.attr("class", "gif");

            gifDiv.append(giphyRating);
            gifDiv.append(giphyImage);

            $("#giphy-content").prepend(gifDiv);

            console.log(results[i].rating);
        }
    })

});

$(document).on("click", ".gif", function() {
    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});



//Render initial buttons to page upon load.
renderButtons();