'use strict';
// Math.round(num * 100) / 100
$(document).ready(function(){

//created function to run dashboard input twice
	var dashboardInput = function(){
			myApp.dashboard.DashboardInput();
			myApp.dashboard.DashboardInput();
	};

//TESTING PURPOSES @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

	myApp.htmlGen.test();

//END TESTING PURPOSES @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@



// //Javascript Rental Rate Assumptions first insert row -----------------------
		// myApp.htmlGen.rentalRateAssumptions();

//Javascript Market Rental Rate Assumptions first insert row -------------------
		myApp.htmlGen.marketRentalAssumptions();

// ============================================================================================================
// Start of ALL calculations for dashboard
// ============================================================================================================

	// var RRAlist = []; //Rental Rate Assumptions list
	// var MRAlist = []; //Market Rental Assumptions list


//RENTAL RATE ASSUMPTIONS Table calculations=====================
	myApp.rra.RRAInput();

//MARKET RENTAL ASSUMPTIONS Table calculations===================
	myApp.mra.MRAInput();



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

		$('.rent_row').on('input', myApp.rra.RRAInput);
		$('#dashboard').on('input', dashboardInput);

	}); //end addrow function




// ============================================================================================================
//MARKET RENTAL ASSUMPTIONS Dynamic Table
// ============================================================================================================
	// adds one row to table when the 'add' button is clicked
	$('#Sale_Year_T').on('focusout', function(event){
		var saleYear = parseInt($('#Sale_Year_T').val());
		for(var i=0;i<saleYear-1;++i){
		//Inserts number of rows based on Sale Year in Dashboard
			var mraCounter = $('#Market_Rental_Assumptions_T tbody tr').length+1;
			while(saleYear+1 < mraCounter){
				$('#Market_Rental_Assumptions_T tbody tr').last().remove();
				mraCounter = $('#Market_Rental_Assumptions_T tbody tr').length+1;
			};
			$('#Market_Rental_Assumptions_T').find('tbody')
				.append($("<tr class = 'year_row' id='year_row_"+mraCounter+"'>")
				.append($("<td class='mkt_rent_year'>Year "+mraCounter+"</td>"))
				.append($("<td></td>"))
				.append($("<td>").html("<input type='number' name='mkt_rent_revenue' class='mkt_rent_revenue' placeholder='Revenue (%)'></td>"))
				.append($("<td>").html("<input type='number' name='mkt_rent_expenses' class='mkt_rent_expenses' placeholder='Expenses (%)'></td>"))
				.append($("<td>").html("<input type='number' name='mkt_rent_vacancy' class='mkt_rent_vacancy' placeholder='Vacancy (%)'></td>"))
				.append($("<td>").html("<input type='number' name='mkt_rent_concessions' class='mkt_rent_concessions' placeholder='Concessions (%)'></td>"))
				.append($("<td>").html("<input type='number' name='mkt_rent_credit_loss' class='mkt_rent_credit_loss' placeholder='Credit Loss (%)'></td>"))
				)
		//Inserts number of columns based on Sale Year in Pro Forma
		// 	console.log("Add Proforma rows==============")
		// 	$('#Proforma').find('#PF_Year_End')
		// 		.append($("<th>").text("Test"));
		// 	$('#Proforma').find('#PR_Rental_Income')
		// 		.append($("<td>").text("Test"));

		};
	}); //end addrow function

	var pInt = myApp.utils.pInt;
	$('#Sale_Year_T, #Market_Rental_Assumptions_T').on('input', function(event){
		var saleYear_T = parseInt($('#Sale_Year_T').val())+1;
		var pfCounter = saleYear_T;
	//Deletes all columns
		if (saleYear_T < pfCounter+1) {
			$('#Proforma tr td:not(:first)').each(function(){
				$(this).remove();
				// pfCounter = $('#Proforma .PF_Year_End td').length+1;
			});
			$('#Proforma tr td:first').each(function(){
				$(this).remove();
				// pfCounter = $('#Proforma .PF_Year_End td').length+1;
			})
		};
	//Inserts number of columns based on Sale Year in Dashboard
		for(var i = 0; i < saleYear_T; ++i) {
			pfCounter = $('#Proforma .PF_Year_End td').length+1;
			var Rental_Rate_Income_Total_T = parseInt($('#Rental_Income_Total_T').text());		
			var Other_Rate_Income_Total_T = parseInt($('#Other_Income_Total_T').text());
			$('#Proforma tr:first').append("<td class= 'PF_" + "year_" + pfCounter + "'>"+'Year '+ pfCounter +"</td>");
			if (i == 0){
			//Year 1 data grabbed from org_dashboard calculations
				$('#Proforma tr:nth-child(3)').append(
					"<td class= 'PF_Rental_Income'>" + 
					Rental_Rate_Income_Total_T * (1+($('#year_row_1 .mkt_rent_revenue').val())/100) + "</td>");
				$('#Proforma tr:nth-child(4)').append(
					"<td class= 'PF_Other_Income'>" + 
					Other_Rate_Income_Total_T * (1+($('#year_row_1 .mkt_rent_revenue').val())/100) + "</td>");
				$('#Proforma tr:nth-child(5)').append(
					"<td class= 'PF_Gross_Rental_Income'>" + 
					(parseInt($('.PF_Rental_Income td:first').text()) + 
					 parseInt($('.PF_Other_Income td:first').text())
					) + "</td>");

				$('#Proforma tr:nth-child(6)').append(
					"<td class= 'PF_Less_Vacancy'>" + 106 * (1+($('#year_row_1 .mkt_rent_vacancy').val())/100) + "</td>");
				$('#Proforma tr:nth-child(7)').append(
					"<td class= 'PF_Less_Concessions'>" + 107 * (1+($('#year_row_1 .mkt_rent_concessions').val())/100) + "</td>");
				$('#Proforma tr:nth-child(8)').append(
					"<td class= 'PF_Less_Credit_Loss'>" + 108 * (1+($('#year_row_1 .mkt_rent_credit_loss').val())/100) + "</td>");
				$('#Proforma tr:nth-child(9)').append(
					"<td class= 'PF_Net_Rental_Income'>" + 
					(parseInt($('.PF_Less_Vacancy td:first').text()) + 
					 parseInt($('.PF_Less_Concessions td:first').text()) +
					 parseInt($('.PF_Less_Credit_Loss td:first').text())
					) + "</td>");


				$('#Proforma tr:nth-child(11)').append(
					"<td class= 'PF_Real_Estate_Taxes'>" + 111 * (1+($('#year_row_1 .mkt_rent_expenses').val())/100) + "</td>");
				$('#Proforma tr:nth-child(12)').append(
					"<td class= 'PF_Insurance'>" + 112 * (1+($('#year_row_1 .mkt_rent_expenses').val())/100) + "</td>");
				$('#Proforma tr:nth-child(13)').append(
					"<td class= 'PF_Utilities'>" + 113 * (1+($('#year_row_1 .mkt_rent_expenses').val())/100) + "</td>");
				$('#Proforma tr:nth-child(14)').append(
					"<td class= 'PF_Payroll'>" + 114 * (1+($('#year_row_1 .mkt_rent_expenses').val())/100) + "</td>");
				$('#Proforma tr:nth-child(15)').append(
					"<td class= 'PF_Repairs_And_Maintenance'>" + 115 * (1+($('#year_row_1 .mkt_rent_expenses').val())/100) + "</td>");
				$('#Proforma tr:nth-child(16)').append(
					"<td class= 'PF_Contract_Services'>" + 116 * (1+($('#year_row_1 .mkt_rent_expenses').val())/100) + "</td>");
				$('#Proforma tr:nth-child(17)').append(
					"<td class= 'PF_Turnover'>" + 117 * (1+($('#year_row_1 .mkt_rent_expenses').val())/100) + "</td>");
				$('#Proforma tr:nth-child(18)').append(
					"<td class= 'PF_Sales_And_Marketing'>" + 118 * (1+($('#year_row_1 .mkt_rent_expenses').val())/100) + "</td>");
				$('#Proforma tr:nth-child(19)').append(
					"<td class= 'PF_Administrative'>" + 119 * (1+($('#year_row_1 .mkt_rent_expenses').val())/100) + "</td>");
				$('#Proforma tr:nth-child(20)').append(
					"<td class= 'PF_Management'>" + 120 * (1+($('#year_row_1 .mkt_rent_expenses').val())/100) + "</td>");
				$('#Proforma tr:nth-child(21)').append(
					"<td class= 'PF_Replacement_Reserves'>" + 121 * (1+($('#year_row_1 .mkt_rent_expenses').val())/100) + "</td>");
				$('#Proforma tr:nth-child(22)').append(
					"<td class= 'PF_Total_Operating_Expenses'>" + 
					(parseInt($('.PF_Real_Estate_Taxes td:first').text()) +
					 parseInt($('.PF_Insurance td:first').text()) +
					 parseInt($('.PF_Utilities td:first').text()) +
					 parseInt($('.PF_Payroll td:first').text()) +
					 parseInt($('.PF_Repairs_And_Maintenance td:first').text()) +
					 parseInt($('.PF_Contract_Services td:first').text()) +
					 parseInt($('.PF_Turnover td:first').text()) +
					 parseInt($('.PF_Sales_And_Marketing td:first').text()) +
					 parseInt($('.PF_Administrative td:first').text()) +
					 parseInt($('.PF_Management td:first').text()) +
					 parseInt($('.PF_Replacement_Reserves td:first').text())
					) + "</td>");

				$('#Proforma tr:nth-child(23)').append(
					"<td class= 'PF_Net_Operating_Income'>" +
					(parseInt($('.PF_Net_Rental_Income td:first').text()) -
					 parseInt($('.PF_Total_Operating_Expenses td:first').text())
					) + "</td>");
				
				// INPUT BOX NEEDED FOR CAPITAL EXPENDITURES==============================
				$('#Proforma tr:nth-child(25)').append(
					"<td class= 'PF_Capital_Expenditures'>" + 125 * (1+($('#year_row_1 .mkt_rent_expenses').val())/100) + "</td>");
				
				$('#Proforma tr:nth-child(26)').append(
					"<td class= 'PF_Net_Cash_Flow'>" +
					(parseInt($('.PF_Net_Operating_Income td:first').text()) -
					 parseInt($('.PF_Capital_Expenditures td:first').text())
					) + "</td>");
				
			} else {
			//All other year data calculated based on MRA table inputs
				//Rental Income
				$('#Proforma tr:nth-child(3)').append(
					"<td class= 'PF_Rental_Income'>" + 
					$('#Proforma .PF_Rental_Income td:nth-child('+ (i+1) +')').text()  *
					(1+($('#year_row_' + i + ' .mkt_rent_revenue').val())/100) +
					"</td>");
				//Other Income
				$('#Proforma tr:nth-child(4)').append(
					"<td class= 'PF_Other_Income'>" + 
					$('#Proforma .PF_Other_Income td:nth-child('+ (i+1) +')').text()  *
					(1+($('#year_row_' + i + ' .mkt_rent_revenue').val())/100) +
					"</td>");
				//Gross Rental Income
				$('#Proforma tr:nth-child(5)').append(
					"<td class= 'PF_Gross_Rental_Income'>" + 
					(parseInt($('.PF_Rental_Income td:nth-child('+ (i+1) +')').text()) + 
					 parseInt($('.PF_Other_Income td:nth-child('+ (i+1) +')').text())
					)) + "</td>";
					

				//Less Vacancy
				$('#Proforma tr:nth-child(6)').append(
					"<td class= 'PF_Less_Vacancy'>" + 
					$('#Proforma .PF_Less_Vacancy td:nth-child('+ (i+1) +')').text()  *
					(1+($('#year_row_' + i + ' .mkt_rent_vacancy').val())/100) +
					"</td>");
				//Less Concessions
				$('#Proforma tr:nth-child(7)').append(
					"<td class= 'PF_Less_Concessions'>" + 
					$('#Proforma .PF_Less_Concessions td:nth-child('+ (i+1) +')').text()  *
					(1+($('#year_row_' + i + ' .mkt_rent_concessions').val())/100) +
					"</td>");
				//Less Credit Loss
				$('#Proforma tr:nth-child(8)').append(
					"<td class= 'PF_Less_Credit_Loss'>" + 
					$('#Proforma .PF_Less_Credit_Loss td:nth-child('+ (i+1) +')').text()  *
					(1+($('#year_row_' + i + ' .mkt_rent_credit_loss').val())/100) +
					"</td>");
				//Net Rental Income
				$('#Proforma tr:nth-child(9)').append(
					"<td class= 'PF_Net_Rental_Income'>" + 
					(parseInt($('#Proforma .PF_Less_Vacancy td:nth-child('+ (i+1) +')').text()) +
					 parseInt($('#Proforma .PF_Less_Concessions td:nth-child('+ (i+1) +')').text()) +
					 parseInt($('#Proforma .PF_Less_Credit_Loss td:nth-child('+ (i+1) +')').text())
					) + "</td>");
				

				//Real Estate Taxes
				$('#Proforma tr:nth-child(11)').append(
					"<td class= 'PF_Real_Estate_Taxes'>" + 
					$('#Proforma .PF_Real_Estate_Taxes td:nth-child('+ (i+1) +')').text()  *
					(1+($('#year_row_' + i + ' .mkt_rent_expenses').val())/100) +
					"</td>");
				//Insurance
				$('#Proforma tr:nth-child(12)').append(
					"<td class= 'PF_Insurance'>" + 
					$('#Proforma .PF_Insurance td:nth-child('+ (i+1) +')').text()  *
					(1+($('#year_row_' + i + ' .mkt_rent_expenses').val())/100) +
					"</td>");
				//PF_Utilities
				$('#Proforma tr:nth-child(13)').append(
					"<td class= 'PF_Utilities'>" + 
					$('#Proforma .PF_Utilities td:nth-child('+ (i+1) +')').text()  *
					(1+($('#year_row_' + i + ' .mkt_rent_expenses').val())/100) +
					"</td>");
				//PF_Payroll
				$('#Proforma tr:nth-child(14)').append(
					"<td class= 'PF_Payroll'>" + 
					$('#Proforma .PF_Payroll td:nth-child('+ (i+1) +')').text()  *
					(1+($('#year_row_' + i + ' .mkt_rent_expenses').val())/100) +
					"</td>");
				//PF_Repairs_And_Maintenance
				$('#Proforma tr:nth-child(15)').append(
					"<td class= 'PF_Repairs_And_Maintenance'>" + 
					$('#Proforma .PF_Repairs_And_Maintenance td:nth-child('+ (i+1) +')').text()  *
					(1+($('#year_row_' + i + ' .mkt_rent_expenses').val())/100) +
					"</td>");
				//PF_Contract_Services
				$('#Proforma tr:nth-child(16)').append(
					"<td class= 'PF_Contract_Services'>" + 
					$('#Proforma .PF_Contract_Services td:nth-child('+ (i+1) +')').text()  *
					(1+($('#year_row_' + i + ' .mkt_rent_expenses').val())/100) +
					"</td>");
				//PF_Turnover
				$('#Proforma tr:nth-child(17)').append(
					"<td class= 'PF_Turnover'>" + 
					$('#Proforma .PF_Turnover td:nth-child('+ (i+1) +')').text()  *
					(1+($('#year_row_' + i + ' .mkt_rent_expenses').val())/100) +
					"</td>");
				//PF_Sales_And_Marketing
				$('#Proforma tr:nth-child(18)').append(
					"<td class= 'PF_Sales_And_Marketing'>" + 
					$('#Proforma .PF_Sales_And_Marketing td:nth-child('+ (i+1) +')').text()  *
					(1+($('#year_row_' + i + ' .mkt_rent_expenses').val())/100) +
					"</td>");
				//PF_Administrative
				$('#Proforma tr:nth-child(19)').append(
					"<td class= 'PF_Administrative'>" + 
					$('#Proforma .PF_Administrative td:nth-child('+ (i+1) +')').text()  *
					(1+($('#year_row_' + i + ' .mkt_rent_expenses').val())/100) +
					"</td>");
				//PF_Management
				$('#Proforma tr:nth-child(20)').append(
					"<td class= 'PF_Management'>" + 
					$('#Proforma .PF_Management td:nth-child('+ (i+1) +')').text()  *
					(1+($('#year_row_' + i + ' .mkt_rent_expenses').val())/100) +
					"</td>");
				//PF_Replacement_Reserves
				$('#Proforma tr:nth-child(21)').append(
					"<td class= 'PF_Replacement_Reserves'>" + 
					$('#Proforma .PF_Replacement_Reserves td:nth-child('+ (i+1) +')').text()  *
					(1+($('#year_row_' + i + ' .mkt_rent_expenses').val())/100) +
					"</td>");


				//PF_Total_Operating_Expenses
				$('#Proforma tr:nth-child(22)').append(
					"<td class= 'PF_Total_Operating_Expenses'>" + 
					(parseInt($('#Proforma .PF_Real_Estate_Taxes td:nth-child('+ (i+1) + ')').text()) +
					 parseInt($('#Proforma .PF_Insurance td:nth-child('+ (i+1) + ')').text()) +
					 parseInt($('#Proforma .PF_Utilities td:nth-child('+ (i+1) + ')').text()) +
					 parseInt($('#Proforma .PF_Payroll td:nth-child('+ (i+1) + ')').text()) +
					 parseInt($('#Proforma .PF_Repairs_And_Maintenance td:nth-child('+ (i+1) + ')').text()) +
					 parseInt($('#Proforma .PF_Contract_Services td:nth-child('+ (i+1) + ')').text()) +
					 parseInt($('#Proforma .PF_Turnover td:nth-child('+ (i+1) + ')').text()) +
					 parseInt($('#Proforma .PF_Sales_And_Marketing td:nth-child('+ (i+1) + ')').text()) +
					 parseInt($('#Proforma .PF_Administrative td:nth-child('+ (i+1) + ')').text()) +
					 parseInt($('#Proforma .PF_Management td:nth-child('+ (i+1) + ')').text()) +
					 parseInt($('#Proforma .PF_Replacement_Reserves td:nth-child('+ (i+1) + ')').text()
					) + "</td>"));

				//PF_Net_Operating_Income
				$('#Proforma tr:nth-child(23)').append(
					"<td class= 'PF_Net_Operating_Income'>" +
					(parseInt($('.PF_Net_Rental_Income td:nth-child('+ (i+1) + ')').text()) -
					 parseInt($('.PF_Total_Operating_Expenses td:nth-child('+ (i+1) + ')').text())
					) + "</td>");


				//PF_Capital_Expenditures
				$('#Proforma tr:nth-child(25)').append(
					"<td class= 'PF_Capital_Expenditures'>" + 
					// $('#Proforma .PF_Capital_Expenditures td:nth-child('+ (i+1) +')').text()  *
					100 *
					(1+($('#year_row_' + i + ' .mkt_rent_expenses').val())/100) +
					"</td>");

				//PF_Net_Cash_Flow
				$('#Proforma tr:nth-child(26)').append(
					"<td class= 'PF_Net_Cash_Flow'>" + 
					(parseInt($('.PF_Net_Operating_Income td:nth-child('+ (i+1) + ')').text()) -
					 parseInt($('.PF_Capital_Expenditures td:nth-child('+ (i+1) + ')').text())
					) + "</td>");




			} //end else
		}; //end for loop
			

	}); //end addrow function













// ============================================================================================================
	$('.rent_row').on('input', myApp.rra.RRAInput);
	$('#dashboard').on('input', dashboardInput);





}); //end of doc
