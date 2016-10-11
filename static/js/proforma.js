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
			console.log("Hello==================");
			pfCounter = $('#Proforma .PF_Year_End th').length;
			var Rental_Rate_Income_Total = pFloat('#Rental_Income_Total');
	
			$('#Proforma tr:first').append("<th class= 'PF_" + "year_" + pfCounter + "'>"+'YEAR '+ pfCounter +"</th>");

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
					 pFloat('.PF_Rental_Income td:nth-child('+ (i+1) +')') +
					 pFloat('.PF_Other_Income td:nth-child('+ (i+1) +')')
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
					 pFloat('#Proforma .PF_Gross_Rental_Income td:nth-child('+ (i+1) +')') -
					 pFloat('#Proforma .PF_Less_Vacancy td:nth-child('+ (i+1) +')') -
					 pFloat('#Proforma .PF_Less_Concessions td:nth-child('+ (i+1) +')') -
					 pFloat('#Proforma .PF_Less_Credit_Loss td:nth-child('+ (i+1) +')')
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
				$('#Proforma tr:nth-child(22)').append(
					"<td class= 'PF_Net_Operating_Income'>" +
					FormatCurrency(
					 pFloat('.PF_Net_Rental_Income td:nth-child('+ (i+1) + ')') -
					 pFloat('.PF_Total_Operating_Expenses td:nth-child('+ (i+1) + ')')
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
					 pFloat('.PF_Net_Operating_Income td:nth-child('+ (i+1) + ')') -
					 pFloat('.PF_Capital_Expenditures td:nth-child('+ (i+1) + ')')
					) + "</td>");

			} //end else
		}; //end for loop

} //end myApp.ProForma function
