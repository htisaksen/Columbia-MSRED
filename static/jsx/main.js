$(document).ready(function(){

	var RRAlist = []; //Rental Rate Assumptions list
	var MRAlist = []; //Market Rental Assumptions list


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
		.append($("<tr class = 'year_row' id='year_row_1'>")
		.append($("<td>Year 1</td>"))
		.append($("<td></td>"))
		.append($("<td>").html("<input type='number' name='mkt_rent_revenue' class='mkt_rent_revenue' placeholder='Revenue (%)'></td>"))
		.append($("<td>").html("<input type='number' name='mkt_rent_expenses' class='mkt_rent_expenses' placeholder='Expenses (%)'></td>"))
		.append($("<td>").html("<input type='number' name='mkt_rent_vacancy' class='mkt_rent_vacancy' placeholder='Vacancy (%)'></td>"))
		.append($("<td>").html("<input type='number' name='mkt_rent_concessions' class='mkt_rent_concessions' placeholder='Concessions (%)'></td>"))
		.append($("<td>").html("<input type='number' name='mkt_rent_credit_loss' class='mkt_rent_credit_loss' placeholder='Credit Loss (%)'></td>"))
		)






// ============================================================================================================
// Start of ALL calculations for dashboard
// ============================================================================================================

	var DashboardInput = function(event){
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
		};

		var RrTotalUnits = $('#Rental_Rate_Assumptions tfoot .total_units').text()
		console.log("sup: ",RrTotalUnits)
		$('#prop_info_total_num_units').text(RrTotalUnits);
		$('#prop_info_total_sq_ft').text($('#Rental_Rate_Assumptions tfoot .total_sf').text());


	}; //end DashboardInput










//RENTAL RATE ASSUMPTIONS Table calculations=======================================================================
	var RRAInput = function(event){
		// Calculates row data for Rental Rate Assumptions -------------------------------------------
		totalUnits = parseInt($('.total_units', this).val());
		avgSFPerUnit = parseInt($(".avg_sf_per_unit", this).val());
		rentPerUnit = parseInt($(".rent_per_unit", this).val());
		console.log(totalUnits,avgSFPerUnit,rentPerUnit)

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
		});

		//creates an array of arrays for all the Projected Rent rows and stores the array in the global "g" object
		$rrow.each(function(){
			tempProjectRents = $(this).find('.proj_rents').val();
			tempNumUnits = $(this).find('.total_units').val();
			tempAvgSFPerUnit = $(this).find('.avg_sf_per_unit').val();
			tempRentUnits = $(this).find('.rent_per_unit').val();
			var rraObjTemp = {tempProjectRents: tempProjectRents,
							 tempNumUnits: tempNumUnits,
							 tempAvgSFPerUnit: tempAvgSFPerUnit,
							 tempRentUnits: tempRentUnits
						 	};
			// var RRAlistTemp = new Array(tempProjectRents, tempNumUnits, tempAvgSFPerUnit, tempRentUnits);
			RRAlist.push(rraObjTemp);
			console.log("RRA LIST: ",RRAlist);
		});

		sumAvgSFPerUnit = sumTotalSF/sumTotalUnits; //calculates total value: Avg SF Per Unit
		spListRPU = spListRPU/sumTotalUnits; 		//calculates total value: Rent Per Unit
		sumRentPerSF = spListRPU/sumAvgSFPerUnit;		//calculates total value: Rent Per SF

		//appends total values to dashboard
		$('#Rental_Rate_Assumptions tfoot .total_units').text(sumTotalUnits);
		$('#Rental_Rate_Assumptions tfoot .total_sf').text(sumTotalSF);
		$('#Rental_Rate_Assumptions tfoot .avg_sf_per_unit').text(sumAvgSFPerUnit);
		$('#Rental_Rate_Assumptions tfoot .rent_per_sf').text(sumRentPerSF);
		$('#Rental_Rate_Assumptions tfoot .rent_per_unit').text(spListRPU);
	};
//END RENTAL RATE ASSUMPTIONS Table calculations=======================================================================



//MARKET RENTAL ASSUMPTIONS Table calculations=======================================================================
	var MRAInput = function(event){
		//creates an array of arrays for all the Market Rent Assumption rows and stores the array in the global "g" object
		var $mraRow = $('#Market_Rental_Assumptions tbody .year_row');
		$rrow.each(function(){
			tempMktRentRevenue = $(this).find('.mkt_rent_revenue').val();
			tempMktRentExpenses = $(this).find('.mkt_rent_expenses').val();
			tempMktRentVacancy = $(this).find('.mkt_rent_vacancy').val();
			tempMktRentConcessions = $(this).find('.mkt_rent_concessions').val();
			tempMktRentCreditLoss = $(this).find('.mkt_rent_credit_loss').val();
			var mraObjTemp = {tempMktRentRevenue,
							 tempMktRentExpenses,
							 tempMktRentVacancy,
							 tempMktRentConcessions,
							 tempMktRentCreditLoss};
			MRAlist.push(mraObjTemp);
			console.log("MRALIST: ",MRAlist);
		});

	};
//END OF MARKET RENTAL ASSUMPTIONS Table calculations=======================================================================














// ============================================================================================================
//Rental Rate Form Dynamic Table
// ============================================================================================================
	$('.rent_row').on('input', RRAInput);
	$('#dashboard').on('input', DashboardInput);


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
			RRAInput();
			DashboardInput();
		});
		//Runs input function inside
		$('.rent_row').on('input', RRAInput);
		$('#dashboard').on('input', DashboardInput);


	}) //end addrow function




// ============================================================================================================
//MARKET RENTAL ASSUMPTIONS Dynamic Table
// ============================================================================================================
	// adds one row to table when the 'add' button is clicked

	$("#market_rental_form").on('click', function(event) {
		var mraCounter = $('#Market_Rental_Assumptions tbody tr').length+1;
		event.preventDefault();
		$('#Market_Rental_Assumptions').find('tbody')
			.append($("<tr class = 'year_row' id='year_row_"+mraCounter+"'>")
			.append($("<td class='mkt_rent_year'>Year "+mraCounter+"</td>"))
			.append($("<td></td>"))
			.append($("<td>").html("<input type='number' name='mkt_rent_revenue' class='mkt_rent_revenue' placeholder='Revenue (%)'></td>"))
			.append($("<td>").html("<input type='number' name='mkt_rent_expenses' class='mkt_rent_expenses' placeholder='Expenses (%)'></td>"))
			.append($("<td>").html("<input type='number' name='mkt_rent_vacancy' class='mkt_rent_vacancy' placeholder='Vacancy (%)'></td>"))
			.append($("<td>").html("<input type='number' name='mkt_rent_concessions' class='mkt_rent_concessions' placeholder='Concessions (%)'></td>"))
			.append($("<td>").html("<input type='number' name='mkt_rent_credit_loss' class='mkt_rent_credit_loss' placeholder='Credit Loss (%)'></td>"))
			.append($('<td>').html("<a>[X]</a></td>"))
			)
		MRAInput();

		// function to delete all additionally added rows
		$('tr[class^="year_row"] a').on('click', function(event) {
			$(this).parent().parent().remove();
			var $mraRow = $('#Market_Rental_Assumptions tbody .year_row');
			mraCounterTemp = 1;

		// reorders year text and year_row_id sequentially on deletion of row
			$mraRow.each(function(){
				$(this).find('.mkt_rent_year').text("Year "+mraCounterTemp);
				$(this).attr('id',"year_row_"+mraCounterTemp);
				mraCounterTemp += 1;
			});

		});
		//Runs input function inside
		$('#dashboard').on('input', DashboardInput);
		$('.rent_row').on('input', DashboardInput);
		// $('.year_row').on('input', DashboardInput);

	}); //end addrow function

















// ============================================================================================================
}); //end of doc
