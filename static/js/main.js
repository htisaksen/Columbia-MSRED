'use strict';

$(document).ready(function(){

//prevents user from saving model by pushing the Enter key on keyboard
	$(window).keydown(function(event){
		if(event.keyCode == 13) {
			event.preventDefault();
			return false;
		}
 	});


//created function to run dashboard input twice

	var calculations = function(){
			myApp.dashboard.dashboardInput();
			myApp.dashboard.dashboardInput();
			myApp.proForma();
			myApp.returnsSummary();
			myApp.utils.nanReplace();
	};
	var proformaReturnSummaryCalc = function(){
		myApp.proForma();
		myApp.returnsSummary();
	};
	var debounceCalculations = myApp.utils.debounce(function(){
		calculations()
	}, 1000);

	var debounceRRACalculations = myApp.utils.debounce(function(){
		myApp.rra.RRAInput();
	},1000)

//functions that insert initial rows/columns of data
	myApp.htmlGen.rentalRateAssumptions(); 		//Javascript Rental Rate Assumptions first insert row -----------------------
	myApp.htmlGen.marketRentalAssumptions(); 	//Javascript Market Rental Rate Assumptions first insert row -------------------
	myApp.htmlGen.proForma(); 					//Javascript Market Rental Rate Assumptions two columns -------------------

// ============================================================================================================
// Start of ALL calculations for dashboard
// ============================================================================================================
	myApp.rra.RRAInput(); //RENTAL RATE ASSUMPTIONS Table calculations
	myApp.mra.MRAInput(); //MARKET RENTAL ASSUMPTIONS Table calculations



// ============================================================================================================
//RENTAL RATE ASSUMPTIONS Dynamic Table
// ============================================================================================================
	// adds one row to table when the 'add' button is clicked
	$("#rental_rate_form").on('click', function(event) {
		event.preventDefault();
		var rrCounter = $('#Rental_Rate_Assumptions tbody tr').length+1;
		$('#Rental_Rate_Assumptions').find('tbody')
			.append($("<tr class = 'rent_row'>")
			.append($("<td>").html("<input class='proj_rents' type='text' id='proj_rents"+rrCounter+"' name='proj_rents"+rrCounter+"' placeholder='Unit Type'></td>"))
			.append($("<td>").html("<input class = 'total_units inputright' type='number' id='total_units"+rrCounter+"' name='total_units"+rrCounter+"' placeholder='Total Units'></td>"))
			.append($("<td class = 'total_sf'></td>").text("0"))
			.append($("<td>").html("<input class = 'avg_sf_per_unit inputright' type='number' id='avg_sf_per_unit"+rrCounter+"' name='avg_sf_per_unit"+rrCounter+"' placeholder='Avg SF/Unit'></td>"))
			.append($("<td class = 'rent_per_sf'></td>").text("$0.00"))
			.append($("<td>").html("<input class = 'rent_per_unit inputright' type='number' id='rent_per_unit"+rrCounter+"' name='rent_per_unit"+rrCounter+"' placeholder='Rent/Unit'></td>"))
			.append($('<td>').html("<a>[X]</a></td>"))
			);

		// function to delete all additionally added rows from the Rental Rate Assumptions table
		$('tr[class^="rent_row"] a').on('click', function(event) {
			$(this).parent().parent().remove();
			myApp.rra.RRAInput();
			myApp.dashboard.dashboardInput();
		});

		//Runs input function inside on focusout
		$('.rent_row').on('focusout', myApp.rra.RRAInput);

		//Runs input function inside on input
		$('#dashboard').on('input', debounceCalculations);

	}); //end addrow function


	// function to delete all additionally added rows from the Rental Rate Assumptions table
	$('tr[class^="rent_row"] a').on('click', function(event) {
		$(this).parent().parent().remove();
		myApp.rra.RRAInput();
		myApp.dashboard.dashboardInput();
	});


// ============================================================================================================
//MARKET RENTAL ASSUMPTIONS Dynamic Table
// ============================================================================================================
	$('#Sale_Year').on('input', function(event){
		var saleYear = parseInt($('#Sale_Year').val());
		for(var i=0;i<saleYear;++i){
		//Inserts number of rows based on Sale Year in Dashboard - if Sale Year # is updated, the row count is also updated
			var mraCounter = $('#Market_Rental_Assumptions tbody tr').length;
			while(saleYear < mraCounter){
				$('#Market_Rental_Assumptions tbody tr').last().remove();
				mraCounter = $('#Market_Rental_Assumptions tbody tr').length;
			};
			if (saleYear !== mraCounter) {
				mraCounter += 1;
				$('#Market_Rental_Assumptions').find('tbody')
					.append($("<tr class = 'year_row' id='year_row_"+mraCounter+"'>")
					.append($("<td class= 'inputleft mkt_rent_year'>Year "+mraCounter+"</td>"))
					.append($("<td>").html("<input class = 'inputcenter mkt_rent_revenue' type='number' id='mkt_rent_revenue"+mraCounter+"' name='mkt_rent_revenue"+mraCounter+"' placeholder='(%)'></td>"))
					.append($("<td>").html("<input class = 'inputcenter mkt_rent_expenses' type='number' id='mkt_rent_expenses"+mraCounter+"' name='mkt_rent_expenses"+mraCounter+"' placeholder='(%)'></td>"))
					.append($("<td>").html("<input class = 'inputcenter mkt_rent_vacancy' type='number' id='mkt_rent_vacancy"+mraCounter+"' name='mkt_rent_vacancy"+mraCounter+"' placeholder='(%)'></td>"))
					.append($("<td>").html("<input class = 'inputcenter mkt_rent_concessions' type='number' id='mkt_rent_concessions"+mraCounter+"' name='mkt_rent_concessions"+mraCounter+"' placeholder='(%)'></td>"))
					.append($("<td>").html("<input class = 'inputcenter mkt_rent_credit_loss' type='number' id='mkt_rent_credit_loss"+mraCounter+"' name='mkt_rent_credit_loss"+mraCounter+"' placeholder='(%)'></td>"))
					)
				}; //end if
		}; //end for
	}); //end func


// ============================================================================================================
//SAVE to DB
// ============================================================================================================
	//click on "Save Model" button
	$('#save_input, #update_save').on('click',function(event){
		var rentalRateLength = $('#Rental_Rate_Assumptions tbody tr').length; //Repeated - Need to create seperate function
		var marketRentalLength = $('#Market_Rental_Assumptions tbody tr').length; // Repeated - Need to create seperate function
		var rentalRateList = [];
		var marketRentalList = [];
		for(var i=1;i<=rentalRateLength;++i){
			var rentalRateObj = [
				i,
				$('#proj_rents'+i).val(),
				$('#total_units'+i).val(),
				$('#avg_sf_per_unit'+i).val(),
				$('#rent_per_unit'+i).val(),
			];
			rentalRateList.push(rentalRateObj)
		};
		for(var i=1;i<=marketRentalLength;++i){
			var marketRentalObj = [
				i,
				$('#mkt_rent_revenue'+i).val(),
				$('#mkt_rent_expenses'+i).val(),
				$('#mkt_rent_vacancy'+i).val(),
				$('#mkt_rent_concessions'+i).val(),
				$('#mkt_rent_credit_loss'+i).val(),
			];
			marketRentalList.push(marketRentalObj)
		};

		$('#rental_rate_assumptions').val(rentalRateList);
		$('#market_rental_assumptions').val(marketRentalList);

	});


	//click on "Save" button after entering Model/Save Name in modal text box
	$('#modal_save').on('click',function(event) {
    event.preventDefault();
    var data = $('#dashboard').serialize();
	services.saveDashboard(data);	//AJAX call - ajax.js
 	});

	//click on "Update" button
	$('#update_save').on('click',function(event) {
    event.preventDefault();
    var data = $('#dashboard').serialize();
	services.updateDashboard(data);	//AJAX call - ajax.js
 	});


// Runs calcs on page load ====================================================================================
	setTimeout(function(){
		calculations();
		myApp.returnsSummary();
		myApp.utils.nanReplace();
	}, 0);
	myApp.rra.OnLoad();
	calculations();

	// Runs calcs on focusout============================================================================================================
	$('.rent_row').on('focusout', myApp.rra.RRAInput);

	//Runs calc on input
	$('#dashboard').on('input', debounceCalculations);

}); //end of doc
