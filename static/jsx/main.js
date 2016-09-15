$(document).ready(function(){
	console.log("Jquery ready to roll!");
	var counter = 2;

	$("#rental_rate_form").on('click',(function(event) {
		console.log('clicked add_rental_rates button');
		event.preventDefault();
		$.ajax({
			method: 'POST',
			url: '/dashboard',
			success: function(response) {
				console.log("Counter:",counter);
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
				
				//TEST FUNCTION =============================================================================================================================================
				$('tr[id^="rent_row_"]').on('click', function(event) {
					console.log("======counter",counter);
					for (i = 1; i <= counter; i++) {
						console.log("======i",i);
					}
				})
				// ==========================================================================================================================================================
	

				// function to delete all additionally added rows from the Rental Rate Assumptions table
				$('tr[id^="rent_row_"] a').on('click', function(event) {
					console.log("clicked on X to delete row");
					// you could ge the id number from the tr 
					var id = $(this).closest('tr').attr('id').replace("rent_row_","");
					//then you could remove anything the that ends with _id 
					$('[id$="_'+id+'"]').remove();
					counter = counter - 1;
				});


			} // end success
		}) //end ajax
	}));

	// ==========================================================================================================================================================
	// $("#proj_rents_1").on('input', appOnInput);
	// $("#total_units_1").on('input', appOnInput);
	// var appOnInput = function(event){
	// 	var f = parseInt($("#in-freddie").val()) || 0;
	// }
	
	//calculations for Rental Rate Assumptions table


	// var rental_rate_calc = function(rental_rate_row) {
	// 	total_sf = parseInt(avg_sf_per_unit_1.value) * parseInt(total_units_1.value)
	// 	return total_sf
	// }
		
	// 	$(#rent).each(function(index, tr) {
	// 	   var lines = $('td', tr).map(function(index, td) {
	// 		return $(td).text();
	// 	});
	// 	//This assumes that you have a table with an id of tblPurchaseOrders and that you have two cells of data
	// 			alert(lines[0] + ' ' + lines[1]);
	// 		})
	// 	});
	
	// ==========================================================================================================================================================




	// function to calculate row data in the Rental Rate Assumptions table
	$('tr[id^="rent_row_"]').on('click', function(event) {
		console.log("======counter",counter);
		for (i = 1; i <= counter; i++) {
			console.log("======i",i);
		}
	})


}) //end of doc