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



// Start of ALL calculations for Rental Rate Assumptions table --------------------------------------------------------------------------------------
	var applyOnInput = function(event){

	//RENTAL RATE ASSUMPTIONS
		// Calculates row data for Rental Rate Assumptions -------------------------------------------
		total_units = parseInt($('.total_units', this).val());
		avg_sf_per_unit = parseInt($(".avg_sf_per_unit", this).val());
		rent_per_unit = parseInt($(".rent_per_unit", this).val());

		var total_sf = total_units*avg_sf_per_unit;
		var rent_per_sf = rent_per_unit/avg_sf_per_unit;

		$('.total_sf', this).text(total_sf);
		$('.rent_per_sf', this).text(rent_per_sf);

		// Calculates column sum data for Rental Rate Assumptions -------------------------------------------
		var $tu = $('#Rental_Rate_Assumptions tbody .total_units');
		var $tsf = $('#Rental_Rate_Assumptions tbody .total_sf');
		var $rrow = $('#Rental_Rate_Assumptions tbody .rent_row');

		sum_total_units = 0;
		sum_total_sf = 0;
		SP_list_rpu = 0;

		$tu.each(function(){
			sum_total_units += parseInt($(this).val());
		});

		$tsf.each(function(){
			sum_total_sf += parseInt($(this).text());
		});

		$rrow.each(function(){
			num_units = $(this).find('.total_units').val();
			rent_units = $(this).find('.rent_per_unit').val();
			SP_list_rpu = SP_list_rpu + (num_units * rent_units);
		})

		sum_avg_sf_per_unit = sum_total_sf/sum_total_units;
		SP_list_rpu = SP_list_rpu/sum_total_units;
		sum_rent_per_sf = SP_list_rpu/sum_avg_sf_per_unit;

		//appends total values to dashboard
		$('#Rental_Rate_Assumptions tfoot .total_units').text(sum_total_units);
		$('#Rental_Rate_Assumptions tfoot .total_sf').text(sum_total_sf);
		$('#Rental_Rate_Assumptions tfoot .avg_sf_per_unit').text(sum_avg_sf_per_unit);
		$('#Rental_Rate_Assumptions tfoot .rent_per_sf').text(sum_rent_per_sf);
		$('#Rental_Rate_Assumptions tfoot .rent_per_unit').text(SP_list_rpu);
	//END RENTAL RATE Assumptions

	}; //end applyOnInput function

	//Runs input function
	$('.rent_row').on('input', applyOnInput);

//--------------------------------------------------------------------------------------




	//Rental Rate Form Dynamic Table -------------------------------------------
	$("#rental_rate_form").on('click', function(event) {
		event.preventDefault();
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
				$('tr[class^="rent_row"] a').on('click', function(event) {
					$(this).parent().parent().remove();
					applyOnInput();
				});
				//Runs input function inside  -------------------------------------------
				$('.rent_row').on('input', applyOnInput);

		}) //end addrow
	}); //end of doc
