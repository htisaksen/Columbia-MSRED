myApp.htmlGen = {};

//TESTING PURPOSES @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
(function(){
  myApp.htmlGen.RRAsample = function(){
  	$('#Rental_Rate_Assumptions').find('tbody')
  		.append($("<tr class = 'rent_row'>")
  		.append($("<td>").html("<input type='text' name='proj_rents1' class='proj_rents' placeholder='Project Rents' value='1 Bed/1 Bath'></td>"))
  		.append($("<td>").html("<input type='number' name='total_units1' class='total_units' placeholder='Total Units' value='50'></td>"))
  		.append($("<td class = 'total_sf'></td>").text("0"))
  		.append($("<td>").html("<input type='number' name='avg_sf_per_unit1' class='avg_sf_per_unit' placeholder='Avg SF Per Unit' value='662'></td>"))
  		.append($("<td class = 'rent_per_sf'></td>").text("$0.00"))
  		.append($("<td>").html("<input type='number' name='rent_per_unit1' class='rent_per_unit' placeholder='Rent Per Unit' value='1100'></td>"))
  		.append($("<td>"))
      )
  	$('#Rental_Rate_Assumptions').find('tbody')
  		.append($("<tr class = 'rent_row'>")
  		.append($("<td>").html("<input type='text' name='proj_rents2' class='proj_rents' placeholder='Project Rents' value='2 Bed/1 Bath'></td>"))
  		.append($("<td>").html("<input type='number' name='total_units2' class='total_units' placeholder='Total Units' value='75'></td>"))
  		.append($("<td class = 'total_sf'></td>").text("0"))
  		.append($("<td>").html("<input type='number' name='avg_sf_per_unit2' class='avg_sf_per_unit' placeholder='Avg SF Per Unit' value='1041'></td>"))
  		.append($("<td class = 'rent_per_sf'></td>").text("$0.00"))
  		.append($("<td>").html("<input type='number' name='rent_per_unit2' class='rent_per_unit' placeholder='Rent Per Unit' value='1400'></td>"))
  		.append($("<td>"))
      )
  	$('#Rental_Rate_Assumptions').find('tbody')
  		.append($("<tr class = 'rent_row'>")
  		.append($("<td>").html("<input type='text' name='proj_rents3' class='proj_rents' placeholder='Project Rents' value='2 Bed/2 Bath'></td>"))
  		.append($("<td>").html("<input type='number' name='total_units3' class='total_units' placeholder='Total Units' value='75'></td>"))
  		.append($("<td class = 'total_sf'></td>").text("0"))
  		.append($("<td>").html("<input type='number' name='avg_sf_per_unit3' class='avg_sf_per_unit' placeholder='Avg SF Per Unit' value='1185'></td>"))
  		.append($("<td class = 'rent_per_sf'></td>").text("$0.00"))
  		.append($("<td>").html("<input type='number' name='rent_per_unit3' class='rent_per_unit' placeholder='Rent Per Unit' value='1800'></td>"))
      .append($("<td>"))
  		)
  };
//END TESTING PURPOSES @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@




//Javascript Rental Rate Assumptions first insert row -------------------------------------------
  myApp.htmlGen.rentalRateAssumptions = function(){
	$('#Rental_Rate_Assumptions').find('tbody')
		.append($("<tr class = 'rent_row'>")
		.append($("<td>").html("<input type='text' name='proj_rents1' class='proj_rents' placeholder='Proj. Rents'></td>"))
		.append($("<td>").html("<input type='number' name='total_units1' class='total_units' placeholder='Total Units'></td>"))
		.append($("<td class = 'total_sf'></td>").text("0"))
		.append($("<td>").html("<input type='number' name='avg_sf_per_unit1' class='avg_sf_per_unit' placeholder='Avg SF/Unit'></td>"))
		.append($("<td class = 'rent_per_sf'></td>").text("$0.00"))
		.append($("<td>").html("<input type='number' name='rent_per_unit1' class='rent_per_unit' placeholder='Rent/Unit'></td>"))
    .append($("<td>"))
		)
  };
//Javascript Market Rental Rate Assumptions first insert row -------------------------------------------
  myApp.htmlGen.marketRentalAssumptions = function(){
    $('#Market_Rental_Assumptions').find('tbody')
      .append($("<tr class = 'year_row' id='year_row_1'>")
      .append($("<td>Year 1</td>"))
      .append($("<td>").html("<input type='number' name='mkt_rent_revenue1' class='mkt_rent_revenue' placeholder='Revenue (%)'></td>"))
      .append($("<td>").html("<input type='number' name='mkt_rent_expenses1' class='mkt_rent_expenses' placeholder='Expenses (%)'></td>"))
      .append($("<td>").html("<input type='number' name='mkt_rent_vacancy1' class='mkt_rent_vacancy' placeholder='Vacancy (%)'></td>"))
      .append($("<td>").html("<input type='number' name='mkt_rent_concessions1' class='mkt_rent_concessions' placeholder='Concessions (%)'></td>"))
      .append($("<td>").html("<input type='number' name='mkt_rent_credit_loss1' class='mkt_rent_credit_loss' placeholder='Credit Loss (%)'></td>"))
      )
  };

  // //Javascript Pro Forma first insert column -------------------------------------------
  myApp.htmlGen.proForma = function(){
    for(var i = 1; i < 3; ++i) {

      $('#Proforma').find('thead tr')
        .append($("<th>YEAR "+ i +"</th>")
        );
  	 
      $('#Proforma tr:nth-child(2)').append(
        "<td class= 'PF_Rental_Income'>$0.00</td>");
      $('#Proforma tr:nth-child(3)').append(
        "<td class= 'PF_Other_Income'>$0.00</td>");
      $('#Proforma tr:nth-child(4)').append(
        "<td class= 'PF_Gross_Rental_Income'>$0.00</td>");

      $('#Proforma tr:nth-child(5)').append(
        "<td class= 'PF_Less_Vacancy'>($0.00)</td>");
      $('#Proforma tr:nth-child(6)').append(
        "<td class= 'PF_Less_Concessions'>($0.00)</td>");
      $('#Proforma tr:nth-child(7)').append(
        "<td class= 'PF_Less_Credit_Loss'>($0.00)</td>");
      $('#Proforma tr:nth-child(8)').append(
        "<td class= 'PF_Net_Rental_Income'>$0.00</td>");


      $('#Proforma tr:nth-child(10)').append(
        "<td class= 'PF_Real_Estate_Taxes'>$0.00</td>");
      $('#Proforma tr:nth-child(11)').append(
        "<td class= 'PF_Insurance'>$0.00</td>");
      $('#Proforma tr:nth-child(12)').append(
        "<td class= 'PF_Utilities'>$0.00</td>");
      $('#Proforma tr:nth-child(13)').append(
        "<td class= 'PF_Payroll'>$0.00</td>");
      $('#Proforma tr:nth-child(14)').append(
        "<td class= 'PF_Repairs_And_Maintenance'>$0.00</td>");
      $('#Proforma tr:nth-child(15)').append(
        "<td class= 'PF_Contract_Services'>$0.00</td>");
      $('#Proforma tr:nth-child(16)').append(
        "<td class= 'PF_Turnover'>$0.00</td>");
      $('#Proforma tr:nth-child(17)').append(
        "<td class= 'PF_Sales_And_Marketing'>$0.00</td>");
      $('#Proforma tr:nth-child(18)').append(
        "<td class= 'PF_Administrative'>$0.00</td>");
      $('#Proforma tr:nth-child(19)').append(
        "<td class= 'PF_Management'>$0.00</td>");
      $('#Proforma tr:nth-child(20)').append(
        "<td class= 'PF_Replacement_Reserves'>$0.00</td>");
      $('#Proforma tr:nth-child(21)').append(
        "<td class= 'PF_Total_Operating_Expenses'>$0.00</td>");

      $('#Proforma tr:nth-child(22)').append(
        "<td class= 'PF_Net_Operating_Income'>$0.00</td>");

      //PF_Capital_Expenditures ------------------------WIP
      $('#Proforma tr:nth-child(24)').append(
        "<td class= 'PF_Capital_Expenditures'>$0.00</td>");

      $('#Proforma tr:nth-child(25)').append(
        "<td class= 'PF_Net_Cash_Flow'>$0.00</td>");

    }; //end for loop
  		
  };
})()
