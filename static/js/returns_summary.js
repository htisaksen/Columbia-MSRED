// ============================================================================================================
//RETURNS SUMMARY Dynamic Table
// ============================================================================================================

myApp.returnsSummary = function(){
		var g = myApp.dashboard.getInputs();
		var FormatCurrency = myApp.utils.FormatCurrency;
		var pInt = myApp.utils.pInt;
		var pFloat = myApp.utils.pFloat;

		var rsCounter = g.saleYear;
		var intRate = g.interestRateOnMortgage;
	

	var RSgenerator = function(tbl_name){
	//Deletes all columns
		if (g.saleYear < rsCounter+1) {
			$(tbl_name +'thead tr th:not(:first)').each(function(){
				$(this).remove();
			});
			$(tbl_name +'tbody tr td').each(function(){
				$(this).remove();
			})
		};

		//Inserts number of columns based on Sale Year in Dashboard
		for(var i = 1; i < g.saleYear+2; ++i) {
			rsCounter = $(tbl_name +'.RS_Year_End th').length;

			if (i == 1){
				//Cost value grabbed
				$(tbl_name +'thead tr:first').append("<th>COSTS</th>");
				$(tbl_name +'tbody tr:not(:last)').each(function(){
					$(this).append("<td></td>");
				})
				$(tbl_name +'tbody tr:last').append("<td>" +
					FormatCurrency(pFloat('#dashboard #Purchase_Information td#PI_Total_Costs')*-1) +
					"</td>");

			} else {
			//All additional year data calculated based on Pro Forma table calculations ===================
				$(tbl_name +'thead tr:first').append("<th class= 'RS_" + "year_" + (rsCounter-1) + "'>"+'YEAR '+ (rsCounter-1) +"</th>");

				//RS_Net_Operating_Income
				$(tbl_name +'tbody tr:nth-child(1)').append(
					"<td class= 'RS_Net_Operating_Income'>" +
					FormatCurrency(
					 pFloat('#Proforma tbody td.PF_Net_Operating_Income:nth-child('+ i +')')) +
					"</td>");
				//RS_Less_Capital_Expenditures
				$(tbl_name +'tbody tr:nth-child(2)').append(
					"<td class= 'RS_Less_Capital_Expenditures'>" +
					FormatCurrency(
					 pFloat('#Proforma tbody td.PF_Capital_Expenditures:nth-child('+ i +')')*-1) +
					"</td>");
				
				//RS_Less_Debt_Service - LEVERED ONLY
				// if (tbl_name = "#levered-analysis ") {
				
				// WIP NOTES =======================================================================================
					// In order for the Levered table to work correctly, you first need to include a "RS_Less_Debt_Service" row.
					// The issue is that since the child numbers are hard coded, and we are currently just looping through the main RSgenerator function again with a diff table name,
					// the insertion of a new row will mess up all subsequent generated rows.  TO DO: Replace hard coded values with variable and increment through. 
				
				// $(tbl_name +'tbody tr:nth-child(2)').append(
				// 	"<td class= 'RS_Less_Debt_Service'>-$100,000</td>");

				//RS_Net_Cash_Flow_from_Operations - Levered
					// $(tbl_name +'tbody tr:nth-child(3)').append(
					// 	"<td class= 'RS_Net_Cash_Flow_from_Operations'>" +
					// 	FormatCurrency(
					// 	 pFloat(tbl_name +'td.RS_Net_Operating_Income:last') +
					// 	 pFloat(tbl_name +'td.RS_Less_Capital_Expenditures:last') +
					// 	 pFloat(tbl_name +'td.RS_Less_Debt_Service:last')
					// 	) + "</td>");

					//RS_Net_Cash_Flow_from_Operations - Unlevered
					$(tbl_name +'tbody tr:nth-child(3)').append(
						"<td class= 'RS_Net_Cash_Flow_from_Operations'>" +
						FormatCurrency(
						 pFloat(tbl_name +'td.RS_Net_Operating_Income:last') +
						 pFloat(tbl_name +'td.RS_Less_Capital_Expenditures:last')
						) + "</td>");

				//Filler line
				$(tbl_name +'tbody tr:nth-child(4)').append("<td></td>");

				//RS_Gross_Sale_Proceeds
				if (i == g.saleYear+1) {
					$(tbl_name +'tbody tr:nth-child(5)').append(
					"<td class= 'RS_Gross_Sale_Proceeds'>" +
					FormatCurrency(
					 pFloat('#Proforma tbody td.PF_Net_Operating_Income:last') / (g.terminalCapRate/100)
					) + "</td>");
				} else {
					$(tbl_name +'tbody tr:nth-child(5)').append(
					"<td class= 'RS_Gross_Sale_Proceeds'>$0.00</td>");
				}
				//RS_Sales_Costs
				if (pFloat(tbl_name +'tbody td.RS_Gross_Sale_Proceeds:last') > 0) {
					$(tbl_name +'tbody tr:nth-child(6)').append(
					"<td class= 'RS_Sales_Costs'>" +
					FormatCurrency(
					 pFloat(tbl_name +'tbody td.RS_Gross_Sale_Proceeds:last') * (g.salesCosts/100) * -1
					) + "</td>");
				} else {
					$(tbl_name +'tbody tr:nth-child(6)').append(
					"<td class= 'RS_Sales_Costs'>$0.00</td>");
				}
				//RS_Net_Sales_Proceeds
				$(tbl_name +'tbody tr:nth-child(7)').append(
					"<td class= 'RS_Net_Sales_Proceeds'>" +
					FormatCurrency(
					 pFloat(tbl_name +'td.RS_Gross_Sale_Proceeds:last')  +
					 pFloat(tbl_name +'td.RS_Sales_Costs:last')
					) + "</td>");

				//filler line
				$(tbl_name +'tbody tr:nth-child(8)').append("<td></td>");
				
				//RS_Net_Cash_Flow_from_Operations2
				$(tbl_name +'tbody tr:nth-child(9)').append(
					"<td class= 'RS_Net_Cash_Flow_from_Operations2'>" +
					FormatCurrency(
					 pFloat(tbl_name +'td.RS_Net_Operating_Income:last') +
					 pFloat(tbl_name +'td.RS_Less_Capital_Expenditures:last')
					) + "</td>");	
				//RS_Net_Sales_Proceeds2
				$(tbl_name +'tbody tr:nth-child(10)').append(
					"<td class= 'RS_Net_Sales_Proceeds2'>" +
					FormatCurrency(
					 pFloat(tbl_name +'td.RS_Gross_Sale_Proceeds:last')  +
					 pFloat(tbl_name +'td.RS_Sales_Costs:last')
					) + "</td>");

				//filler line
				$(tbl_name +'tbody tr:nth-child(11)').append("<td></td>");
				
				//RS_Total_Cash_Flows
				$(tbl_name +'tbody tr:nth-child(12)').append(
					"<td class= 'RS_Total_Cash_Flows'>" +
					FormatCurrency(
					 pFloat(tbl_name +'.RS_Net_Sales_Proceeds2 td:nth-child('+ (i+1) +')')  +
					 pFloat(tbl_name +'.RS_Net_Cash_Flow_from_Operations2 td:nth-child('+ (i+1) +')')
					) + "</td>");


			} //end else
		}; //end for loop
	}; //end RSgenerator

	RSgenerator("#unlevered-analysis ");
	RSgenerator("#levered-analysis ");


} //end myApp.returnSummary function
