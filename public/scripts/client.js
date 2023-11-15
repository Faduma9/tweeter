/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



    
$(document).ready(function() {

  // Function to create a tweet element dynamically
  const createTweetElement = function(tweet) {
  
    const $tweet = $(`
      <article class="tweet">
        <header>
          <span class="username">${tweet.user.name}</span>
          <span class="handle">${tweet.user.handle}</span>
        </header>
        <p class="content">${tweet.content.text}</p>
        <footer>
          <span class="timestamp">${tweet.created_at}</span>
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
  const renderTweets = function (tweets) {
    // Clear the existing tweets in the container before rendering new ones
    $(".tweet-container").empty();
  
    // Loop through the tweets array and append each tweet to the container
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $(".tweet-container").append($tweet);
    }
  };
  
  //tweet data
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
