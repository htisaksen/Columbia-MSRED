$(document).ready(function(){

//Javascript Rental Rate Assumptions first insert row -------------------------------------------
	$('#Rental_Rate_Assumptions').find('tbody')
		.append($("<tr class = 'rent_row'>")
		.append($("<td>").html("<input type='text' name='proj_rents' class='proj_rents' placeholder='Project Rents'></td>"))
		.append($("<td>").html("<input type='number' name='total_units' class='total_units' placeholder='Total Units'></td>"))
		.append($("<td class = 'total_sf'></td>").text("0"))
		.append($("<td>").html("<input type='number' name='avg_sf_per_unit' class='avg_sf_per_unit' placeholder='Avg SF Per Unit'></td>"))
		.append($("<td class = 'rent_per_sf'></td>").text("$0.00"))
		.append($("<td>").html("<input type='number' name='rent_per_unit' class='rent_per_unit' placeholder='Rent Per Unit'></td>"))
		)
//Javascript Market Rental Rate Assumptions first insert row -------------------------------------------
	$('#Market_Rental_Assumptions').find('tbody')
		.append($("<tr class = 'year_row'>")
		.append($("<td>Year 1</td>"))
		.append($("<td></td>"))
		.append($("<td>").html("<input type='number' name='mktRentRevenue' class='mktRentRevenue' placeholder='Revenue (%)'></td>"))
		.append($("<td>").html("<input type='number' name='mktRentExpenses' class='mktRentExpenses' placeholder='Expenses (%)'></td>"))
		.append($("<td>").html("<input type='number' name='mktRentVacancy' class='mktRentVacancy' placeholder='Vacancy (%)'></td>"))
		.append($("<td>").html("<input type='number' name='mktRentConcessions' class='mktRentConcessions' placeholder='Concessions (%)'></td>"))
		.append($("<td>").html("<input type='number' name='mktRentCreditLoss' class='mktRentCreditLoss' placeholder='Credit Loss (%)'></td>"))
		)


// ============================================================================================================
// Start of ALL calculations for dashboard
// ============================================================================================================

	var applyOnInput = function(event){
	// Global objects: Inputs (possibly calculated values)
		var g = {
			analysisStartDate: $('#Analysis_Start_Date').val(),
			propertyName:	$('#Property_Name').val(),
			propertyLocation: $('#Property_Address').val(),
			propertyType: $('#Property_Type').val(),
			purchasePrice: parseInt($('#Purchase_Price').val()),
			closingCostPercentage: parseInt($('#Closing_Costs_Percentage').val()),
			saleYear: parseInt($('#Sale_Year').val()),
			terminalCapRate: parseInt($('#Terminal_Cap_Rate').val()),
			salesCosts: parseInt($('#Sales_Costs').val()),
			leverage: parseInt($('#Leverage').val()),
			interestRateOnMortgage: parseInt($('#Interest_Rate_on_Mortgage').val()),
			loanTerm: parseInt($('#Loan_Term').val()),
			loanAmortization: parseInt($('#Loan_Amortization').val()),
			unleveredDiscountRate: parseInt($('#UL_Discount_Rate').val()),
			leveredDiscountRate: parseInt($('#L_Discount_Rate').val()),
			otherIncomeTotal: parseInt($('#Other_Income_Total').val()),
			lessVacancy: parseInt($('#Less_Vacancy').val()),
			lessConcessions: parseInt($('#Less_Concessions').val()),
			lessCreditLoss: parseInt($('#Less_Credit_Loss').val()),
			realEstateTaxesTotal: parseInt($('#Real_Estate_Taxes_Total').val()),
			insuranceTotal: parseInt($('#Insurance_Total').val()),
			utlitiesTotal: parseInt($('#Utilities_Total').val()),
			payrollTotal: parseInt($('#Payroll_Total').val()),
			repairsAndMaintenanceTotal: parseInt($('#Repairs_and_Maintenance_Total').val()),
			contractServicesTotal: parseInt($('#Contract_Services_Total').val()),
			turnoverTotal: parseInt($('#Turnover_Total').val()),
			salesAndMarketingTotal: parseInt($('#Sales_and_Marketing_Total').val()),
			administrativeTotal: parseInt($('#Administrative_Total').val()),
			managementPercentage: parseInt($('#Management_Percentage').val()),
			replacementReservesPercentage: parseInt($('#Replacement_Reserves_Percentage').val()),
			// rentalRateAssumptions: NEED TO PLACE OBJECT IN HERE
			// marketRentalAssumptions: NEED TO PLACE OBJECT IN HERE
		};
		console.log(
		"analysisstartdate: ", g.analysisStartDate,
		"g.propertyName: ", g.propertyName,
		"propertyLocation: ", g.propertyLocation,
		"propertyType: ", g.propertyType,
		"purchasePrice: ", g.purchasePrice
		);

	//RENTAL RATE ASSUMPTIONS Table
		// Calculates row data for Rental Rate Assumptions -------------------------------------------
		totalUnits = parseInt($('.total_units', this).val());
		avgSFPerUnit = parseInt($(".avg_sf_per_unit", this).val());
		rentPerUnit = parseInt($(".rent_per_unit", this).val());

		var totalSF = totalUnits*avgSFPerUnit;
		var rentPerSF = rentPerUnit/avgSFPerUnit;

		$('.total_sf', this).text(totalSF);
		$('.rent_per_sf', this).text(rentPerSF);



		// Calculates column sum data for Rental Rate Assumptions -------------------------------------------
		var $tu = $('#Rental_Rate_Assumptions tbody .total_units');
		var $tsf = $('#Rental_Rate_Assumptions tbody .total_sf');
		var $rrow = $('#Rental_Rate_Assumptions tbody .rent_row');

		sumTotalUnits = 0;
		sumTotalSF = 0;
		spListRPU = 0;

		//calculates total value: Total Units
		$tu.each(function(){
			sumTotalUnits += parseInt($(this).val());
		});

		//calculates total value: Total SF
		$tsf.each(function(){
			sumTotalSF += parseInt($(this).text());
		});

		//calculates total value: Rent Per Unit
		$rrow.each(function(){
			numUnits = $(this).find('.total_units').val();
			rentUnits = $(this).find('.rent_per_unit').val();
			spListRPU = spListRPU + (numUnits * rentUnits);
		})

		sumAvgSFPerUnit = sumTotalSF/sumTotalUnits; //calculates total value: Avg SF Per Unit
		spListRPU = spListRPU/sumTotalUnits; 		//calculates total value: Rent Per Unit
		sumRentPerSF = spListRPU/sumAvgSFPerUnit;		//calculates total value: Rent Per SF

		//appends total values to dashboard
		$('#Rental_Rate_Assumptions tfoot .total_units').text(sumTotalUnits);
		$('#Rental_Rate_Assumptions tfoot .total_sf').text(sumTotalSF);
		$('#Rental_Rate_Assumptions tfoot .avg_sf_per_unit').text(sumAvgSFPerUnit);
		$('#Rental_Rate_Assumptions tfoot .rent_per_sf').text(sumRentPerSF);
		$('#Rental_Rate_Assumptions tfoot .rent_per_unit').text(spListRPU);
	//END RENTAL RATE ASSUMPTIONS Table

	}; //end applyOnInput function

	//Runs input function
	// $('#dashboard').on('input', applyOnInput);
	$('#dashboard').on('keyup', applyOnInput);


// ============================================================================================================
//Rental Rate Form Dynamic Table
// ============================================================================================================
	// adds one row to table when the 'add' button is clicked
	$("#rental_rate_form").on('click', function(event) {
		event.preventDefault();
		$('#Rental_Rate_Assumptions').find('tbody')
			.append($("<tr class = 'rent_row'>")
			.append($("<td>").html("<input type='text' name='proj_rents' class='proj_rents' placeholder='Project Rents'></td>"))
			.append($("<td>").html("<input type='number' name='total_units' class='total_units' placeholder='Total Units'></td>"))
			.append($("<td class = 'total_sf'></td>").text("0"))
			.append($("<td>").html("<input type='number' name='avg_sf_per_unit' class='avg_sf_per_unit' placeholder='Avg SF/Unit'></td>"))
			.append($("<td class = 'rent_per_sf'></td>").text("$0.00"))
			.append($("<td>").html("<input type='number' name='rent_per_unit' class='rent_per_unit' placeholder='Rent Per Unit'></td>"))
			.append($('<td>').html("<a>[X]</a></td>"))
			)

		// function to delete all additionally added rows from the Rental Rate Assumptions table
		$('tr[class^="rent_row"] a').on('click', function(event) {
			$(this).parent().parent().remove();
			applyOnInput();
		});
		//Runs input function inside
		$('#dashboard').on('input', applyOnInput);

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
			.append($("<td>").html("<input type='number' name='mktRentRevenue' class='mktRentRevenue' placeholder='Revenue (%)'></td>"))
			.append($("<td>").html("<input type='number' name='mktRentExpenses' class='mktRentExpenses' placeholder='Expenses (%)'></td>"))
			.append($("<td>").html("<input type='number' name='mktRentVacancy' class='mktRentVacancy' placeholder='Vacancy (%)'></td>"))
			.append($("<td>").html("<input type='number' name='mktRentConcessions' class='mktRentConcessions' placeholder='Concessions (%)'></td>"))
			.append($("<td>").html("<input type='number' name='mktRentCreditLoss' class='mktRentCreditLoss' placeholder='Credit Loss (%)'></td>"))
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
