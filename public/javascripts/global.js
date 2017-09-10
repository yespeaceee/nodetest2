// Userlist data array for filling in info box
var userListData = [];

// === DOM ready === 
$(document).ready(function(){
  
    // populate the user table on initial page load
	populateTable();
	
	// Username link click
	$('#userList table tbody').on('click', 'td a.linkshowuser', showUserInfo);
	
});

// === Functions ===

// Fill table with data
function populateTable(){
	
	// Empty content string
	var tableContent = '';
	
	// jQuery AJAX calls for JSON
	$.getJSON( '/users/userlist', function( data ){
		
		// Stick user data array into a userlist variable in the global object
		userListData = data;
		
		// For each item in JSON, add a table row and cells to the content string
		$.each(data, function(){
			tableContent += '<tr>';
			tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.username + '">' + this.username + '</a></td>';
			tableContent += '<td>' + this.email + '</td>';
			tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
			tableContent += '</tr>';
		});
		
		// inject the whole content string into existing html table
		$('#userList table tbody').html(tableContent);
	});
};

// Show user info
function showUserInfo(event) {
	
	// Prevent Link from firing
	event.preventDefault();
	
	// Retrieve username from link rel attribute
	var thisUserName = $(this).attr('rel');
	
	// Get index of object based on id value
	var arrayPosition = userListData.map(function(arrayItem) {return arrayItem.username; }).indexOf(thisUserName);
	
	// Get User Object
	var thisUserObject = userListData[arrayPosition];
	
	// Populate info box
	$('#userInfoName').text(thisUserObject.fullname);
	$('#userInfoAge').text(thisUserObject.age);
	$('#userInfoGender').text(thisUserObject.gender);
	$('#userInfoLocation').text(thisUserObject.location);
};
