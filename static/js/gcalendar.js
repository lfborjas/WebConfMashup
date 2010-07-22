google.load("gdata", "2.2");

google.setOnLoadCallback(onGoogleDataLoad);
function onGoogleDataLoad(){
	var scope = "http://www.google.com/calendar/feeds/"; //could be a list of scopes, for more services
	var calendarService = new google.gdata.calendar.CalendarService('WebConfMashup');	
	//the default private calendar:
	var feedUri = 'http://www.google.com/calendar/feeds/default/private/full/';
	
	$('#google-login').button();
	if(!google.accounts.user.checkLogin(scope)){	
		//bind the login button:		
		$('#google-login').click(logIn);
	}else{//is authenticated
		//bind the logout and show the feed
		$('#google-login').text("Logout from calendar");
		$('#google-login').click(logOut);
		getCalendarFeed();
		
		//show the event creation form:
	}
	
	function logIn(){		 
		 var token = google.accounts.user.login(scope);
		 //change the button (show logout):
		 $('#google-login').text("Logout from calendar");
		 $('#google-login').unbind("click");
		 $('#google-login').click(logOut);
		 //get the events from the calendar:
		 getCalendarFeed();
	}
	
	function getCalendarFeed(){		
		calendarService.getEventsFeed(feedUri, 
		function(result){ //callback function
			$.each(result.feed.entry, function(index,event){
				$("#calendar-feed").append("<li>"+event.getTitle().getText()+"</li>");
			});				
		}, 
		function(error){ //for error handling
			$('#calendar-error').text(error);
		});
	}
	
	function logOut(){
		google.accounts.user.logout();
		$('#google-login').text("Login to calendar");
		$('#google-login').unbind("click");
		$('#google-login').click(logIn);
	}
	
	
	
	
}


