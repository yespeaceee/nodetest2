// Userlist data array for filling in info box
var userListData = [];

// === DOM ready === 
$(document).ready(function(){
  
    // populate the user table on initial page load
	populateTable();
	
});

// === Functions ===

// Fill table with data
function populateTable(){
	
	// Empty content string
	var tableContent = '';
	
	// jQuery AJAX calls for JSON
	$.getJSON( '/users/userlist', function( data ){
		
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
