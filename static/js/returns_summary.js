// ============================================================================================================
//RETURNS SUMMARY Dynamic Table
// ============================================================================================================

myApp.returnsSummary = function(){
		var g = myApp.dashboard.getInputs();
		var FormatCurrency = myApp.utils.FormatCurrency;
		var pInt = myApp.utils.pInt;
		var pFloat = myApp.utils.pFloat;

		var rsCounter = g.saleYear;

	//Deletes all columns
		if (g.saleYear < rsCounter+1) {
			$('#unlevered-analysis thead tr th:not(:first)').each(function(){
				$(this).remove();
			});
			$('#unlevered-analysis tbody tr td').each(function(){
				$(this).remove();
			})
		};

		//Inserts number of columns based on Sale Year in Dashboard
		for(var i = 1; i < g.saleYear+2; ++i) {
			rsCounter = $('#unlevered-analysis .RS_Year_End th').length;

			if (i == 1){
				//Cost value grabbed
				$('#unlevered-analysis thead tr:first').append("<th>COSTS</th>");
				$('#unlevered-analysis tbody tr:not(:last)').each(function(){
					$(this).append("<td></td>");
				})
				$('#unlevered-analysis tbody tr:last').append("<td>" +
					FormatCurrency(pFloat('#dashboard #Purchase_Information td#PI_Total_Costs')*-1) +
					"</td>");

			} else {
			//All additional year data calculated based on Pro Forma table calculations ===================
				$('#unlevered-analysis thead tr:first').append("<th class= 'RS_" + "year_" + (rsCounter-1) + "'>"+'YEAR '+ (rsCounter-1) +"</th>");

				//RS_Net_Operating_Income
				$('#unlevered-analysis tbody tr:nth-child(1)').append(
					"<td class= 'RS_Net_Operating_Income'>" +
					FormatCurrency(
					 pFloat('#Proforma tbody td.PF_Net_Operating_Income:nth-child('+ i +')')) +
					"</td>");
				//RS_Less_Capital_Expenditures
				$('#unlevered-analysis tbody tr:nth-child(2)').append(
					"<td class= 'RS_Less_Capital_Expenditures'>" +
					FormatCurrency(
					 pFloat('#Proforma tbody td.PF_Capital_Expenditures:nth-child('+ i +')')*-1) +
					"</td>");
				//RS_Net_Cash_Flow_from_Operations
				$('#unlevered-analysis tbody tr:nth-child(3)').append(
					"<td class= 'RS_Net_Cash_Flow_from_Operations'>" +
					FormatCurrency(
					 pFloat('#unlevered-analysis td.RS_Net_Operating_Income:last') +
					 pFloat('#unlevered-analysis td.RS_Less_Capital_Expenditures:last')
					) + "</td>");				
				
				//Filler line
				$('#unlevered-analysis tbody tr:nth-child(4)').append("<td></td>");

				//RS_Gross_Sale_Proceeds
				if (i == g.saleYear+1) {
					$('#unlevered-analysis tbody tr:nth-child(5)').append(
					"<td class= 'RS_Gross_Sale_Proceeds'>" +
					FormatCurrency(
					 pFloat('#Proforma tbody td.PF_Net_Operating_Income:last') / (g.terminalCapRate/100)
					) + "</td>");
				} else {
					$('#unlevered-analysis tbody tr:nth-child(5)').append(
					"<td class= 'RS_Gross_Sale_Proceeds'>$0.00</td>");
				}
				//RS_Sales_Costs
				if (pFloat('#unlevered-analysis tbody td.RS_Gross_Sale_Proceeds:last') > 0) {
					$('#unlevered-analysis tbody tr:nth-child(6)').append(
					"<td class= 'RS_Sales_Costs'>" +
					FormatCurrency(
					 pFloat('#unlevered-analysis tbody td.RS_Gross_Sale_Proceeds:last') * (g.salesCosts/100) * -1
					) + "</td>");
				} else {
					$('#unlevered-analysis tbody tr:nth-child(6)').append(
					"<td class= 'RS_Sales_Costs'>$0.00</td>");
				}
				//RS_Net_Sales_Proceeds
				$('#unlevered-analysis tbody tr:nth-child(7)').append(
					"<td class= 'RS_Net_Sales_Proceeds'>" +
					FormatCurrency(
					 pFloat('#unlevered-analysis td.RS_Gross_Sale_Proceeds:last')  +
					 pFloat('#unlevered-analysis td.RS_Sales_Costs:last')
					) + "</td>");

				//filler line
				$('#unlevered-analysis tbody tr:nth-child(8)').append("<td></td>");
				
				//RS_Net_Cash_Flow_from_Operations2
				$('#unlevered-analysis tbody tr:nth-child(9)').append(
					"<td class= 'RS_Net_Cash_Flow_from_Operations2'>" +
					FormatCurrency(
					 pFloat('#unlevered-analysis td.RS_Net_Operating_Income:last') +
					 pFloat('#unlevered-analysis td.RS_Less_Capital_Expenditures:last')
					) + "</td>");	
				//RS_Net_Sales_Proceeds2
				$('#unlevered-analysis tbody tr:nth-child(10)').append(
					"<td class= 'RS_Net_Sales_Proceeds2'>" +
					FormatCurrency(
					 pFloat('#unlevered-analysis td.RS_Gross_Sale_Proceeds:last')  +
					 pFloat('#unlevered-analysis td.RS_Sales_Costs:last')
					) + "</td>");

				//filler line
				$('#unlevered-analysis tbody tr:nth-child(11)').append("<td></td>");
				
				//RS_Total_Cash_Flows
				$('#unlevered-analysis tbody tr:nth-child(12)').append(
					"<td class= 'RS_Total_Cash_Flows'>" +
					FormatCurrency(
					 pFloat('#unlevered-analysis .RS_Net_Sales_Proceeds2 td:nth-child('+ (i+1) +')')  +
					 pFloat('#unlevered-analysis .RS_Net_Cash_Flow_from_Operations2 td:nth-child('+ (i+1) +')')
					) + "</td>");


			} //end else
		}; //end for loop

} //end myApp.returnSummary function
