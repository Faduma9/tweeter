/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
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
      $('.error-message-container').text('Tweet is too long. Maximum length is 140 characters.').slideDown(); event.preventDefault(); // Stop form submission
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

        // Fetch and render tweets after posting
        fetchTweets();

        alert('Tweet posted successfully!');
      })
      .fail(function(error) {
        // Handle the error response as needed
        console.error(error);

        // Display an error message to the user
        alert('Error posting tweet. Please try again.');
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

        // Clear the previous tweets
        $(".tweet-container").empty();

        // Check if the response is an array of tweets
        if (Array.isArray(response)) {
          // Iterate over the array and add each tweet to the container
          response.forEach(function(tweetData) {
            const $newTweet = createTweetElement(tweetData);
            $(".tweet-container").prepend($newTweet);
          });
        } else {
          // If the response is a single tweet, add it directly to the container
          const $newTweet = createTweetElement(response);
          $(".tweet-container").prepend($newTweet);
        }

        // Clear the tweet input after a successful tweet submission
        $('#tweet-text').val('');

        // Update timestamp for all tweets using timeago
        $(".timestamp").timeago();

        // Notify the user of a successful tweet using a less intrusive method
        alert('Tweet posted successfully!');
      })
      .fail(function(error) {
        // Handle the error response as needed
        console.error(error);

        // Notify the user of an unsuccessful tweet if needed
        alert('Error posting tweet. Please try again.');
      });
  };



  // Function to create a tweet element dynamically
  const createTweetElement = function(tweet) {
    const $tweet = $(`
      <article class="tweet">
        <header>
        <img src="${tweet.user.avatars}" alt="Profile Image"> <!-- Use the user's profile image URL -->
          <span class="username">${tweet.user.name}</span>
          <span class="handle">${tweet.user.handle}</span>
        </header>
        <p class="content">${$("<div>").text(tweet.content.text).html()}</p>
        <footer>
        <span class="timestamp" title="${new Date(tweet.created_at).toISOString()}"></span>
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
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $(".tweet-container").append($tweet);

      // Use timeago to format and update the timestamp
      $(".timestamp", $tweet).timeago();
    }
  };

  // Initial tweet data
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

  // Call renderTweets to dynamically render the tweets
  renderTweets(data);
});
