$(document).ready(function(){

	$('#Rental_Rate_Assumptions tbody').on('load', function(event){

	})

	var rentalRows = []
	var applyOnInput = function(event){
		var rrCounter = $('#Rental_Rate_Assumptions tbody tr').length;
		for(var i = 0; i <= rrCounter; ++i){
			// console.log(i);
			total_units = parseInt($("#total_units_"+i).val());
			avg_sf_per_unit = parseInt($("#avg_sf_per_unit_"+i).val());
			cost_per_unit = parseInt($("#cost_per_unit_"+i).val());
			rentalRows.push({total_units:total_units,avg_sf_per_unit:avg_sf_per_unit,cost_per_unit:cost_per_unit});
			// console.log(rentalRows)
		};
		//
		total_units_1 = parseInt($("#total_units_1").val());
		avg_sf_per_unit_1 = parseInt($("#avg_sf_per_unit_1").val());
		cost_per_unit_1 = parseInt($("#cost_per_unit_1").val());
		console.log("Total Units: ",total_units_1," Avg SF Unit: ",avg_sf_per_unit_1," cost per unit: ",cost_per_unit_1);

	}; //end applyOnInput

	// total_sf = avg_sf_per_unit_1 * total_units_1;
	// rent_sf = cost_per_unit_1/avg_sf_per_unit_1;
	// $("#rent_per_sf_1").text(rent_sf);
	// $("#total_sf_1").text(total_sf);


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
