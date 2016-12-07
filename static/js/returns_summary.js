
// ============================================================================================================
//RETURNS SUMMARY Dynamic Table
// ============================================================================================================

myApp.returnsSummary = function(){
		var g = myApp.dashboard.getInputs();
		var finance = new Finance();
		var FormatCurrency = myApp.utils.FormatCurrency;
		var pInt = myApp.utils.pInt;
		var pFloat = myApp.utils.pFloat;
		var remSpcChr = myApp.utils.remSpcChr;
		var IRRCalc = myApp.utils.IRRCalc;
		var FormatPercent2 = myApp.utils.FormatPercent2;
		var roundTwoDec = myApp.utils.roundTwoDec;

		var rsCounter = g.saleYear;
		var intRate = g.interestRateOnMortgage/100;



// ===========================================================================================================
//Generates Unlevered table
// ===========================================================================================================
	var RSgeneratorUL = function(tbl_name){
	//Deletes all columns
		if (g.saleYear < rsCounter+1) {
			$(tbl_name + ' thead tr th:not(:first)').each(function(){
				$(this).remove();
			});
			$(tbl_name + ' tbody tr td').each(function(){
				$(this).remove();
			})
		};

		//Inserts number of columns based on Sale Year in Dashboard
		for(var i = 1; i < g.saleYear+2; ++i) {
			rsCounter = $(tbl_name + ' .RS_Year_End th').length;

			if (i == 1){
				//Cost value grabbed
				$(tbl_name + ' thead tr:first').append("<th>COSTS</th>");
				$(tbl_name + ' tbody tr:not(:last)').each(function(){
					$(this).append("<td></td>");
				})
				$(tbl_name + ' tbody tr:last').append("<td class = 'RS_Total_Cash_Flows'>" +
					FormatCurrency(pFloat('#dashboard #Purchase_Information td#PI_Total_Costs')*-1) +
					"</td>");

			} else {
			//All additional year data calculated based on Pro Forma table calculations ===================
				$(tbl_name + ' thead tr:first').append("<th class= 'RS_" + "year_" + (rsCounter-1) + "'>"+'YEAR '+ (rsCounter-1) +"</th>");

				//RS_Net_Operating_Income
				$(tbl_name + ' tbody tr:nth-child(1)').append(
					"<td class= 'RS_Net_Operating_Income'>" +
					FormatCurrency(
					 pFloat('#Proforma tbody td.PF_Net_Operating_Income:nth-child('+ i +')')) +
					"</td>");
				//RS_Less_Capital_Expenditures
				$(tbl_name + ' tbody tr:nth-child(2)').append(
					"<td class= 'RS_Less_Capital_Expenditures'>" +
					FormatCurrency(
					 pFloat('#Proforma tbody td.PF_Capital_Expenditures:nth-child('+ i +')')*-1) +
					"</td>");
				//RS_Net_Cash_Flow_from_Operations
				$(tbl_name + ' tbody tr:nth-child(3)').append(
					"<td class= 'RS_Net_Cash_Flow_from_Operations'>" +
					FormatCurrency(
					 pFloat(tbl_name + ' td.RS_Net_Operating_Income:last') +
					 pFloat(tbl_name + ' td.RS_Less_Capital_Expenditures:last')
					) + "</td>");

				//Filler line
				$(tbl_name + ' tbody tr:nth-child(4)').append("<td></td>");

				//RS_Gross_Sale_Proceeds
				if (i == g.saleYear+1) {
					$(tbl_name + ' tbody tr:nth-child(5)').append(
					"<td class= 'RS_Gross_Sale_Proceeds'>" +
					FormatCurrency(
					 pFloat('#Proforma tbody td.PF_Net_Operating_Income:last') / (g.terminalCapRate)
					) + "</td>");
				} else {
					$(tbl_name + ' tbody tr:nth-child(5)').append(
					"<td class= 'RS_Gross_Sale_Proceeds'>$0.00</td>");
				}
				//RS_Sales_Costs
				if (pFloat(tbl_name + ' tbody td.RS_Gross_Sale_Proceeds:last') > 0) {
					$(tbl_name + ' tbody tr:nth-child(6)').append(
					"<td class= 'RS_Sales_Costs'>" +
					FormatCurrency(
					 pFloat(tbl_name + ' tbody td.RS_Gross_Sale_Proceeds:last') * (g.salesCosts/100) * -1
					) + "</td>");
				} else {
					$(tbl_name + ' tbody tr:nth-child(6)').append(
					"<td class= 'RS_Sales_Costs'>$0.00</td>");
				}
				//RS_Net_Sales_Proceeds
				$(tbl_name + ' tbody tr:nth-child(7)').append(
					"<td class= 'RS_Net_Sales_Proceeds'>" +
					FormatCurrency(
					 pFloat(tbl_name + ' td.RS_Gross_Sale_Proceeds:last')  +
					 pFloat(tbl_name + ' td.RS_Sales_Costs:last')
					) + "</td>");

				//filler line
				$(tbl_name + ' tbody tr:nth-child(8)').append("<td></td>");

				//RS_Net_Cash_Flow_from_Operations2
				$(tbl_name + ' tbody tr:nth-child(9)').append(
					"<td class= 'RS_Net_Cash_Flow_from_Operations2'>" +
					FormatCurrency(
					 pFloat(tbl_name + ' td.RS_Net_Operating_Income:last') +
					 pFloat(tbl_name + ' td.RS_Less_Capital_Expenditures:last')
					) + "</td>");
				//RS_Net_Sales_Proceeds2
				$(tbl_name + ' tbody tr:nth-child(10)').append(
					"<td class= 'RS_Net_Sales_Proceeds2'>" +
					FormatCurrency(
					 pFloat(tbl_name + ' td.RS_Gross_Sale_Proceeds:last')  +
					 pFloat(tbl_name + ' td.RS_Sales_Costs:last')
					) + "</td>");

				//filler line
				$(tbl_name + ' tbody tr:nth-child(11)').append("<td></td>");

				//RS_Total_Cash_Flows
				$(tbl_name + ' tbody tr:nth-child(12)').append(
					"<td class= 'RS_Total_Cash_Flows'>" +
					FormatCurrency(
					 pFloat(tbl_name + ' .RS_Net_Sales_Proceeds2 td:nth-child('+ (i+1) +')')  +
					 pFloat(tbl_name + ' .RS_Net_Cash_Flow_from_Operations2 td:nth-child('+ (i+1) +')')
					) + "</td>");


			} //end else
		}; //end for loop
	}; //end RSgeneratorUL

// ===========================================================================================================
//Generates Levered table with additional rows
// ===========================================================================================================
	var RSgeneratorL = function(tbl_name){
	//Deletes all columns
		if (g.saleYear < rsCounter+1) {
			$(tbl_name + ' thead tr th:not(:first)').each(function(){
				$(this).remove();
			});
			$(tbl_name + ' tbody tr td').each(function(){
				$(this).remove();
			})
		};

		//Inserts number of columns based on Sale Year in Dashboard
		for(var i = 1; i < g.saleYear+2; ++i) {
			rsCounter = $(tbl_name + ' .RS_Year_End th').length;

			if (i == 1){
				//Cost value grabbed
				$(tbl_name + ' thead tr:first').append("<th>EQUITY</th>");
				$(tbl_name + ' tbody tr:not(:last)').each(function(){
					$(this).append("<td></td>")
				});
				$(tbl_name + ' tbody tr:last').append("<td class = 'RS_Total_Cash_Flows'>" +
					FormatCurrency(pFloat('#dashboard #Sources_and_Uses td#Equity_Total')*-1) +
					"</td>");

			} else {
			//All additional year data calculated based on Pro Forma table calculations ===================
				$(tbl_name + ' thead tr:first').append("<th class= 'RS_" + "year_" + (rsCounter-1) + "'>"+'YEAR '+ (rsCounter-1) +"</th>");

				//RS_Net_Operating_Income
				$(tbl_name + ' tbody tr:nth-child(1)').append(
					"<td class= 'RS_Net_Operating_Income'>" +
					FormatCurrency(
					 pFloat('#Proforma tbody td.PF_Net_Operating_Income:nth-child('+ i +')')) +
					"</td>");
				//RS_Less_Capital_Expenditures
				$(tbl_name + ' tbody tr:nth-child(2)').append(
					"<td class= 'RS_Less_Capital_Expenditures'>" +
					FormatCurrency(
					 pFloat('#Proforma tbody td.PF_Capital_Expenditures:nth-child('+ i +')')*-1) +
					"</td>");
				// RS_Less_Debt_Service - LEVERED ONLY


				$(tbl_name + ' tbody tr:nth-child(3)').append(
					"<td class= 'RS_Less_Debt_Service'>" +
					FormatCurrency(
					 remSpcChr($('#Loan_Total').text()) * intRate * -1)
					 + "</td>");

				//RS_Net_Cash_Flow_from_Operations
				$(tbl_name + ' tbody tr:nth-child(4)').append(
						"<td class= 'RS_Net_Cash_Flow_from_Operations'>" +
						FormatCurrency(
						 pFloat(tbl_name + ' td.RS_Net_Operating_Income:last') +
						 pFloat(tbl_name + ' td.RS_Less_Capital_Expenditures:last') +
						 pFloat(tbl_name + ' td.RS_Less_Debt_Service:last')
						) + "</td>");

				//Filler line
				$(tbl_name + ' tbody tr:nth-child(5)').append("<td></td>");

				//RS_Gross_Sale_Proceeds
				if (i == g.saleYear + 1) {
					$(tbl_name + ' tbody tr:nth-child(6)').append(
					"<td class= 'RS_Gross_Sale_Proceeds'>" +
					FormatCurrency(
					 pFloat('#Proforma tbody td.PF_Net_Operating_Income:last') / (g.terminalCapRate)
					) + "</td>");
				} else {
					$(tbl_name + ' tbody tr:nth-child(6)').append(
					"<td class= 'RS_Gross_Sale_Proceeds'>$0.00</td>");
				}
				//RS_Sales_Costs
				if (pFloat(tbl_name + ' tbody td.RS_Gross_Sale_Proceeds:last') > 0) {
					$(tbl_name + ' tbody tr:nth-child(7)').append(
					"<td class= 'RS_Sales_Costs'>" +
					FormatCurrency(
					 pFloat(tbl_name + ' tbody td.RS_Gross_Sale_Proceeds:last') * (g.salesCosts/100) * -1
					) + "</td>");
				} else {
					$(tbl_name + ' tbody tr:nth-child(7)').append(
					"<td class= 'RS_Sales_Costs'>$0.00</td>");
				}
				//RS_Less_Oustanding_Mortgage - LEVERED ONLY
				if (i == g.saleYear + 1) {
					$(tbl_name + ' tbody tr:nth-child(8)').append(
					"<td class= 'RS_Less_Oustanding_Mortgage'>" +
					FormatCurrency(
					 remSpcChr($('#Loan_Total').text()) * -1
					) + "</td>");
				} else {
					$(tbl_name + ' tbody tr:nth-child(8)').append(
					"<td class= 'RS_Less_Oustanding_Mortgage'>$0.00</td>");
				};

				//RS_Net_Sales_Proceeds
				$(tbl_name + ' tbody tr:nth-child(9)').append(
					"<td class= 'RS_Net_Sales_Proceeds'>" +
					FormatCurrency(
					 pFloat(tbl_name + ' td.RS_Gross_Sale_Proceeds:last')  +
					 pFloat(tbl_name + ' td.RS_Sales_Costs:last') +
					 pFloat(tbl_name + ' td.RS_Less_Oustanding_Mortgage:last')
					) + "</td>");

				//filler line
				$(tbl_name + ' tbody tr:nth-child(10)').append("<td></td>");

				//RS_Net_Cash_Flow_from_Operations2
				$(tbl_name + ' tbody tr:nth-child(11)').append(
					"<td class= 'RS_Net_Cash_Flow_from_Operations2'>" +
					FormatCurrency(
					 pFloat(tbl_name + ' td.RS_Net_Operating_Income:last') +
					 pFloat(tbl_name + ' td.RS_Less_Capital_Expenditures:last') +
					 pFloat(tbl_name + ' td.RS_Less_Debt_Service:last')
					) + "</td>");
				//RS_Net_Sales_Proceeds2
				$(tbl_name + ' tbody tr:nth-child(12)').append(
					"<td class= 'RS_Net_Sales_Proceeds2'>" +
					FormatCurrency(
					 pFloat(tbl_name + ' td.RS_Gross_Sale_Proceeds:last')  +
					 pFloat(tbl_name + ' td.RS_Sales_Costs:last') +
					 pFloat(tbl_name + ' td.RS_Less_Oustanding_Mortgage:last')
					) + "</td>");

				//filler line
				$(tbl_name + ' tbody tr:nth-child(13)').append("<td></td>");

				//RS_Total_Cash_Flows
				$(tbl_name + ' tbody tr:nth-child(14)').append(
					"<td class= 'RS_Total_Cash_Flows'>" +
					FormatCurrency(
					 pFloat(tbl_name + ' .RS_Net_Sales_Proceeds2 td:nth-child('+ (i+1) +')')  +
					 pFloat(tbl_name + ' .RS_Net_Cash_Flow_from_Operations2 td:nth-child('+ (i+1) +')')
					) + "</td>");


			} //end else
		}; //end for loop
	}; //end RSgeneratorL


// Builds Levered and Unlevered tables ------------------------------------------------
	RSgeneratorUL("#unlevered-analysis");
	RSgeneratorL("#levered-analysis");



// ===========================================================================================================
// IRR calculations
// ===========================================================================================================
	//returns an array of a specific row from a specific table (table and row name are used as parameters)
	var rsRowData = function(tbl, row){
		var templist = [];
		var temptotal = 0;
		var colLen = $(tbl + ' tbody td.' + row + '').length;
		for (i = 0; i <= colLen+2; ++i) {
			if (remSpcChr($(tbl + ' tbody td.' + row + ':nth-child(' + i + ')').text()) === "") {
				continue;
			};
			temptotal += pFloat(tbl + ' tbody td.' + row + ':nth-child(' + i + ')');
			templist.push(pFloat(tbl + ' tbody td.' + row + ':nth-child(' + i + ')'));
		}


		return templist
	} //end rsRowData

	// Equity Multiple formula
	var EquityMult = function(EArray){


		var posTotal = 0, negTotal = 0;
		for (i = 0; i < EArray.length; i++){

			if (EArray[i] > 0) {
				posTotal += EArray[i];
			} else {
				negTotal += EArray[i];
			};
		}



		return (roundTwoDec(posTotal/(negTotal * -1)))
	}; //end EquityMult


// ------------------------------------------------------------------------

	// IRR values calculations
	// Description: variables grab Return Summary row data for parameters, calculates the IRR, and then rounds the # to 2 decimal points
	var UL_IRR = FormatPercent2(IRRCalc(rsRowData('#unlevered-analysis','RS_Total_Cash_Flows')));
	$('#RSUL_IRR').text(UL_IRR);
	var L_IRR = FormatPercent2(IRRCalc(rsRowData('#levered-analysis','RS_Total_Cash_Flows')));
	$('#RSL_IRR').text(L_IRR);

	// Equity Multiple Calculations
	var UL_EM = EquityMult(rsRowData('#unlevered-analysis','RS_Total_Cash_Flows'));
	$('#RSUL_Equity_Multiple').text(UL_EM);
	var U_EM = EquityMult(rsRowData('#levered-analysis','RS_Total_Cash_Flows'));
	$('#RSL_Equity_Multiple').text(U_EM);

	//NPV Calculations
	console.log(rsRowData('#unlevered-analysis','RS_Net_Cash_Flow_from_Operations2'))
	console.log(parseFloat(remSpcChr(UL_IRR)))
	var UL_NPV = finance.NPV(parseFloat(remSpcChr(UL_IRR)),0,rsRowData('#unlevered-analysis','RS_Net_Cash_Flow_from_Operations2'))
	console.log(finance.NPV(9,-0,1691479	,1745223 	,1800580 	,1857597 	,1916325 	,1976815 	,2039120 	,2103293 	,2169392 	,2237474 ))


} //end myApp.returnsSummary function
