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
		};
	}); //end addrow function

// ============================================================================================================
//PRO FORMA Dynamic Table
// ============================================================================================================
	var FormatCurrency = myApp.utils.FormatCurrency;
	var pInt = myApp.utils.pInt;
	var pFloat = myApp.utils.pFloat;
	
	$('#Sale_Year_T, #Market_Rental_Assumptions_T').on('input', function(event){
		var saleYear_T = parseInt($('#Sale_Year_T').val())+1;
		var pfCounter = saleYear_T;
	//Deletes all columns
		if (saleYear_T < pfCounter+1) {
			$('#Proforma tr td:not(:first)').each(function(){
				$(this).remove();
			});
			$('#Proforma tr td:first').each(function(){
				$(this).remove();
			})
		};
	//Inserts number of columns based on Sale Year in Dashboard
		for(var i = 0; i < saleYear_T; ++i) {
			pfCounter = $('#Proforma .PF_Year_End td').length+1;
			var Rental_Rate_Income_Total_T = pFloat('#Rental_Income_Total_T');
			var Other_Rate_Income_Total_T = pFloat('#Other_Income_Total_T');
			$('#Proforma tr:first').append("<td class= 'PF_" + "year_" + pfCounter + "'>"+'Year '+ pfCounter +"</td>");
			if (i == 0){
			//Year 1 data grabbed from org_dashboard calculations
				$('#Proforma tr:nth-child(3)').append(
					"<td class= 'PF_Rental_Income'>" + 
					FormatCurrency(Rental_Rate_Income_Total_T * (1+($('#year_row_1 .mkt_rent_revenue').val())/100)) + "</td>");
				$('#Proforma tr:nth-child(4)').append(
					"<td class= 'PF_Other_Income'>" + 
					FormatCurrency(Other_Rate_Income_Total_T * (1+($('#year_row_1 .mkt_rent_revenue').val())/100)) + "</td>");
				$('#Proforma tr:nth-child(5)').append(
					"<td class= 'PF_Gross_Rental_Income'>" + 
					FormatCurrency(
					 pFloat('.PF_Rental_Income td:first') + 
					 pFloat('.PF_Other_Income td:first')
					) + "</td>");

				$('#Proforma tr:nth-child(6)').append(
					"<td class= 'PF_Less_Vacancy'>(" + FormatCurrency(106 * (1+($('#year_row_1 .mkt_rent_vacancy').val())/100)) + ")</td>");
				$('#Proforma tr:nth-child(7)').append(
					"<td class= 'PF_Less_Concessions'>(" + FormatCurrency(107 * (1+($('#year_row_1 .mkt_rent_concessions').val())/100)) + ")</td>");
				$('#Proforma tr:nth-child(8)').append(
					"<td class= 'PF_Less_Credit_Loss'>(" + FormatCurrency(108 * (1+($('#year_row_1 .mkt_rent_credit_loss').val())/100)) + ")</td>");
				$('#Proforma tr:nth-child(9)').append(
					"<td class= 'PF_Net_Rental_Income'>" + 
					FormatCurrency(
					 pFloat('.PF_Gross_Rental_Income td:first') - 
					 pFloat('.PF_Less_Vacancy td:first') -
					 pFloat('.PF_Less_Concessions td:first') -
					 pFloat('.PF_Less_Credit_Loss td:first')
					) + "</td>");


				$('#Proforma tr:nth-child(11)').append(
					"<td class= 'PF_Real_Estate_Taxes'>" + FormatCurrency(111 * (1+($('#year_row_1 .mkt_rent_expenses').val())/100)) + "</td>");
				$('#Proforma tr:nth-child(12)').append(
					"<td class= 'PF_Insurance'>" + FormatCurrency(112 * (1+($('#year_row_1 .mkt_rent_expenses').val())/100)) + "</td>");
				$('#Proforma tr:nth-child(13)').append(
					"<td class= 'PF_Utilities'>" + FormatCurrency(113 * (1+($('#year_row_1 .mkt_rent_expenses').val())/100)) + "</td>");
				$('#Proforma tr:nth-child(14)').append(
					"<td class= 'PF_Payroll'>" + FormatCurrency(114 * (1+($('#year_row_1 .mkt_rent_expenses').val())/100)) + "</td>");
				$('#Proforma tr:nth-child(15)').append(
					"<td class= 'PF_Repairs_And_Maintenance'>" + FormatCurrency(115 * (1+($('#year_row_1 .mkt_rent_expenses').val())/100)) + "</td>");
				$('#Proforma tr:nth-child(16)').append(
					"<td class= 'PF_Contract_Services'>" + FormatCurrency(116 * (1+($('#year_row_1 .mkt_rent_expenses').val())/100)) + "</td>");
				$('#Proforma tr:nth-child(17)').append(
					"<td class= 'PF_Turnover'>" + FormatCurrency(117 * (1+($('#year_row_1 .mkt_rent_expenses').val())/100)) + "</td>");
				$('#Proforma tr:nth-child(18)').append(
					"<td class= 'PF_Sales_And_Marketing'>" + FormatCurrency(118 * (1+($('#year_row_1 .mkt_rent_expenses').val())/100)) + "</td>");
				$('#Proforma tr:nth-child(19)').append(
					"<td class= 'PF_Administrative'>" + FormatCurrency(119 * (1+($('#year_row_1 .mkt_rent_expenses').val())/100)) + "</td>");
				$('#Proforma tr:nth-child(20)').append(
					"<td class= 'PF_Management'>" + FormatCurrency(120 * (1+($('#year_row_1 .mkt_rent_expenses').val())/100)) + "</td>");
				$('#Proforma tr:nth-child(21)').append(
					"<td class= 'PF_Replacement_Reserves'>" + FormatCurrency(121 * (1+($('#year_row_1 .mkt_rent_expenses').val())/100)) + "</td>");
				$('#Proforma tr:nth-child(22)').append(
					"<td class= 'PF_Total_Operating_Expenses'>" + 
					FormatCurrency(
					 pFloat('.PF_Real_Estate_Taxes td:first') +
					 pFloat('.PF_Insurance td:first') +
					 pFloat('.PF_Utilities td:first') +
					 pFloat('.PF_Payroll td:first') +
					 pFloat('.PF_Repairs_And_Maintenance td:first') +
					 pFloat('.PF_Contract_Services td:first') +
					 pFloat('.PF_Turnover td:first') +
					 pFloat('.PF_Sales_And_Marketing td:first') +
					 pFloat('.PF_Administrative td:first') +
					 pFloat('.PF_Management td:first') +
					 pFloat('.PF_Replacement_Reserves td:first')
					) + "</td>");

				$('#Proforma tr:nth-child(23)').append(
					"<td class= 'PF_Net_Operating_Income'>" +
					FormatCurrency(
					 pFloat('.PF_Net_Rental_Income td:first') -
					 pFloat('.PF_Total_Operating_Expenses td:first')
					) + "</td>");
				
				//PF_Capital_Expenditures ------------------------WIP
				$('#Proforma tr:nth-child(25)').append(
					"<td class= 'PF_Capital_Expenditures'>" + FormatCurrency(100000) + "</td>");
				
				$('#Proforma tr:nth-child(26)').append(
					"<td class= 'PF_Net_Cash_Flow'>" +
					FormatCurrency(
					 pFloat('.PF_Net_Operating_Income td:first') -
					 pFloat('.PF_Capital_Expenditures td:first')
					) + "</td>");
				
			} else {
			//All additional year data calculated based on MRA table inputs ===================
				//Rental Income
				$('#Proforma tr:nth-child(3)').append(
					"<td class= 'PF_Rental_Income'>" + 
					FormatCurrency(pFloat('#Proforma .PF_Rental_Income td:nth-child('+ (i+1) +')')  *
					(1+($('#year_row_' + i + ' .mkt_rent_revenue').val())/100)) +
					"</td>");
				//Other Income
				$('#Proforma tr:nth-child(4)').append(
					"<td class= 'PF_Other_Income'>" + 
					FormatCurrency(pFloat('#Proforma .PF_Other_Income td:nth-child('+ (i+1) +')')  *
					(1+($('#year_row_' + i + ' .mkt_rent_revenue').val())/100)) +
					"</td>");
				//Gross Rental Income
				$('#Proforma tr:nth-child(5)').append(
					"<td class= 'PF_Gross_Rental_Income'>" + 
					FormatCurrency(
					 pFloat('.PF_Rental_Income td:nth-child('+ (i+1) +')') + 
					 pFloat('.PF_Other_Income td:nth-child('+ (i+1) +')')
					) + "</td>");
					

				//Less Vacancy
				$('#Proforma tr:nth-child(6)').append(
					"<td class= 'PF_Less_Vacancy'>(" + 
					FormatCurrency(pFloat('#Proforma .PF_Less_Vacancy td:nth-child('+ (i+1) +')')  *
					(1+($('#year_row_' + i + ' .mkt_rent_vacancy').val())/100)) +
					")</td>");
				//Less Concessions
				$('#Proforma tr:nth-child(7)').append(
					"<td class= 'PF_Less_Concessions'>(" + 
					FormatCurrency(pFloat('#Proforma .PF_Less_Concessions td:nth-child('+ (i+1) +')')  *
					(1+($('#year_row_' + i + ' .mkt_rent_concessions').val())/100)) +
					")</td>");
				//Less Credit Loss
				$('#Proforma tr:nth-child(8)').append(
					"<td class= 'PF_Less_Credit_Loss'>(" + 
					FormatCurrency(pFloat('#Proforma .PF_Less_Credit_Loss td:nth-child('+ (i+1) +')')  *
					(1+($('#year_row_' + i + ' .mkt_rent_credit_loss').val())/100)) +
					")</td>");
				//Net Rental Income
				$('#Proforma tr:nth-child(9)').append(
					"<td class= 'PF_Net_Rental_Income'>" + 
					FormatCurrency(
					 pFloat('#Proforma .PF_Gross_Rental_Income td:nth-child('+ (i+1) +')') -
					 pFloat('#Proforma .PF_Less_Vacancy td:nth-child('+ (i+1) +')') -
					 pFloat('#Proforma .PF_Less_Concessions td:nth-child('+ (i+1) +')') -
					 pFloat('#Proforma .PF_Less_Credit_Loss td:nth-child('+ (i+1) +')')
					) + "</td>");
				

				//Real Estate Taxes
				$('#Proforma tr:nth-child(11)').append(
					"<td class= 'PF_Real_Estate_Taxes'>" + 
					FormatCurrency(pFloat('#Proforma .PF_Real_Estate_Taxes td:nth-child('+ (i+1) +')')  *
					(1+($('#year_row_' + i + ' .mkt_rent_expenses').val())/100)) +
					"</td>");
				//Insurance
				$('#Proforma tr:nth-child(12)').append(
					"<td class= 'PF_Insurance'>" + 
					FormatCurrency(pFloat('#Proforma .PF_Insurance td:nth-child('+ (i+1) +')')  *
					(1+($('#year_row_' + i + ' .mkt_rent_expenses').val())/100)) +
					"</td>");
				//PF_Utilities
				$('#Proforma tr:nth-child(13)').append(
					"<td class= 'PF_Utilities'>" + 
					FormatCurrency(pFloat('#Proforma .PF_Utilities td:nth-child('+ (i+1) +')')  *
					(1+($('#year_row_' + i + ' .mkt_rent_expenses').val())/100)) +
					"</td>");
				//PF_Payroll
				$('#Proforma tr:nth-child(14)').append(
					"<td class= 'PF_Payroll'>" + 
					FormatCurrency(pFloat('#Proforma .PF_Payroll td:nth-child('+ (i+1) +')')  *
					(1+($('#year_row_' + i + ' .mkt_rent_expenses').val())/100)) +
					"</td>");
				//PF_Repairs_And_Maintenance
				$('#Proforma tr:nth-child(15)').append(
					"<td class= 'PF_Repairs_And_Maintenance'>" + 
					FormatCurrency(pFloat('#Proforma .PF_Repairs_And_Maintenance td:nth-child('+ (i+1) +')')  *
					(1+($('#year_row_' + i + ' .mkt_rent_expenses').val())/100)) +
					"</td>");
				//PF_Contract_Services
				$('#Proforma tr:nth-child(16)').append(
					"<td class= 'PF_Contract_Services'>" + 
					FormatCurrency(pFloat('#Proforma .PF_Contract_Services td:nth-child('+ (i+1) +')')  *
					(1+($('#year_row_' + i + ' .mkt_rent_expenses').val())/100)) +
					"</td>");
				//PF_Turnover
				$('#Proforma tr:nth-child(17)').append(
					"<td class= 'PF_Turnover'>" + 
					FormatCurrency(pFloat('#Proforma .PF_Turnover td:nth-child('+ (i+1) +')')  *
					(1+($('#year_row_' + i + ' .mkt_rent_expenses').val())/100)) +
					"</td>");
				//PF_Sales_And_Marketing
				$('#Proforma tr:nth-child(18)').append(
					"<td class= 'PF_Sales_And_Marketing'>" + 
					FormatCurrency(pFloat('#Proforma .PF_Sales_And_Marketing td:nth-child('+ (i+1) +')')  *
					(1+($('#year_row_' + i + ' .mkt_rent_expenses').val())/100)) +
					"</td>");
				//PF_Administrative
				$('#Proforma tr:nth-child(19)').append(
					"<td class= 'PF_Administrative'>" + 
					FormatCurrency(pFloat('#Proforma .PF_Administrative td:nth-child('+ (i+1) +')')  *
					(1+($('#year_row_' + i + ' .mkt_rent_expenses').val())/100)) +
					"</td>");
				//PF_Management
				$('#Proforma tr:nth-child(20)').append(
					"<td class= 'PF_Management'>" + 
					FormatCurrency(pFloat('#Proforma .PF_Management td:nth-child('+ (i+1) +')')  *
					(1+($('#year_row_' + i + ' .mkt_rent_expenses').val())/100)) +
					"</td>");
				//PF_Replacement_Reserves
				$('#Proforma tr:nth-child(21)').append(
					"<td class= 'PF_Replacement_Reserves'>" + 
					FormatCurrency(pFloat('#Proforma .PF_Replacement_Reserves td:nth-child('+ (i+1) +')')  *
					(1+($('#year_row_' + i + ' .mkt_rent_expenses').val())/100)) +
					"</td>");


				//PF_Total_Operating_Expenses
				$('#Proforma tr:nth-child(22)').append(
					"<td class= 'PF_Total_Operating_Expenses'>" + 
					FormatCurrency(
					 pFloat('#Proforma .PF_Real_Estate_Taxes td:nth-child('+ (i+1) + ')') +
					 pFloat('#Proforma .PF_Insurance td:nth-child('+ (i+1) + ')') +
					 pFloat('#Proforma .PF_Utilities td:nth-child('+ (i+1) + ')') +
					 pFloat('#Proforma .PF_Payroll td:nth-child('+ (i+1) + ')') +
					 pFloat('#Proforma .PF_Repairs_And_Maintenance td:nth-child('+ (i+1) + ')') +
					 pFloat('#Proforma .PF_Contract_Services td:nth-child('+ (i+1) + ')') +
					 pFloat('#Proforma .PF_Turnover td:nth-child('+ (i+1) + ')') +
					 pFloat('#Proforma .PF_Sales_And_Marketing td:nth-child('+ (i+1) + ')') +
					 pFloat('#Proforma .PF_Administrative td:nth-child('+ (i+1) + ')') +
					 pFloat('#Proforma .PF_Management td:nth-child('+ (i+1) + ')') +
					 pFloat('#Proforma .PF_Replacement_Reserves td:nth-child('+ (i+1) + ')')
					) + "</td>");

				//PF_Net_Operating_Income
				$('#Proforma tr:nth-child(23)').append(
					"<td class= 'PF_Net_Operating_Income'>" +
					FormatCurrency(
					 pFloat('.PF_Net_Rental_Income td:nth-child('+ (i+1) + ')') -
					 pFloat('.PF_Total_Operating_Expenses td:nth-child('+ (i+1) + ')')
					) + "</td>");


				//PF_Capital_Expenditures ------------------------WIP
				$('#Proforma tr:nth-child(25)').append(
					"<td class= 'PF_Capital_Expenditures'>" + 
					FormatCurrency(100000) +
					"</td>");

				//PF_Net_Cash_Flow
				$('#Proforma tr:nth-child(26)').append(
					"<td class= 'PF_Net_Cash_Flow'>" + 
					FormatCurrency(
					 pFloat('.PF_Net_Operating_Income td:nth-child('+ (i+1) + ')') -
					 pFloat('.PF_Capital_Expenditures td:nth-child('+ (i+1) + ')')
					) + "</td>");




			} //end else
		}; //end for loop
		  $("td:contains('NaN')").each(function() {
    			$(this).text('$0.00');
			});

	}); //end addrow function













// ============================================================================================================
	$('.rent_row').on('input', myApp.rra.RRAInput);
	$('#dashboard').on('input', dashboardInput);





}); //end of doc
