// Userlist data array for filling in info box
var userListData = [];

// === DOM ready === 
$(document).ready(function(){
  
    // populate the user table on initial page load
	populateTable();
	
	// Username link click
	$('#userList table tbody').on('click', 'td a.linkshowuser', showUserInfo);
  
    // Add user button click
    $('#btnAddUser').on('click', addUser);
	
    // Delete user link click
    $('#userList table tbody').on('click', 'td a.linkdeleteuser', deleteUser);
  
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

// Add user
function addUser(event) {
  event.preventDefault();
  
  // Super basic validation - increase errorCount if any fields blank
  var errorCount = 0;
  $('#addUser input').each(function(index, val){
      if($(this).val() === '') { errorCount++; }
  });
  
  // Check and make sure that errorCount still zero
  if(errorCount === 0) {
      
    // If it is, compile all user info into one object
    var newUser = {
      'username' : $('#addUser fieldset input#inputUserName').val(),
      'email' : $('#addUser fieldset input#inputUserEmail').val(),
      'fullname' : $('#addUser fieldset input#inputUserFullname').val(),
      'age' : $('#addUser fieldset input#inputUserAge').val(),
      'location' : $('#addUser fieldset input#inputUserLocation').val(),
      'gender' : $('#addUser fieldset input#inputUserGender').val()
      
    }
    
    // Use AJAX to post the object to our adduser service
    $.ajax({
        type: 'POST',
        data: newUser,
        url: '/users/adduser',
        dataType: 'JSON'
    }).done(function( response ){
      
        // Check for successful (blank) response
        if (response.msg === '') {
            
            //Clear the form inputs
            $('#addUser fieldset input').val('');
          
            populateTable();
        }
        else {
            
            // If something goes wrong, alert the error message that our service returned
            alert('Error' + response.msg);
          
        }
    });
  }
  else {
      // If errorCount is more than 0, error out
      alert('Please fill in all fields');
      return false;
  }
  
};

//  Delete user
function deleteUser(event) {
  
    event.preventDefault();
  
    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this user?');
  
    // Check and make sure the user confirmed
    if (confirmation === true) {
      
        // if so, do delete
        $.ajax({
            type: 'DELETE',
            url: '/users/deleteuser/' + $(this).attr('rel')
        }).done(function( response ) {
            
            // Check for a successful (blank) message
            if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }
          
            // Update table
            populateTable();
        });
    }
    else {
        
        // If they said no to the confirm, do nothing
        return false;
      
    }
    
};


