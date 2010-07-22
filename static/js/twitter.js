
$(function() {
    $("#menu").tabs();
    $("#facebook_menu").tabs();

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
    	  T('#status').tweetBox({
    		  label: "O RLY?",
    		  onTweet: function(t, htmlt){
    			  $("#timeline").prepend("<li class='tweet'> @"+screenName+" "
						   +t+"</li>");
    			  T("#timeline li:first").hovercards();
    		  }
    	  });
      });
      
  	  //show the timeline with hovercards
      twttr.anywhere(function(T){
    	  	var buf = 1;
    	  	T.User.current().homeTimeline().each(function(status){
        		$("#timeline").append("<li class='tweet'> @"+status.user.screenName+" "+status.text+"</li>");
        		//update every 19 tweets
        		buf = (buf%20 == 0) ? 1 : buf+1;
        		if(buf==1){        			
        			T.hovercards();
        		}
        		
      });
    	    
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



