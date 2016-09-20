$(document).ready(function(){

//Javascript Rental Rate Assumptions first insert row -------------------------------------------
	$('#Rental_Rate_Assumptions').find('tbody')
		.append($("<tr class = 'rent_row'>")
		.append($("<td>").html("<input type='text' name='proj_rents' class='proj_rents' placeholder='Project Rents'></td>"))
		.append($("<td>").html("<input type='text' name='total_units' class='total_units' placeholder='Total Units'></td>"))
		.append($("<td class = 'total_sf'></td>").text("0"))
		.append($("<td>").html("<input type='text' name='avg_sf_per_unit' class='avg_sf_per_unit' placeholder='Avg SF Per Unit'></td>"))
		.append($("<td class = 'rent_per_sf'></td>").text("$0.00"))
		.append($("<td>").html("<input type='text' name='rent_per_unit' class='rent_per_unit' placeholder='Rent Per Unit'></td>"))
		)
//Javascript Market Rental Rate Assumptions first insert row -------------------------------------------
	$('#Market_Rental_Assumptions').find('tbody')
		.append($("<tr class = 'year_row'>")
		.append($("<td></td>"))
		.append($("<td></td>"))
		.append($("<td>").html("<input type='text' name='mktRentRevenue' class='mktRentRevenue' placeholder='Revenue (%)'></td>"))
		.append($("<td>").html("<input type='text' name='mktRentExpenses' class='mktRentExpenses' placeholder='Expenses (%)'></td>"))
		.append($("<td>").html("<input type='text' name='mktRentVacancy' class='mktRentVacancy' placeholder='Vacancy (%)'></td>"))
		.append($("<td>").html("<input type='text' name='mktRentConcessions' class='mktRentConcessions' placeholder='Concessions (%)'></td>"))
		.append($("<td>").html("<input type='text' name='mktRentCreditLoss' class='mktRentCreditLoss' placeholder='Credit Loss (%)'></td>"))
		)


// ============================================================================================================
// Start of ALL calculations for Rental Rate Assumptions table --------------------------------------------------------------------------------------
// ============================================================================================================

	var applyOnInput = function(event){
		var test = {propertyName: $('#Property_Name').val()}
		console.log(test.propertyName)
		// Global objects: Inputs (possibly calculated values)
				// var g = {
				// 	analysisStartDate: $('#Analysis_Start_Date').val();
				// 	propertyName:	$('#Property_Name').val();
				// 	propertyLocation: $('#Property_Location').val();
				// 	propertyType: $('#Property_Type').val();
				// 	purchasePrice: parseInt($('#Purchase_Price').val());
				// 	closingCostPercentage: parseInt($('#Closing_Costs_Percentage').val());
				// 	saleYear: $('#Sale_Year').val());
				// 	terminalCapRate: $('#Terminal_Cap_Rate').val());
				// 	salesCosts: $('#Sales_Costs').val());
				// 	leverage: $('#Leverage').val());
				// 	interestRateOnMortgage: $('#Interest_Rate_on_Mortgage').val());
				// 	loanTerm: $('#Loan_Term').val());
				// 	loanAmortization: $('#Loan_Amortization').val());
				// 	unleveredDiscountRate: $('#UL_Discount_Rate').val());
				// 	leveredDiscountRate: $('#L_Discount_Rate').val());
				// 	otherIncomeTotal: $('#Other_Income_Total').val());
				// 	lessVacancy: $('#Less_Vacancy').val());
				// 	lessConcessions: $('#Less_Concessions').val());
				// 	lessCreditLoss: $('#Less_Credit_Loss').val());
				// 	realEstateTaxesTotal: $('#Real_Estate_Taxes_Total').val());

				// 	insuranceTotal: $('#Insurance_Total').val());
				// 	utlitiesTotal: $('#Utilities_Total').val());
				// 	payrollTotal: $('#Payroll_Total').val());
				// 	repairsAndMaintenanceTotal: $('#Repairs_and_Maintenance_Total').val());
				// 	contractServicesTotal: $('#Contract_Services_Total').val());
				// 	turnoverTotal: $('#Turnover_Total').val());
				// 	salesAndMarketingTotal: $('#Sales_and_Marketing_Total').val());
				// 	administrativeTotal: $('#Administrative_Total').val());
				// 	managementPercentage: $('#Management_Percentage').val());
				// 	replacementReservesPercentage: $('#Replacement_Reserves_Percentage').val());
				// 	// rentalRateAssumptions: NEED TO PLACE OBJECT IN HERE
				// 	// marketRentalAssumptions: NEED TO PLACE OBJECT IN HERE
				// }


	//RENTAL RATE ASSUMPTIONS Table
		// Calculates row data for Rental Rate Assumptions -------------------------------------------
		totalUnits = parseInt($('.total_units', this).val());
		avgSfPerUnit = parseInt($(".avg_sf_per_unit", this).val());
		rentPerUnit = parseInt($(".rent_per_unit", this).val());

		var totalSf = totalUnits*avgSfPerUnit;
		var rentPerSf = rentPerUnit/avgSfPerUnit;

		$('.total_sf', this).text(totalSf);
		$('.rent_per_sf', this).text(rentPerSf);

		// Calculates column sum data for Rental Rate Assumptions -------------------------------------------
		var $tu = $('#Rental_Rate_Assumptions tbody .total_units');
		var $tsf = $('#Rental_Rate_Assumptions tbody .total_sf');
		var $rrow = $('#Rental_Rate_Assumptions tbody .rent_row');

		sumTotalUnits = 0;
		sumTotalSf = 0;
		SpListRpu = 0;

		//calculates total value: Total Units
		$tu.each(function(){
			sumTotalUnits += parseInt($(this).val());
		});

		//calculates total value: Total SF
		$tsf.each(function(){
			sumTotalSf += parseInt($(this).text());
		});

		//calculates total value: Rent Per Unit
		$rrow.each(function(){
			numUnits = $(this).find('.total_units').val();
			rentUnits = $(this).find('.rent_per_unit').val();
			SpListRpu = SpListRpu + (numUnits * rentUnits);
		})

		sumAvgSfPerUnit = sumTotalSf/sumTotalUnits; //calculates total value: Avg SF Per Unit
		SpListRpu = SpListRpu/sumTotalUnits; 		//calculates total value: Rent Per Unit
		sumRentPerSf = SpListRpu/sumAvgSfPerUnit;		//calculates total value: Rent Per SF

		//appends total values to dashboard
		$('#Rental_Rate_Assumptions tfoot .total_units').text(sumTotalUnits);
		$('#Rental_Rate_Assumptions tfoot .total_sf').text(sumTotalSf);
		$('#Rental_Rate_Assumptions tfoot .avg_sf_per_unit').text(sumAvgSfPerUnit);
		$('#Rental_Rate_Assumptions tfoot .rent_per_sf').text(sumRentPerSf);
		$('#Rental_Rate_Assumptions tfoot .rent_per_unit').text(SpListRpu);
	//END RENTAL RATE ASSUMPTIONS Table

	}; //end applyOnInput function

	//Runs input function
	$('.rent_row').on('input', applyOnInput);
	$('#Property_Information').on('input', applyOnInput);


// ============================================================================================================
//Rental Rate Form Dynamic Table
// ============================================================================================================
	// adds one row to table when the 'add' button is clicked
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

		// function to delete all additionally added rows from the Rental Rate Assumptions table
		$('tr[class^="rent_row"] a').on('click', function(event) {
			$(this).parent().parent().remove();
			applyOnInput();
		});
		//Runs input function inside
		$('.rent_row').on('input', applyOnInput);

	}) //end addrow function








	// RETURNS SUMMARY
	// END RETURN SUMMARY

	// CURRENT FINANCIALS
	// END CURRENT FINANCIALS

// ============================================================================================================
//MARKET RENTAL ASSUMPTIONS Dynamic Table
// ============================================================================================================
	// adds one row to table when the 'add' button is clicked
	$("#market_rental_form").on('click', function(event) {
		event.preventDefault();
		$('#Market_Rental_Assumptions').find('tbody')
			.append($("<tr class = 'year_row'>")
			.append($("<td></td>"))
			.append($("<td></td>"))
			.append($("<td>").html("<input type='text' name='mktRentRevenue' class='mktRentRevenue' placeholder='Revenue (%)'></td>"))
			.append($("<td>").html("<input type='text' name='mktRentExpenses' class='mktRentExpenses' placeholder='Expenses (%)'></td>"))
			.append($("<td>").html("<input type='text' name='mktRentVacancy' class='mktRentVacancy' placeholder='Vacancy (%)'></td>"))
			.append($("<td>").html("<input type='text' name='mktRentConcessions' class='mktRentConcessions' placeholder='Concessions (%)'></td>"))
			.append($("<td>").html("<input type='text' name='mktRentCreditLoss' class='mktRentCreditLoss' placeholder='Credit Loss (%)'></td>"))
			.append($('<td>').html("<a>[X]</a></td>"))
			)

		// function to delete all additionally added rows
		$('tr[class^="year_row"] a').on('click', function(event) {
			$(this).parent().parent().remove();
			applyOnInput();
		});

	}); //end addrow function


// ============================================================================================================
}); //end of doc
