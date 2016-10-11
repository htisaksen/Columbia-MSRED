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


	myApp.htmlGen.RRAsample();		//TESTING PURPOSES
	
	// myApp.htmlGen.rentalRateAssumptions(); 		//Javascript Rental Rate Assumptions first insert row -----------------------
	myApp.htmlGen.marketRentalAssumptions(); 	//Javascript Market Rental Rate Assumptions first insert row -------------------
	myApp.htmlGen.proForma(); 					//Javascript Market Rental Rate Assumptions two columns -------------------

// ============================================================================================================
// Start of ALL calculations for dashboard
// ============================================================================================================
	myApp.rra.RRAInput(); //RENTAL RATE ASSUMPTIONS Table calculations
	myApp.mra.MRAInput(); //MARKET RENTAL ASSUMPTIONS Table calculations



// ============================================================================================================
//Rental Rate Form Dynamic Table
// ============================================================================================================
	// adds one row to table when the 'add' button is clicked
	$("#rental_rate_form").on('click', function(event) {
		event.preventDefault();
		var rrCounter = $('#Rental_Rate_Assumptions tbody tr').length+1;
		$('#Rental_Rate_Assumptions').find('tbody')
			.append($("<tr class = 'rent_row'>")
			.append($("<td>").html("<input type='text' name='proj_rents"+rrCounter+"' class='proj_rents' placeholder='Proj. Rents'></td>"))
			.append($("<td>").html("<input type='number' name='total_units"+rrCounter+"' class='total_units' placeholder='Total Units'></td>"))
			.append($("<td class = 'total_sf'></td>").text("0"))
			.append($("<td>").html("<input type='number' name='avg_sf_per_unit"+rrCounter+"' class='avg_sf_per_unit' placeholder='Avg SF/Unit'></td>"))
			.append($("<td class = 'rent_per_sf'></td>").text("$0.00"))
			.append($("<td>").html("<input type='number' name='rent_per_unit"+rrCounter+"' class='rent_per_unit' placeholder='Rent/Unit'></td>"))
			.append($('<td>').html("<a>[X]</a></td>"))
			)

	// function to delete all additionally added rows from the Rental Rate Assumptions table
		$('tr[class^="rent_row"] a').on('click', function(event) {
			$(this).parent().parent().remove();
			RRAInput();
			myApp.dashboard.dashboardInput();
		});
	//Runs input function inside
		$('.rent_row').on('input', myApp.rra.RRAInput);
		$('#dashboard').on('input', calculations);

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
				.append($("<td>").html("<input type='number' name='mkt_rent_revenue"+mraCounter+"' class='mkt_rent_revenue' placeholder='Revenue (%)'></td>"))
				.append($("<td>").html("<input type='number' name='mkt_rent_expenses"+mraCounter+"' class='mkt_rent_expenses' placeholder='Expenses (%)'></td>"))
				.append($("<td>").html("<input type='number' name='mkt_rent_vacancy"+mraCounter+"' class='mkt_rent_vacancy' placeholder='Vacancy (%)'></td>"))
				.append($("<td>").html("<input type='number' name='mkt_rent_concessions"+mraCounter+"' class='mkt_rent_concessions' placeholder='Concessions (%)'></td>"))
				.append($("<td>").html("<input type='number' name='mkt_rent_credit_loss"+mraCounter+"' class='mkt_rent_credit_loss' placeholder='Credit Loss (%)'></td>"))
				)
		};
	}); //end addrow function


// ============================================================================================================
//SAVE to DB
// ============================================================================================================
	$('#modal_save').on('click',function(event) {
    event.preventDefault();
    var data = $('#dashboard').serialize();
		services.saveDashboard(data);
 	});

// ============================================================================================================
	$('.rent_row').on('input', myApp.rra.RRAInput);
	$('#dashboard').on('input', calculations);





}); //end of doc
