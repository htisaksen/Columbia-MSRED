$(document).ready(function(){


//Javascript rental rate first insert row
	$('#Rental_Rate_Assumptions').find('tbody')
		.append($("<tr class = 'rent_row'>")
		.append($("<td>").html("<input type='text' name='proj_rents' class='proj_rents' placeholder='Project Rents'></td>"))
		.append($("<td>").html("<input type='text' name='total_units' class='total_units' placeholder='Total Units'></td>"))
		.append($("<td class = 'total_sf'></td>").text("0"))
		.append($("<td>").html("<input type='text' name='avg_sf_per_unit' class='avg_sf_per_unit' placeholder='Avg SF/Unit'></td>"))
		.append($("<td class = 'rent_per_sf'></td>").text("$0.00"))
		.append($("<td>").html("<input type='text' name='rent_per_unit' class='rent_per_unit' placeholder='Cost Per Unit'></td>"))
		)
// Global objects: Inputs (possibly calculated values)
	var g = {}


	var rentalRows = []
	var applyOnInput = function(event){
		var rrCounter = $('#Rental_Rate_Assumptions tbody tr').length;
		console.log("rrcounter: ",rrCounter);
		console.log($('this'));
		$('this > tr.rent_row > td').html("I have replaced the entire row of text");
		console.log("you have already clicked on this");


		// for(var i = 1; i <= rrCounter; ++i){
		// 	// console.log("i= ",i);
		// 	total_units = parseInt($("#total_units_"+i).val());
		// 	avg_sf_per_unit = parseInt($("#avg_sf_per_unit_"+i).val());
		// 	cost_per_unit = parseInt($("#cost_per_unit_"+i).val());
		// 	rentalRows.push({total_units:total_units,avg_sf_per_unit:avg_sf_per_unit,cost_per_unit:cost_per_unit});
		// 	// console.log(rentalRows)
		// };

//specific example test ===============================================
		// total_units_1 = parseInt($("#total_units_1").val());
		// avg_sf_per_unit_1 = parseInt($("#avg_sf_per_unit_1").val());
		// cost_per_unit_1 = parseInt($("#cost_per_unit_1").val());
		// console.log("Total Units: ",total_units_1," Avg SF Unit: ",avg_sf_per_unit_1," cost per unit: ",cost_per_unit_1);

	}; //end applyOnInput function

	$('tr').on('input', applyOnInput);






	//Rental Rate Form Dynamic Table
	$("#rental_rate_form").on('click', function(event) {
		console.log('clicked add_rental_rates button');
		var rrCounter = $('#Rental_Rate_Assumptions tbody tr').length+1;
		console.log("RRcounter: "+rrCounter)
		event.preventDefault();
		$.ajax({
			method: 'POST',
			url: '/dashboard',
			success: function(response) {
				$('#Rental_Rate_Assumptions').find('tbody')
					.append($("<tr id = 'rent_row_"+rrCounter+"'>")
					.append($("<td>").html("<input type='text' name='proj_rents_"+rrCounter+"' id='proj_rents_"+rrCounter+"' placeholder='Project Rents'></td>"))
					.append($("<td>").html("<input type='text' name='total_units_"+rrCounter+"' id='total_units_"+rrCounter+"' placeholder='Total Units'></td>"))
					.append($("<td id = 'total_sf_"+rrCounter+"'></td>").text("0"))
					.append($("<td>").html("<input type='text' name='avg_sf_per_unit_"+rrCounter+"' id='avg_sf_per_unit_"+rrCounter+"' placeholder='Avg SF/Unit'></td>"))
					.append($("<td id = 'rent_per_sf_"+rrCounter+"'></td>").text("$0.00"))
					.append($("<td>").html("<input type='text' name='rent_per_unit_"+rrCounter+"' id='rent_per_unit_"+rrCounter+"' placeholder='Cost Per Unit'></td>"))
					.append($("<td>").html("<a>[X]</a></td>"))
					)

				// function to delete all additionally added rows from the Rental Rate Assumptions table
				$('tr[id^="rent_row_"] a').on('click', function(event) {
					console.log("clicked on X to delete row");
					$(this).parent().parent().remove();
					rrCounter = rrCounter - 1;
				});
				// dynamic input calculations
				$('tr').on('input', applyOnInput);



				//TEST FUNCTION =============================================================================================================================================
				// $('tr[id^="rent_row_"]').on('click', function(event) {
				// 	console.log("======rrCounter",rrCounter);
				// 	for (i = 1; i <= rrCounter; i++) {
				// 		console.log("======i",i);
				// 	}
				// })
				// ==========================================================================================================================================================

			} // end success
		}) //end ajax
	});


}) //end of doc
