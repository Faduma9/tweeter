$(document).ready(function() {
    const tweets = 140;
    
    $('.new-tweet textarea').on('input', function() {
      const inputText = $(this).val().length;
      console.log (inputText);
      const tweetlength = tweets - inputText;
      const characterCounter = $(`output.counter`);
      characterCounter.text(tweetlength);
     

      if (tweetlength < 0 ) {
        characterCounter.addClass("exceeded-limit");
      } else {
        characterCounter.removeClass("exceeded-limit");
      }
    });
  });
  