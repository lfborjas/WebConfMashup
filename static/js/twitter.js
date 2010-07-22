
$(function() {
    $("#menu").tabs();
    
    function showInfo(currentUser){
      screenName = currentUser.data('screen_name');
      profileImage = currentUser.data('profile_image_url');
      profileImageTag = "<img src='" + profileImage + "'/>";      	  
      $('#twitter-connect-placeholder').append("Logged in as " + profileImageTag + " " + screenName);
      $("#twitter-connect-placeholder").append('<button id="signout" type="button">Sign out of Twitter</button>');
      $("#signout").bind("click", function () {
        twttr.anywhere.signOut();          	
      });
      //show the twitter box:
      twttr.anywhere(function(T){
    	  T('#status').tweetBox({label: "O RLY?"});
      });
      
    }
    
            
    twttr.anywhere(function (T) {
        var currentUser,
            screenName,
            profileImage,
            profileImageTag;

        if (T.isConnected()) {
          currentUser = T.currentUser;
          showInfo(currentUser);  
        } else {
            T("#twitter-connect-placeholder").connectButton({
                authComplete : showInfo      			
            });
        };
        
        T.bind("signOut", function (e) {
            $("#twitter-connect-placeholder").empty();
            T("#twitter-connect-placeholder").connectButton({
                authComplete : showInfo      			
            });
        });
    });
}); //end of document ready



