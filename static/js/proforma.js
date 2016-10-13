// ============================================================================================================
//PRO FORMA Dynamic Table
// ============================================================================================================

myApp.proForma = function(){
		var g = myApp.dashboard.getInputs();
		var FormatCurrency = myApp.utils.FormatCurrency;
		var pInt = myApp.utils.pInt;
		var pFloat = myApp.utils.pFloat;

		var pfCounter = g.saleYear;

	//Deletes all columns
		if (g.saleYear < pfCounter+1) {
			$('#Proforma thead tr th:not(:first)').each(function(){
				$(this).remove();
			});
			$('#Proforma tbody tr td').each(function(){
				$(this).remove();
			})
		};
	//Inserts number of columns based on Sale Year in Dashboard
		for(var i = 0; i < g.saleYear+1; ++i) {
			pfCounter = $('#Proforma .PF_Year_End th').length;
			$('#Proforma tr:first').append("<th class= 'PF_" + "year_" + pfCounter + "'>"+'YEAR '+ pfCounter +"</th>");

			if (i == 0){
			//Year 1 data grabbed/calculated based on org_dashboard values
				$('#Proforma tr:nth-child(2)').append(
					"<td class= 'PF_Rental_Income'>" +
					FormatCurrency(pFloat('#Rental_Income_Total') * (1+($('#year_row_1 .mkt_rent_revenue').val())/100)) + "</td>");
				$('#Proforma tr:nth-child(3)').append(
					"<td class= 'PF_Other_Income'>" +
					FormatCurrency(g.otherIncomeTotal * (1+($('#year_row_1 .mkt_rent_revenue').val())/100)) + "</td>");
				$('#Proforma tr:nth-child(4)').append(
					"<td class= 'PF_Gross_Rental_Income'>" +
					FormatCurrency(
					 pFloat('.PF_Rental_Income td:first') +
					 pFloat('.PF_Other_Income td:first')
					) + "</td>");

				$('#Proforma tr:nth-child(5)').append(
					"<td class= 'PF_Less_Vacancy'>(" + FormatCurrency(pFloat('#Proforma td.PF_Gross_Rental_Income:first') * ($('#year_row_1 .mkt_rent_vacancy').val())/100) + ")</td>");
				$('#Proforma tr:nth-child(6)').append(
					"<td class= 'PF_Less_Concessions'>(" + FormatCurrency(pFloat('#Proforma td.PF_Gross_Rental_Income:first') * ($('#year_row_1 .mkt_rent_concessions').val())/100) + ")</td>");
				$('#Proforma tr:nth-child(7)').append(
					"<td class= 'PF_Less_Credit_Loss'>(" + FormatCurrency(pFloat('#Proforma td.PF_Gross_Rental_Income:first') * ($('#year_row_1 .mkt_rent_credit_loss').val())/100) + ")</td>");
				$('#Proforma tr:nth-child(8)').append(
					"<td class= 'PF_Net_Rental_Income'>" +
					FormatCurrency(
					 pFloat('.PF_Gross_Rental_Income td:first') -
					 pFloat('.PF_Less_Vacancy td:first') -
					 pFloat('.PF_Less_Concessions td:first') -
					 pFloat('.PF_Less_Credit_Loss td:first')
					) + "</td>");


				$('#Proforma tr:nth-child(10)').append(
					"<td class= 'PF_Real_Estate_Taxes'>" + FormatCurrency(g.realEstateTaxesTotal * (1+($('#year_row_1 .mkt_rent_expenses').val())/100)) + "</td>");
				$('#Proforma tr:nth-child(11)').append(
					"<td class= 'PF_Insurance'>" + FormatCurrency(g.insuranceTotal * (1+($('#year_row_1 .mkt_rent_expenses').val())/100)) + "</td>");
				$('#Proforma tr:nth-child(12)').append(
					"<td class= 'PF_Utilities'>" + FormatCurrency(g.utilitiesTotal * (1+($('#year_row_1 .mkt_rent_expenses').val())/100)) + "</td>");
				$('#Proforma tr:nth-child(13)').append(
					"<td class= 'PF_Payroll'>" + FormatCurrency(g.payrollTotal * (1+($('#year_row_1 .mkt_rent_expenses').val())/100)) + "</td>");
				$('#Proforma tr:nth-child(14)').append(
					"<td class= 'PF_Repairs_And_Maintenance'>" + FormatCurrency(g.repairsAndMaintenanceTotal * (1+($('#year_row_1 .mkt_rent_expenses').val())/100)) + "</td>");
				$('#Proforma tr:nth-child(15)').append(
					"<td class= 'PF_Contract_Services'>" + FormatCurrency(g.contractServicesTotal * (1+($('#year_row_1 .mkt_rent_expenses').val())/100)) + "</td>");
				$('#Proforma tr:nth-child(16)').append(
					"<td class= 'PF_Turnover'>" + FormatCurrency(g.turnoverTotal * (1+($('#year_row_1 .mkt_rent_expenses').val())/100)) + "</td>");
				$('#Proforma tr:nth-child(17)').append(
					"<td class= 'PF_Sales_And_Marketing'>" + FormatCurrency(g.salesAndMarketingTotal * (1+($('#year_row_1 .mkt_rent_expenses').val())/100)) + "</td>");
				$('#Proforma tr:nth-child(18)').append(
					"<td class= 'PF_Administrative'>" + FormatCurrency(g.administrativeTotal * (1+($('#year_row_1 .mkt_rent_expenses').val())/100)) + "</td>");
				var Management_Total = pFloat('#Management_Total');
				$('#Proforma tr:nth-child(19)').append(
					"<td class= 'PF_Management'>" + FormatCurrency(Management_Total * (1+($('#year_row_1 .mkt_rent_expenses').val())/100)) + "</td>");
				var Replacement_Reserves_Total = pFloat('#Replacement_Reserves_Total');
				$('#Proforma tr:nth-child(20)').append(
					"<td class= 'PF_Replacement_Reserves'>" + FormatCurrency(Replacement_Reserves_Total * (1+($('#year_row_1 .mkt_rent_expenses').val())/100)) + "</td>");
				$('#Proforma tr:nth-child(21)').append(
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

				$('#Proforma tr:nth-child(22)').append(
					"<td class= 'PF_Net_Operating_Income'>" +
					FormatCurrency(
					 pFloat('.PF_Net_Rental_Income td:first') -
					 pFloat('.PF_Total_Operating_Expenses td:first')
					) + "</td>");

				//PF_Capital_Expenditures ------------------------WIP
				$('#Proforma tr:nth-child(24)').append(
					"<td class= 'PF_Capital_Expenditures'>" + FormatCurrency(100000) + "</td>");

				$('#Proforma tr:nth-child(25)').append(
					"<td class= 'PF_Net_Cash_Flow'>" +
					FormatCurrency(
					 pFloat('.PF_Net_Operating_Income td:first') -
					 pFloat('.PF_Capital_Expenditures td:first')
					) + "</td>");

			} else {
			//All additional year data calculated based on MRA table inputs ===================
				//Rental Income
				$('#Proforma tr:nth-child(2)').append(
					"<td class= 'PF_Rental_Income'>" +
					FormatCurrency(pFloat('#Proforma .PF_Rental_Income td:nth-child('+ (i+1) +')')  *
					(1+($('#year_row_' + i + ' .mkt_rent_revenue').val())/100)) +
					"</td>");
				//Other Income
				$('#Proforma tr:nth-child(3)').append(
					"<td class= 'PF_Other_Income'>" +
					FormatCurrency(pFloat('#Proforma .PF_Other_Income td:nth-child('+ (i+1) +')')  *
					(1+($('#year_row_' + i + ' .mkt_rent_revenue').val())/100)) +
					"</td>");
				//Gross Rental Income
				$('#Proforma tr:nth-child(4)').append(
					"<td class= 'PF_Gross_Rental_Income'>" +
					FormatCurrency(
					 pFloat('.PF_Rental_Income td:nth-child('+ (i+2) +')') +
					 pFloat('.PF_Other_Income td:nth-child('+ (i+2) +')')
					) + "</td>");


				//Less Vacancy
				$('#Proforma tr:nth-child(5)').append(
					"<td class= 'PF_Less_Vacancy'>(" +
					FormatCurrency(pFloat('#Proforma .PF_Less_Vacancy td:nth-child('+ (i+1) +')')  *
					(1+($('#year_row_' + i + ' .mkt_rent_vacancy').val())/100)) +
					")</td>");
				//Less Concessions
				$('#Proforma tr:nth-child(6)').append(
					"<td class= 'PF_Less_Concessions'>(" +
					FormatCurrency(pFloat('#Proforma .PF_Less_Concessions td:nth-child('+ (i+1) +')')  *
					(1+($('#year_row_' + i + ' .mkt_rent_concessions').val())/100)) +
					")</td>");
				//Less Credit Loss
				$('#Proforma tr:nth-child(7)').append(
					"<td class= 'PF_Less_Credit_Loss'>(" +
					FormatCurrency(pFloat('#Proforma .PF_Less_Credit_Loss td:nth-child('+ (i+1) +')')  *
					(1+($('#year_row_' + i + ' .mkt_rent_credit_loss').val())/100)) +
					")</td>");
				//Net Rental Income
				$('#Proforma tr:nth-child(8)').append(
					"<td class= 'PF_Net_Rental_Income'>" +
					FormatCurrency(
					 pFloat('#Proforma .PF_Gross_Rental_Income td:nth-child('+ (i+2) +')') -
					 pFloat('#Proforma .PF_Less_Vacancy td:nth-child('+ (i+2) +')') -
					 pFloat('#Proforma .PF_Less_Concessions td:nth-child('+ (i+2) +')') -
					 pFloat('#Proforma .PF_Less_Credit_Loss td:nth-child('+ (i+2) +')')
					) + "</td>");


				//Real Estate Taxes
				$('#Proforma tr:nth-child(10)').append(
					"<td class= 'PF_Real_Estate_Taxes'>" +
					FormatCurrency(pFloat('#Proforma .PF_Real_Estate_Taxes td:nth-child('+ (i+1) +')')  *
					(1+($('#year_row_' + i + ' .mkt_rent_expenses').val())/100)) +
					"</td>");
				//Insurance
				$('#Proforma tr:nth-child(11)').append(
					"<td class= 'PF_Insurance'>" +
					FormatCurrency(pFloat('#Proforma .PF_Insurance td:nth-child('+ (i+1) +')')  *
					(1+($('#year_row_' + i + ' .mkt_rent_expenses').val())/100)) +
					"</td>");
				//PF_Utilities
				$('#Proforma tr:nth-child(12)').append(
					"<td class= 'PF_Utilities'>" +
					FormatCurrency(pFloat('#Proforma .PF_Utilities td:nth-child('+ (i+1) +')')  *
					(1+($('#year_row_' + i + ' .mkt_rent_expenses').val())/100)) +
					"</td>");
				//PF_Payroll
				$('#Proforma tr:nth-child(13)').append(
					"<td class= 'PF_Payroll'>" +
					FormatCurrency(pFloat('#Proforma .PF_Payroll td:nth-child('+ (i+1) +')')  *
					(1+($('#year_row_' + i + ' .mkt_rent_expenses').val())/100)) +
					"</td>");
				//PF_Repairs_And_Maintenance
				$('#Proforma tr:nth-child(14)').append(
					"<td class= 'PF_Repairs_And_Maintenance'>" +
					FormatCurrency(pFloat('#Proforma .PF_Repairs_And_Maintenance td:nth-child('+ (i+1) +')')  *
					(1+($('#year_row_' + i + ' .mkt_rent_expenses').val())/100)) +
					"</td>");
				//PF_Contract_Services
				$('#Proforma tr:nth-child(15)').append(
					"<td class= 'PF_Contract_Services'>" +
					FormatCurrency(pFloat('#Proforma .PF_Contract_Services td:nth-child('+ (i+1) +')')  *
					(1+($('#year_row_' + i + ' .mkt_rent_expenses').val())/100)) +
					"</td>");
				//PF_Turnover
				$('#Proforma tr:nth-child(16)').append(
					"<td class= 'PF_Turnover'>" +
					FormatCurrency(pFloat('#Proforma .PF_Turnover td:nth-child('+ (i+1) +')')  *
					(1+($('#year_row_' + i + ' .mkt_rent_expenses').val())/100)) +
					"</td>");
				//PF_Sales_And_Marketing
				$('#Proforma tr:nth-child(17)').append(
					"<td class= 'PF_Sales_And_Marketing'>" +
					FormatCurrency(pFloat('#Proforma .PF_Sales_And_Marketing td:nth-child('+ (i+1) +')')  *
					(1+($('#year_row_' + i + ' .mkt_rent_expenses').val())/100)) +
					"</td>");
				//PF_Administrative
				$('#Proforma tr:nth-child(18)').append(
					"<td class= 'PF_Administrative'>" +
					FormatCurrency(pFloat('#Proforma .PF_Administrative td:nth-child('+ (i+1) +')')  *
					(1+($('#year_row_' + i + ' .mkt_rent_expenses').val())/100)) +
					"</td>");
				//PF_Management
				$('#Proforma tr:nth-child(19)').append(
					"<td class= 'PF_Management'>" +
					FormatCurrency(pFloat('#Proforma .PF_Management td:nth-child('+ (i+1) +')')  *
					(1+($('#year_row_' + i + ' .mkt_rent_expenses').val())/100)) +
					"</td>");
				//PF_Replacement_Reserves
				$('#Proforma tr:nth-child(20)').append(
					"<td class= 'PF_Replacement_Reserves'>" +
					FormatCurrency(pFloat('#Proforma .PF_Replacement_Reserves td:nth-child('+ (i+1) +')')  *
					(1+($('#year_row_' + i + ' .mkt_rent_expenses').val())/100)) +
					"</td>");


				//PF_Total_Operating_Expenses
				$('#Proforma tr:nth-child(21)').append(
					"<td class= 'PF_Total_Operating_Expenses'>" +
					FormatCurrency(
					 pFloat('#Proforma .PF_Real_Estate_Taxes td:nth-child('+ (i+2) + ')') +
					 pFloat('#Proforma .PF_Insurance td:nth-child('+ (i+2) + ')') +
					 pFloat('#Proforma .PF_Utilities td:nth-child('+ (i+2) + ')') +
					 pFloat('#Proforma .PF_Payroll td:nth-child('+ (i+2) + ')') +
					 pFloat('#Proforma .PF_Repairs_And_Maintenance td:nth-child('+ (i+2) + ')') +
					 pFloat('#Proforma .PF_Contract_Services td:nth-child('+ (i+2) + ')') +
					 pFloat('#Proforma .PF_Turnover td:nth-child('+ (i+2) + ')') +
					 pFloat('#Proforma .PF_Sales_And_Marketing td:nth-child('+ (i+2) + ')') +
					 pFloat('#Proforma .PF_Administrative td:nth-child('+ (i+2) + ')') +
					 pFloat('#Proforma .PF_Management td:nth-child('+ (i+2) + ')') +
					 pFloat('#Proforma .PF_Replacement_Reserves td:nth-child('+ (i+2) + ')')
					) + "</td>");

				//PF_Net_Operating_Income
				$('#Proforma tr:nth-child(22)').append(
					"<td class= 'PF_Net_Operating_Income'>" +
					FormatCurrency(
					 pFloat('.PF_Net_Rental_Income td:nth-child('+ (i+2) + ')') -
					 pFloat('.PF_Total_Operating_Expenses td:nth-child('+ (i+2) + ')')
					) + "</td>");


				//PF_Capital_Expenditures ------------------------WIP
				$('#Proforma tr:nth-child(24)').append(
					"<td class= 'PF_Capital_Expenditures'>" +
					FormatCurrency(100000) +
					"</td>");

				//PF_Net_Cash_Flow
				$('#Proforma tr:nth-child(25)').append(
					"<td class= 'PF_Net_Cash_Flow'>" +
					FormatCurrency(
					 pFloat('.PF_Net_Operating_Income td:nth-child('+ (i+2) + ')') -
					 pFloat('.PF_Capital_Expenditures td:nth-child('+ (i+2) + ')')
					) + "</td>");

			} //end else
		}; //end for loop

} //end myApp.ProForma function
