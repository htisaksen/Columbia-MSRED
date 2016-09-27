'use strict';
// Math.round(num * 100) / 100
$(document).ready(function(){

	var onInput = function(){
			myApp.dashboard.DashboardInput();
			myApp.dashboard.DashboardInput();
	};
//TESTING PURPOSES @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

	$('#Rental_Rate_Assumptions').find('tbody')
		.append($("<tr class = 'rent_row'>")
		.append($("<td>").html("<input type='text' name='proj_rents' class='proj_rents' placeholder='Project Rents' value='1 Bed/1 Bath'></td>"))
		.append($("<td>").html("<input type='number' name='total_units' class='total_units' placeholder='Total Units' value='50'></td>"))
		.append($("<td class = 'total_sf'></td>").text("0"))
		.append($("<td>").html("<input type='number' name='avg_sf_per_unit' class='avg_sf_per_unit' placeholder='Avg SF Per Unit' value='662'></td>"))
		.append($("<td class = 'rent_per_sf'></td>").text("$0.00"))
		.append($("<td>").html("<input type='number' name='rent_per_unit' class='rent_per_unit' placeholder='Rent Per Unit' value='1100'></td>"))
		)
	$('#Rental_Rate_Assumptions').find('tbody')
		.append($("<tr class = 'rent_row'>")
		.append($("<td>").html("<input type='text' name='proj_rents' class='proj_rents' placeholder='Project Rents' value='2 Bed/1 Bath'></td>"))
		.append($("<td>").html("<input type='number' name='total_units' class='total_units' placeholder='Total Units' value='75'></td>"))
		.append($("<td class = 'total_sf'></td>").text("0"))
		.append($("<td>").html("<input type='number' name='avg_sf_per_unit' class='avg_sf_per_unit' placeholder='Avg SF Per Unit' value='1041'></td>"))
		.append($("<td class = 'rent_per_sf'></td>").text("$0.00"))
		.append($("<td>").html("<input type='number' name='rent_per_unit' class='rent_per_unit' placeholder='Rent Per Unit' value='1400'></td>"))
		)
	$('#Rental_Rate_Assumptions').find('tbody')
		.append($("<tr class = 'rent_row'>")
		.append($("<td>").html("<input type='text' name='proj_rents' class='proj_rents' placeholder='Project Rents' value='2 Bed/2 Bath'></td>"))
		.append($("<td>").html("<input type='number' name='total_units' class='total_units' placeholder='Total Units' value='75'></td>"))
		.append($("<td class = 'total_sf'></td>").text("0"))
		.append($("<td>").html("<input type='number' name='avg_sf_per_unit' class='avg_sf_per_unit' placeholder='Avg SF Per Unit' value='1185'></td>"))
		.append($("<td class = 'rent_per_sf'></td>").text("$0.00"))
		.append($("<td>").html("<input type='number' name='rent_per_unit' class='rent_per_unit' placeholder='Rent Per Unit' value='1800'></td>"))
		)
//END TESTING PURPOSES @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@




// //Javascript Rental Rate Assumptions first insert row -------------------------------------------
// 	$('#Rental_Rate_Assumptions').find('tbody')
// 		.append($("<tr class = 'rent_row'>")
// 		.append($("<td>").html("<input type='text' name='proj_rents' class='proj_rents' placeholder='Project Rents'></td>"))
// 		.append($("<td>").html("<input type='number' name='total_units' class='total_units' placeholder='Total Units'></td>"))
// 		.append($("<td class = 'total_sf'></td>").text("0"))
// 		.append($("<td>").html("<input type='number' name='avg_sf_per_unit' class='avg_sf_per_unit' placeholder='Avg SF Per Unit'></td>"))
// 		.append($("<td class = 'rent_per_sf'></td>").text("$0.00"))
// 		.append($("<td>").html("<input type='number' name='rent_per_unit' class='rent_per_unit' placeholder='Rent Per Unit'></td>"))
// 		)
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

	var RRAlist = []; //Rental Rate Assumptions list
	var MRAlist = []; //Market Rental Assumptions list


//RENTAL RATE ASSUMPTIONS Table calculations=======================================================================
	var RRAInput = function(event){
		var remSpcChr = myApp.utils.remSpcChr;
		var pInt = myApp.utils.pInt;
		var pFloat = myApp.utils.pFloat;
		var nanCheck = myApp.utils.nanCheck
		var roundOneDec = myApp.utils.roundOneDec
		var roundTwoDec = myApp.utils.roundTwoDec
		var FormatCurrency = myApp.utils.FormatCurrency
		var FormatPercent = myApp.utils.FormatPercent
		// Calculates row data for Rental Rate Assumptions -------------------------------------------
		var totalUnits = parseInt($('.total_units', this).val());
		var avgSFPerUnit = parseInt($(".avg_sf_per_unit", this).val());
		var rentPerUnit = parseInt($(".rent_per_unit", this).val());
		// console.log(totalUnits,avgSFPerUnit,rentPerUnit)

		var totalSF = totalUnits*avgSFPerUnit;
		var rentPerSF = rentPerUnit/avgSFPerUnit;
		$('.total_sf', this).text(nanCheck(totalSF).toLocaleString());
		$('.rent_per_sf', this).text(FormatCurrency(nanCheck(rentPerSF)));



		// Calculates column sum data for Rental Rate Assumptions -------------------------------------------
		var $tu = $('#Rental_Rate_Assumptions tbody .total_units');
		var $tsf = $('#Rental_Rate_Assumptions tbody .total_sf');
		var $rrow = $('#Rental_Rate_Assumptions tbody .rent_row');

		var sumTotalUnits = 0;
		var sumTotalSF = 0;
		var spListRPU = 0;

		//calculates total value: Total Units
		$tu.each(function(){
			sumTotalUnits = sumTotalUnits + parseInt(remSpcChr($(this).val()));
		});

		//calculates total value: Total SF
		$tsf.each(function(){
			sumTotalSF = sumTotalSF + parseInt(remSpcChr($(this).text()));
		});

		//calculates total value: Rent Per Unit
		$rrow.each(function(){
			var numUnits = $(this).find('.total_units').val();
			var rentUnits = $(this).find('.rent_per_unit').val();
			spListRPU = spListRPU + (numUnits * rentUnits);
		});

		//creates an array of arrays for all the Projected Rent rows and stores the array in the global "g" object
		$rrow.each(function(){
			var tempProjectRents = $(this).find('.proj_rents').val();
			var tempNumUnits = $(this).find('.total_units').val();
			var tempAvgSFPerUnit = $(this).find('.avg_sf_per_unit').val();
			var tempRentUnits = $(this).find('.rent_per_unit').val();
			var rraObjTemp = {tempProjectRents: tempProjectRents,
							 tempNumUnits: tempNumUnits,
							 tempAvgSFPerUnit: tempAvgSFPerUnit,
							 tempRentUnits: tempRentUnits
						 	};
			// var RRAlistTemp = new Array(tempProjectRents, tempNumUnits, tempAvgSFPerUnit, tempRentUnits);
			RRAlist.push(rraObjTemp);
		});

		var sumAvgSFPerUnit = sumTotalSF/sumTotalUnits; 	//calculates total value: Avg SF Per Unit
		spListRPU = spListRPU/sumTotalUnits; 				//calculates total value: Rent Per Unit
		var sumRentPerSF = spListRPU/sumAvgSFPerUnit;		//calculates total value: Rent Per SF

		//appends total values to dashboard

		$('#Rental_Rate_Assumptions tfoot .total_units').text(nanCheck(sumTotalUnits).toLocaleString());
		$('#Rental_Rate_Assumptions tfoot .total_sf').text(nanCheck(sumTotalSF).toLocaleString());
		$('#Rental_Rate_Assumptions tfoot .avg_sf_per_unit').text(Math.round(nanCheck(sumAvgSFPerUnit)).toLocaleString());
		$('#Rental_Rate_Assumptions tfoot .rent_per_sf').text(FormatCurrency(nanCheck(sumRentPerSF)));
		$('#Rental_Rate_Assumptions tfoot .rent_per_unit').text(FormatCurrency(nanCheck(spListRPU)));

		$("td:contains('NaN')").each(function() {
			$(this).text('0');
		});

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
			// ("MRALIST: ",MRAlist);
		});

	};
//END OF MARKET RENTAL ASSUMPTIONS Table calculations=======================================================================



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
			RRAInput();
				myApp.dashboard.DashboardInput();
		});
	//Runs input function inside

		$('.rent_row').on('input', RRAInput);
		$('#dashboard').on('input', onInput);


	}) //end addrow function




// ============================================================================================================
//MARKET RENTAL ASSUMPTIONS Dynamic Table
// ============================================================================================================
	// adds one row to table when the 'add' button is clicked
	$('#Loan_Term').on('keyup', function(event){
		var loanTerm = parseInt($('#Loan_Term').val());
		for(var i=0;i<loanTerm;++i){
			var mraCounter = $('#Market_Rental_Assumptions tbody tr').length+1;
			while(loanTerm+1 < mraCounter){
				$('#Market_Rental_Assumptions tbody tr').last().remove();
				mraCounter = $('#Market_Rental_Assumptions tbody tr').length+1;
			};
			$('#Market_Rental_Assumptions').find('tbody')
				.append($("<tr class = 'year_row' id='year_row_"+mraCounter+"'>")
				.append($("<td class='mkt_rent_year'>Year "+mraCounter+"</td>"))
				.append($("<td></td>"))
				.append($("<td>").html("<input type='number' name='mkt_rent_revenue' class='mkt_rent_revenue' placeholder='Revenue (%)'></td>"))
				.append($("<td>").html("<input type='number' name='mkt_rent_expenses' class='mkt_rent_expenses' placeholder='Expenses (%)'></td>"))
				.append($("<td>").html("<input type='number' name='mkt_rent_vacancy' class='mkt_rent_vacancy' placeholder='Vacancy (%)'></td>"))
				.append($("<td>").html("<input type='number' name='mkt_rent_concessions' class='mkt_rent_concessions' placeholder='Concessions (%)'></td>"))
				.append($("<td>").html("<input type='number' name='mkt_rent_credit_loss' class='mkt_rent_credit_loss' placeholder='Credit Loss (%)'></td>"))
				)
		};
	});



// ============================================================================================================
// $('.rent_row').on('input', debouncer(RRAInput,500));
	$('.rent_row').on('input', RRAInput);

	$('#dashboard td').on('input', function(){
		myApp.dashboard.DashboardInput();
		myApp.dashboard.DashboardInput();
	});





}); //end of doc
