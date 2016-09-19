$(document).ready(function(){

// Global objects: Inputs (possibly calculated values)
		// var g = {
		// 	analysisStartDate:
		// 	propertyName:
		// 	propertyLocation:
		// 	purchasePrice:
		// 	closingCost:
		// 	saleYear:
		// 	terminalCapRate:
		// 	salesCosts:
		// 	leverage:
		// 	interestRateOnMortgage:
		// 	loanTerm:
		// 	loanAmortization:
		// 	unleveredDiscountRate:
		// 	leveredDiscountRate:
		// 	otherIncome:
		// 	lessVacancy:
		// 	lessConcessions:
		// 	lessCreditLoss:
		// 	realEstateTaxes:
		// 	insurance:
		// 	utlities:
		// 	payroll:
		// 	repairsAndMaintenance:
		// 	contractServices:
		// 	turnover:
		// 	salesAndMarketing:
		// 	administrative:
		// 	management:
		// 	replacementReserves:
		// 	// rentalRateAssumptions: NEED TO PLACE OBJECT IN HERE
		// 	// marketRentalAssumptions: NEED TO PLACE OBJECT IN HERE
		// }


//Javascript rental rate first insert row -------------------------------------------
	$('#Rental_Rate_Assumptions').find('tbody')
		.append($("<tr class = 'rent_row'>")
		.append($("<td>").html("<input type='text' name='proj_rents' class='proj_rents' placeholder='Project Rents'></td>"))
		.append($("<td>").html("<input type='text' name='total_units' class='total_units' placeholder='Total Units'></td>"))
		.append($("<td class = 'total_sf'></td>").text("0"))
		.append($("<td>").html("<input type='text' name='avg_sf_per_unit' class='avg_sf_per_unit' placeholder='Avg SF/Unit'></td>"))
		.append($("<td class = 'rent_per_sf'></td>").text("$0.00"))
		.append($("<td>").html("<input type='text' name='rent_per_unit' class='rent_per_unit' placeholder='Rent Per Unit'></td>"))
		)




// Calculates ALL Rental Rate Assumptions calculations -------------------------------------------
	// Calculates Rental Rate Assumptions row calculations
	var applyOnInput = function(event){
		var rrCounter = $('#Rental_Rate_Assumptions tbody tr').length;
		total_units = parseInt($('.total_units', this).val());
		avg_sf_per_unit = parseInt($(".avg_sf_per_unit", this).val());
		rent_per_unit = parseInt($(".rent_per_unit", this).val());
		// console.log("Total Units: ",total_units," Avg SF Unit: ",avg_sf_per_unit," Rent per unit: ",cost_per_unit);

		var total_sf = total_units*avg_sf_per_unit;
		var rent_per_sf = rent_per_unit/avg_sf_per_unit;

		$('.total_sf', this).text(total_sf);
		$('.rent_per_sf', this).text(rent_per_sf);
		
		// Calculates Rental Rate Assumptions column sum calculations
		var tu = $('#Rental_Rate_Assumptions tbody .total_units');
		var tsf = $('#Rental_Rate_Assumptions tbody .total_sf');
		var trow = $('#Rental_Rate_Assumptions tbody .rent_row');
		console.log("trow.get(1):",trow.eq().val());
		console.log("TROW:",trow);

		
		sum_total_units = 0;
		sum_total_sf = 0;
		sum_rent_per_unit = 0;

		tu.each(function(){
			console.log(this);
			sum_total_units = sum_total_units + parseInt($(this).val());
		});

		tsf.each(function(){
			console.log(this);
			sum_total_sf = sum_total_sf + parseInt($(this).text());
		});
		sum_avg_sf_per_unit = sum_total_sf/sum_total_units;
		
//WIP------------------------------------------------------------------		
		var sumproduct_rent = function(event){

		}

		sum_rent_per_unit = sum_rent_per_unit + (total_units * rent_per_unit);
		sum_rent_per_unit = sum_rent_per_unit/sum_total_units;
		console.log("sum_rent_per_unit:",sum_rent_per_unit);
		
		sum_rent_per_sf = sum_rent_per_unit/sum_avg_sf_per_unit;
		console.log("sum_rent_per_sf:",sum_rent_per_sf);
//WIP------------------------------------------------------------------		

		$('#Rental_Rate_Assumptions tfoot .total_units').text(sum_total_units);
		$('#Rental_Rate_Assumptions tfoot .total_sf').text(sum_total_sf);
		$('#Rental_Rate_Assumptions tfoot .avg_sf_per_unit').text(sum_avg_sf_per_unit);
		$('#Rental_Rate_Assumptions tfoot .rent_per_sf').text(sum_rent_per_sf);
		$('#Rental_Rate_Assumptions tfoot .rent_per_unit').text(sum_rent_per_unit);


	}; //end applyOnInput function 




	//Runs input function
	$('.rent_row').on('input', applyOnInput);

//--------------------------------------------------------------------------------------




	//Rental Rate Form Dynamic Table -------------------------------------------
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
					.append($("<tr class = 'rent_row'>")
					.append($("<td>").html("<input type='text' name='proj_rents' class='proj_rents' placeholder='Project Rents'></td>"))
					.append($("<td>").html("<input type='text' name='total_units' class='total_units' placeholder='Total Units'></td>"))
					.append($("<td class = 'total_sf'></td>").text("0"))
					.append($("<td>").html("<input type='text' name='avg_sf_per_unit' class='avg_sf_per_unit' placeholder='Avg SF/Unit'></td>"))
					.append($("<td class = 'rent_per_sf'></td>").text("$0.00"))
					.append($("<td>").html("<input type='text' name='rent_per_unit' class='rent_per_unit' placeholder='Rent Per Unit'></td>"))
					.append($('<td>').html("<a>[X]</a></td>"))
					)

				// function to delete all additionally added rows from the Rental Rate Assumptions table -------------------------------------------
				$('tr[id^="rent_row_"] a').on('click', function(event) {
					console.log("clicked on X to delete row");
					$(this).parent().parent().remove();
					rrCounter = rrCounter - 1;
				});
				// dynamic input calculations -------------------------------------------
				$('.rent_row').on('input', applyOnInput);



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
