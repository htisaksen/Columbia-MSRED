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
				console.log("Removed thead row");
			});
			$('#unlevered-analysis tbody tr td').each(function(){
				$(this).remove();
				console.log("Removed tbody row");
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
				$('#unlevered-analysis tbody tr:last').append("<td>Value</td>");

			} else {
			//All additional year data calculated based on Pro Forma table calculations ===================
				$('#unlevered-analysis thead tr:first').append("<th class= 'RS_" + "year_" + (rsCounter-1) + "'>"+'YEAR '+ (rsCounter-1) +"</th>");
				
				//RS_Net_Operating_Income
				$('#unlevered-analysis tbody tr:nth-child(1)').append(
					"<td class= 'RS_Net_Operating_Income'>" +
					pFloat('#unlevered-analysis .RS_Net_Operating_Income td:nth-child('+ (i+1) +')')  *
					(1+($('#year_row_' + i + ' .mkt_rent_revenue').val())/100)) +
					"</td>";
				//RS_Less_Capital_Expenditures
				$('#unlevered-analysis tbody tr:nth-child(2)').append(
					"<td class= 'RS_Less_Capital_Expenditures'>" +
					pFloat('#unlevered-analysis .RS_Less_Capital_Expenditures td:nth-child('+ (i+1) +')')  *
					(1+($('#year_row_' + i + ' .mkt_rent_revenue').val())/100)) +
					"</td>";
				//RS_Net_Cash_Flow_from_Operations
				$('#unlevered-analysis tbody tr:nth-child(3)').append(
					"<td class= 'RS_Net_Cash_Flow_from_Operations'>" +
					
					 pFloat('.RS_Rental_Income td:nth-child('+ (i+1) +')') +
					 pFloat('.RS_Other_Income td:nth-child('+ (i+1) +')')
					) + "</td>";
				
				$('#unlevered-analysis tbody tr:nth-child(4)').append("<td></td>");

				//RS_Gross_Sale_Proceeds
				$('#unlevered-analysis tbody tr:nth-child(5)').append(
					"<td class= 'RS_Gross_Sale_Proceeds'>(" +
					pFloat('#unlevered-analysis .RS_Less_Vacancy td:nth-child('+ (i+1) +')')  *
					(1+($('#year_row_' + i + ' .mkt_rent_vacancy').val())/100)) +
					")</td>";
				//RS_Sales_Costs
				$('#unlevered-analysis tbody tr:nth-child(6)').append(
					"<td class= 'RS_Sales_Costs'>(" +
					pFloat('#unlevered-analysis .RS_Less_Concessions td:nth-child('+ (i+1) +')')  *
					(1+($('#year_row_' + i + ' .mkt_rent_concessions').val())/100)) +
					")</td>";
				//RS_Net_Sales_Proceeds
				$('#unlevered-analysis tbody tr:nth-child(7)').append(
					"<td class= 'RS_Net_Sales_Proceeds'>(" +
					pFloat('#unlevered-analysis .RS_Less_Credit_Loss td:nth-child('+ (i+1) +')')  *
					(1+($('#year_row_' + i + ' .mkt_rent_credit_loss').val())/100)) +
					")</td>";
				
				$('#unlevered-analysis tbody tr:nth-child(8)').append("<td></td>");
				//RS_Net_Cash_Flow_from_Operations2
				$('#unlevered-analysis tbody tr:nth-child(9)').append(
					"<td class= 'RS_Net_Cash_Flow_from_Operations2'>" +
					pFloat('#unlevered-analysis .RS_Real_Estate_Taxes td:nth-child('+ (i+1) +')')  *
					(1+($('#year_row_' + i + ' .mkt_rent_expenses').val())/100)) +
					"</td>";
				//RS_Net_Sales_Proceeds2
				$('#unlevered-analysis tbody tr:nth-child(10)').append(
					"<td class= 'RS_Net_Sales_Proceeds2'>" +
					pFloat('#unlevered-analysis .RS_Real_Estate_Taxes td:nth-child('+ (i+1) +')')  *
					(1+($('#year_row_' + i + ' .mkt_rent_expenses').val())/100)) +
					"</td>";

				$('#unlevered-analysis tbody tr:nth-child(11)').append("<td></td>");
				//RS_Total_Cash_Flows
				$('#unlevered-analysis tbody tr:nth-child(12)').append(
					"<td class= 'RS_Total_Cash_Flows'>" +
					pFloat('#unlevered-analysis .RS_Insurance td:nth-child('+ (i+1) +')')  *
					(1+($('#year_row_' + i + ' .mkt_rent_expenses').val())/100)) +
					"</td>";

			} //end else
		}; //end for loop

} //end myApp.returnSummary function