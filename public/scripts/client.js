/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  console.log('timeago', timeago);
  $('form').submit(function(event) {
    // Hide the error element upon submission
    $('.error-message-container').slideUp();
    const tweetContent = $('#tweet-text').val(); // Get the tweet content

    // Validate tweet presence
    if (tweetContent.trim() === '') {
      // Instead of alert, use jQuery to show the error message
      $('.error-message-container').text('Tweet content is required.').slideDown();
      event.preventDefault(); // Stop form submission
      return; // Exit out of the function immediately.
    }

    // Validate tweet length
    else if (tweetContent.length > 140) {
      //Display error message for tweet exceeding maximum length
      $('.error-message-container').text('Tweet is too long. Maximum length is 140 characters.').slideDown();
      event.preventDefault(); // Stop form submission
      return; // Exit out of the function immediately.
    }


    // If validations pass, serialize the form data
    const formData = $(this).serialize();
    console.log(formData);

    // Use AJAX to submit a POST request with the serialized data
    $.post('/tweets', formData)
      .done(function(response) {
        // Handle the success response as needed
        console.log(response);
        // Reset character counter to 140 in the UI
        $('.counter').text(140);

        // Clear the tweet input after a successful tweet submission
        $('#tweet-text').val('');
        // Fetch and render tweets after posting
        fetchTweets();

      })
      .fail(function(error) {
        // Handle the error response as needed
        console.error(error);

        // Display an error message to the user
      });

    // Prevent the default form submission to avoid page reload
    event.preventDefault();
  });


  // Function to fetch tweets from the server and render them
  const fetchTweets = function() {
    // endpoint to fetch tweets from the server
    $.get('/tweets')
      .done(function(response) {
        // Log the response to check its structure
        console.log('Server response:', response);



        // Check if the response is an array of tweets
        if (Array.isArray(response)) {
          renderTweets(response);
        }


      })
      .fail(function(error) {
        // Handle the error response as needed
        console.error(error);

        // Notify the user of an unsuccessful tweet if needed

      });
  };



  // Function to create a tweet element dynamically
  const createTweetElement = function(tweet) {
    let timePassed = timeago.format(new Date(tweet.created_at));
    let $tweet = $(`
      <article class="tweet">
        <header class="tweetheader"> 
        <img src="${tweet.user.avatars}" alt="Profile Image"> <!-- Use the user's profile image URL -->
          <div class="user-info">
          <span class="username">${tweet.user.name}</span>
          <span class="handle">${tweet.user.handle}</span>
          </div>
        </header>
        <p class="content">${$("<div>").text(tweet.content.text).html()}</p>
        <footer>
        <time datetime="${new Date(tweet.created_at).toISOString()}">
      ${timePassed}
      
        </time>
        <div class="icons">
            <button class="icon-button like-button">
              <i class="fas fa-heart"></i>
            </button>
            <button class="icon-button retweet-button">
              <i class="fas fa-retweet"></i>
            </button>
            <button class="icon-button flag-button">
              <i class="fas fa-flag"></i>
            </button>
          </div>
        </footer>
      </article>
    `);

    return $tweet;
  };

  // Function to render an array of tweets dynamically
  const renderTweets = function(tweets) {
    // Clear the existing tweets in the container before rendering new ones
    $(".tweet-container").empty();

    // Loop through the tweets array and append each tweet to the container
    for (let i = tweets.length - 1; i >= 0; i--) {
      const tweet = tweets[i];
      const $tweet = createTweetElement(tweet);
      $(".tweet-container").append($tweet);
    }


  };


  // Call renderTweets to dynamically render the tweets
  fetchTweets();
});
