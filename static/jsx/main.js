$(document).ready(function(){
	console.log("Jquery ready to roll!");

	$('#calc_submit').on('submit', function(event){
		console.log('submitted clicked=============')
	});



	// $("#proj_rents_1").on('input', appOnInput);
	// $("#total_units_1").on('input', appOnInput);
	// var appOnInput = function(event){
	// 	var f = parseInt($("#in-freddie").val()) || 0;
	// }
	
	//calculations for Rental Rate Assumptions table
	var rental_rate_calc = function() {
		
	}
	

	var counter = 2;
	$("#rental_rate_form").on('click',(function(event) {
		console.log('clicked add_rental_rates button');
		event.preventDefault();
		$.ajax({
			method: 'POST',
			url: '/dashboard',
			success: function(response) {
				console.log(counter);
				$('#Rental_Rate_Assumptions').find('tbody')
					.append($("<tr id = 'rent_row_"+counter+"'>")
						.append($("<td>").html("<input type='text' name='proj_rents_"+counter+"' id='proj_rents_"+counter+"' placeholder='Project Rents #"+counter+"'>"))
						.append($("<td>").html("<input type='text' name='total_units_"+counter+"' id='total_units_"+counter+"' placeholder='Total Units #"+counter+"'>"))
						.append($("<td id = 'total_sf_"+counter+"'>"))
						.append($("<td>").html("<input type='text' name='avg_sf_per_unit_"+counter+"' id='avg_sf_per_unit_"+counter+"' placeholder='Avg SF/Unit #"+counter+"'>"))
						.append($("<td id = 'rent_per_sf_"+counter+"'>"))
						.append($("<td id = 'rent_per_unit_"+counter+"'>"))
						.append($("<td>").html("<a>[X]</a>"))
						)
				counter = counter + 1;
				
				// function to delete all additionally added rows from the Rental Rate Assumptions table
				$('tr[id^="rent_row_"] a').on('click', function(event) {
					console.log("clicked on X to delete row");
					// you could ge the id number from the tr 
					var id = $(this).closest('tr').attr('id').replace("rent_row_","");
					//then you could remove anything the that ends with _id 
					$('[id$="_'+id+'"]').remove();
				});

				$(this).on('input', rental_rate_calculations);


			} // end success
		}) //end ajax
	}));

	// function to delete initial row from the Rental Rate Assumptions table
	$('tr[id^="rent_row_"] a').on('click', function(event) {
		console.log("clicked on X to delete row");
		// you could ge the id number from the tr 
		var id = $(this).closest('tr').attr('id').replace("rent_row_","");
		//then you could remove anything the that ends with _id 
		$('[id$="_'+id+'"]').remove();
	});



}) //end of doc