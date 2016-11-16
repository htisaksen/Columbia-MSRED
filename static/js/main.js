'use strict';
// Math.round(num * 100) / 100
$(document).ready(function(){

//created function to run dashboard input twice
	var calculations = function(){
			myApp.dashboard.dashboardInput();
			myApp.dashboard.dashboardInput();
			myApp.proForma();
			myApp.returnsSummary(); //----HEAVILY WIP
			myApp.utils.nanReplace();

	};


	// myApp.htmlGen.RRAsample();		//TESTING PURPOSES

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
			.append($("<td>").html("<input type='text' id='proj_rents"+rrCounter+"' name='proj_rents"+rrCounter+"' class='proj_rents' placeholder='Proj. Rents'></td>"))
			.append($("<td>").html("<input type='number' id='total_units"+rrCounter+"' name='total_units"+rrCounter+"' class='total_units' placeholder='Total Units'></td>"))
			.append($("<td class = 'total_sf'></td>").text("0"))
			.append($("<td>").html("<input type='number' id='avg_sf_per_unit"+rrCounter+"' name='avg_sf_per_unit"+rrCounter+"' class='avg_sf_per_unit' placeholder='Avg SF/Unit'></td>"))
			.append($("<td class = 'rent_per_sf'></td>").text("$0.00"))
			.append($("<td>").html("<input type='number' id='rent_per_unit"+rrCounter+"' name='rent_per_unit"+rrCounter+"' class='rent_per_unit' placeholder='Rent/Unit'></td>"))
			.append($('<td>').html("<a>[X]</a></td>"))
			)

	// function to delete all additionally added rows from the Rental Rate Assumptions table
		$('tr[class^="rent_row"] a').on('click', function(event) {
			$(this).parent().parent().remove();
			myApp.rra.RRAInput();
			myApp.dashboard.dashboardInput();
		});
	//Runs input function inside
		$('.rent_row').on('focusout', myApp.rra.RRAInput);
		$('#dashboard').on('focusout', calculations);

	}); //end addrow function




// ============================================================================================================
//MARKET RENTAL ASSUMPTIONS Dynamic Table
// ============================================================================================================
	// adds one row to table when the 'add' button is clicked
	$('#Sale_Year').on('input', function(event){
		var saleYear = parseInt($('#Sale_Year').val());
		for(var i=0;i<saleYear;++i){
		//Inserts number of rows based on Sale Year in Dashboard
			var mraCounter = $('#Market_Rental_Assumptions tbody tr').length+1;
			while(saleYear < mraCounter){
				$('#Market_Rental_Assumptions tbody tr').last().remove();
				mraCounter = $('#Market_Rental_Assumptions tbody tr').length+1;
			};
			$('#Market_Rental_Assumptions').find('tbody')
				.append($("<tr class = 'year_row' id='year_row_"+mraCounter+"'>")
				.append($("<td class='mkt_rent_year'>Year "+mraCounter+"</td>"))
				.append($("<td>").html("<input type='number'id='mkt_rent_revenue"+mraCounter+"' name='mkt_rent_revenue"+mraCounter+"' class='mkt_rent_revenue' placeholder='Revenue (%)'></td>"))
				.append($("<td>").html("<input type='number'id='mkt_rent_expenses"+mraCounter+"' name='mkt_rent_expenses"+mraCounter+"' class='mkt_rent_expenses' placeholder='Expenses (%)'></td>"))
				.append($("<td>").html("<input type='number'id='mkt_rent_vacancy"+mraCounter+"' name='mkt_rent_vacancy"+mraCounter+"' class='mkt_rent_vacancy' placeholder='Vacancy (%)'></td>"))
				.append($("<td>").html("<input type='number'id='mkt_rent_concessions"+mraCounter+"' name='mkt_rent_concessions"+mraCounter+"' class='mkt_rent_concessions' placeholder='Concessions (%)'></td>"))
				.append($("<td>").html("<input type='number'id='mkt_rent_credit_loss"+mraCounter+"' name='mkt_rent_credit_loss"+mraCounter+"' class='mkt_rent_credit_loss' placeholder='Credit Loss (%)'></td>"))
				)
		};
	}); //end addrow function


// ============================================================================================================
//SAVE to DB
// ============================================================================================================
	//click on "Save Model" button
	$('#update_save #save_input').on('click',function(event){
		console.log("Clicked on 'Save Model' or 'Update Model' button...")
		var rentalRateLength = $('#Rental_Rate_Assumptions tbody tr').length; //Repeated - Need to create seperate function
		var marketRentalLength = $('#Market_Rental_Assumptions tbody tr').length; // Repeated - Need to create seperate function
		var rentalRateList = [];
		var marketRentalList = [];
		for(var i=1;i<=rentalRateLength;++i){
			var rentalRateObj = []
			rentalRateObj = [
				i,
				$('#proj_rents'+i).val(),
				$('#total_units'+i).val(),
				$('#avg_sf_per_unit'+i).val(),
				$('#rent_per_unit'+i).val(),
			];
			console.log("rentalRateObj:",rentalRateObj)
			rentalRateList.push(rentalRateObj)
		};
		for(var i=1;i<=marketRentalLength;++i){
			var marketRentalObj = []
			marketRentalObj = [
				i,
				$('#mkt_rent_revenue'+i).val(),
				$('#mkt_rent_expenses'+i).val(),
				$('#mkt_rent_vacancy'+i).val(),
				$('#mkt_rent_concessions'+i).val(),
				$('#mkt_rent_credit_loss'+i).val(),
			];
			console.log("marketRentalObj:",marketRentalObj)
			marketRentalList.push(marketRentalObj)
		};

		$('#rental_rate_assumptions').val(rentalRateList);
		$('#market_rental_assumptions').val(marketRentalList);
		console.log("rental_rate_assumptions:",$('#rental_rate_assumptions').val())
		console.log("market_rental_assumptions:",$('#market_rental_assumptions').val())

		$('#save_name').val('Test Text');

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

// ============================================================================================================
	$('.rent_row').on('focusout', myApp.rra.RRAInput);
	$('#dashboard').on('focusout', calculations);





}); //end of doc
