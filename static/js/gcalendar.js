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
		postLogin();		
		
	}
	
	$('#create-event').click(insertEvent);
	
	function insertEvent(e){
		e.preventDefault();
		var entry = new google.gdata.calendar.CalendarEventEntry();
		entry.setTitle(google.gdata.atom.Text.create($('#id_gevent_title').val()));
		// Create a When object that will be attached to the event
		var when = new google.gdata.When();

		// Set the start and end time of the When object
		var startTime = google.gdata.DateTime.fromIso8601($('#id_gevent_start').val());
		var endTime = google.gdata.DateTime.fromIso8601($('#id_gevent_end').val());
		when.setStartTime(startTime);
		when.setEndTime(endTime);

		// Add the When object to the event 
		entry.addTime(when);
		console.log("about to insert...");
		calendarService.insertEntry(feedUri, entry,
				function(result){ //success callback
					console.log("inserted!");
					getCalendarFeed();
				},
				function(error){//error callback
					console.log(error);
					$('#calendar-error').append("<strong>"+error+"</strong>");
				}, //error callback
				google.gdata.calendar.CalendarEventEntry)
	}
	
	function logIn(){		 
		 var token = google.accounts.user.login(scope);		 		 
	}
	
	function postLogin(){
		//change the button (show logout):
		 $('#google-login').text("Logout from calendar");
		 $('#google-login').unbind("click");
		 $('#google-login').click(logOut);
		 //get the events from the calendar:
		 getCalendarFeed();
		 //show the form
		 $('#event-form').show();
	}
	
	function getCalendarFeed(){		
		calendarService.getEventsFeed(feedUri, 
		function(result){ //callback function
			$("#calendar-feed").empty();
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


