myApp.htmlGen = {};

//TESTING PURPOSES @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
(function(){
  myApp.htmlGen.test = function(){
  	$('#Rental_Rate_Assumptions').find('tbody')
  		.append($("<tr class = 'rent_row'>")
  		.append($("<td>").html("<input type='text' name='proj_rents1' class='proj_rents' placeholder='Project Rents' value='1 Bed/1 Bath'></td>"))
  		.append($("<td>").html("<input type='number' name='total_units1' class='total_units' placeholder='Total Units' value='50'></td>"))
  		.append($("<td class = 'total_sf'></td>").text("0"))
  		.append($("<td>").html("<input type='number' name='avg_sf_per_unit1' class='avg_sf_per_unit' placeholder='Avg SF Per Unit' value='662'></td>"))
  		.append($("<td class = 'rent_per_sf'></td>").text("$0.00"))
  		.append($("<td>").html("<input type='number' name='rent_per_unit1' class='rent_per_unit' placeholder='Rent Per Unit' value='1100'></td>"))
  		)
  	$('#Rental_Rate_Assumptions').find('tbody')
  		.append($("<tr class = 'rent_row'>")
  		.append($("<td>").html("<input type='text' name='proj_rents2' class='proj_rents' placeholder='Project Rents' value='2 Bed/1 Bath'></td>"))
  		.append($("<td>").html("<input type='number' name='total_units2' class='total_units' placeholder='Total Units' value='75'></td>"))
  		.append($("<td class = 'total_sf'></td>").text("0"))
  		.append($("<td>").html("<input type='number' name='avg_sf_per_unit2' class='avg_sf_per_unit' placeholder='Avg SF Per Unit' value='1041'></td>"))
  		.append($("<td class = 'rent_per_sf'></td>").text("$0.00"))
  		.append($("<td>").html("<input type='number' name='rent_per_unit2' class='rent_per_unit' placeholder='Rent Per Unit' value='1400'></td>"))
  		)
  	$('#Rental_Rate_Assumptions').find('tbody')
  		.append($("<tr class = 'rent_row'>")
  		.append($("<td>").html("<input type='text' name='proj_rents3' class='proj_rents' placeholder='Project Rents' value='2 Bed/2 Bath'></td>"))
  		.append($("<td>").html("<input type='number' name='total_units3' class='total_units' placeholder='Total Units' value='75'></td>"))
  		.append($("<td class = 'total_sf'></td>").text("0"))
  		.append($("<td>").html("<input type='number' name='avg_sf_per_unit3' class='avg_sf_per_unit' placeholder='Avg SF Per Unit' value='1185'></td>"))
  		.append($("<td class = 'rent_per_sf'></td>").text("$0.00"))
  		.append($("<td>").html("<input type='number' name='rent_per_unit3' class='rent_per_unit' placeholder='Rent Per Unit' value='1800'></td>"))
  		)
  };
//END TESTING PURPOSES @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@




//Javascript Rental Rate Assumptions first insert row -------------------------------------------
  myApp.htmlGen.rentalRateAssumptions = function(){
	$('#Rental_Rate_Assumptions').find('tbody')
		.append($("<tr class = 'rent_row'>")
		.append($("<td>").html("<input type='text' name='proj_rents' class='proj_rents' placeholder='Project Rents'></td>"))
		.append($("<td>").html("<input type='number' name='total_units' class='total_units' placeholder='Total Units'></td>"))
		.append($("<td class = 'total_sf'></td>").text("0"))
		.append($("<td>").html("<input type='number' name='avg_sf_per_unit' class='avg_sf_per_unit' placeholder='Avg SF Per Unit'></td>"))
		.append($("<td class = 'rent_per_sf'></td>").text("$0.00"))
		.append($("<td>").html("<input type='number' name='rent_per_unit' class='rent_per_unit' placeholder='Rent Per Unit'></td>"))
		)
  };
//Javascript Market Rental Rate Assumptions first insert row -------------------------------------------
  myApp.htmlGen.marketRentalAssumptions = function(){
  	$('#Market_Rental_Assumptions_T').find('tbody')  //updated _T for Proforma testing
  		.append($("<tr class = 'year_row' id='year_row_1'>")
  		.append($("<td>Year 1</td>"))
  		.append($("<td></td>"))
  		.append($("<td>").html("<input type='number' name='mkt_rent_revenue' class='mkt_rent_revenue' placeholder='Revenue (%)'></td>"))
  		.append($("<td>").html("<input type='number' name='mkt_rent_expenses' class='mkt_rent_expenses' placeholder='Expenses (%)'></td>"))
  		.append($("<td>").html("<input type='number' name='mkt_rent_vacancy' class='mkt_rent_vacancy' placeholder='Vacancy (%)'></td>"))
  		.append($("<td>").html("<input type='number' name='mkt_rent_concessions' class='mkt_rent_concessions' placeholder='Concessions (%)'></td>"))
  		.append($("<td>").html("<input type='number' name='mkt_rent_credit_loss' class='mkt_rent_credit_loss' placeholder='Credit Loss (%)'></td>"))
  		)
  };
})()
