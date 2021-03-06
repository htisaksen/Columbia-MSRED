

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
				$(tbl_name + ' thead tr:first').append("<th class= 'inputcenter RS_" + "year_" + (rsCounter-1) + "'>"+'YEAR '+ (rsCounter-1) +"</th>");

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
				$(tbl_name + ' thead tr:first').append("<th class= 'inputcenter' 'RS_" + "year_" + (rsCounter-1) + "'>"+'YEAR '+ (rsCounter-1) +"</th>");

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
		var strlist = "";
		var datalist = [];
		var datatotal = 0;
		var colLen = $(tbl + ' tbody td.' + row + '').length;
		for (i = 0; i <= colLen+2; ++i) {
			if (remSpcChr($(tbl + ' tbody td.' + row + ':nth-child(' + i + ')').text()) === "") {
				continue;
			};
			datatotal += pFloat(tbl + ' tbody td.' + row + ':nth-child(' + i + ')');
			datalist.push(pFloat(tbl + ' tbody td.' + row + ':nth-child(' + i + ')'));
			strlist += pFloat(tbl + ' tbody td.' + row + ':nth-child(' + i + ')') + ",";
		}

		return {
			"datalist": datalist,
			"datatotal": datatotal,
			"strlist": strlist
		}
	}; //end rsRowData

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

	//CORRECT VARIABLE:
	var UL_IRR = IRRCalc(rsRowData('#unlevered-analysis','RS_Total_Cash_Flows').datalist);
	var L_IRR = IRRCalc(rsRowData('#levered-analysis','RS_Total_Cash_Flows').datalist);

	//TESTING PURPOSES--------------------
	// var UL_IRR = 9.00225699541361;
	// var L_IRR = 14.149852233922;
	//-------------------------------------
	$('#RSUL_IRR').text(FormatPercent2(UL_IRR));
	$('#RSL_IRR').text(FormatPercent2(L_IRR));

	//Equity Multiple
	var UL_EM = EquityMult(rsRowData('#unlevered-analysis','RS_Total_Cash_Flows').datalist);
	$('#RSUL_Equity_Multiple').text(UL_EM);
	var U_EM = EquityMult(rsRowData('#levered-analysis','RS_Total_Cash_Flows').datalist);
	$('#RSL_Equity_Multiple').text(U_EM);

	//NPV Calculations
	var UL_NPV_IRR_CF = finance.NPV(UL_IRR,rsRowData('#unlevered-analysis','RS_Net_Cash_Flow_from_Operations2').datalist);
	var L_NPV_IRR_CF = finance.NPV(L_IRR,rsRowData('#levered-analysis','RS_Net_Cash_Flow_from_Operations2').datalist);
	$('#RSUL_IRR_from_Cash_Flow_D').text(FormatCurrency(UL_NPV_IRR_CF));
	$('#RSL_IRR_from_Cash_Flow_D').text(FormatCurrency(L_NPV_IRR_CF));

	// IRR from Cash Flow, IRR from Reversion/Sale, Total - $
	var UL_NPV_IRR_RS = finance.NPV(UL_IRR,rsRowData('#unlevered-analysis','RS_Net_Sales_Proceeds2').datalist);
	var L_NPV_IRR_RS = finance.NPV(L_IRR,rsRowData('#levered-analysis','RS_Net_Sales_Proceeds2').datalist);
	$('#RSUL_IRR_from_ReversionSale_D').text(FormatCurrency(UL_NPV_IRR_RS));
	$('#RSL_IRR_from_ReversionSale_D').text(FormatCurrency(L_NPV_IRR_RS));
	$('#RSUL_Total_D').text(FormatCurrency(UL_NPV_IRR_RS+UL_NPV_IRR_CF));
	$('#RSL_Total_D').text(FormatCurrency(L_NPV_IRR_RS+L_NPV_IRR_CF));

	// IRR from Cash Flow, IRR from Reversion/Sale, Total - %
	$('#RSUL_IRR_from_Cash_Flow_P').text(FormatPercent2(UL_NPV_IRR_CF/(UL_NPV_IRR_RS+UL_NPV_IRR_CF)*100));
	$('#RSL_IRR_from_Cash_Flow_P').text(FormatPercent2(L_NPV_IRR_CF/(L_NPV_IRR_RS+L_NPV_IRR_CF)*100));
	$('#RSUL_IRR_from_ReversionSale_P').text(FormatPercent2(UL_NPV_IRR_RS/(UL_NPV_IRR_RS+UL_NPV_IRR_CF)*100));
	$('#RSL_IRR_from_ReversionSale_P').text(FormatPercent2(L_NPV_IRR_RS/(L_NPV_IRR_RS+L_NPV_IRR_CF)*100));
	$('#RSUL_Total_P').text(FormatPercent2(
		parseFloat(remSpcChr($('#RSUL_IRR_from_Cash_Flow_P').text()))
		+
		parseFloat(remSpcChr($('#RSUL_IRR_from_ReversionSale_P').text()))
		));
	$('#RSL_Total_P').text(FormatPercent2(
		parseFloat(remSpcChr($('#RSL_IRR_from_Cash_Flow_P').text()))
		+
		parseFloat(remSpcChr($('#RSL_IRR_from_ReversionSale_P').text()))
		));

	//IRR taken from Google Sheet


	// #UL_Present_Value
	var UL_RowDataTCF = rsRowData('#unlevered-analysis','RS_Total_Cash_Flows').datalist;
	UL_RowDataTCF.shift(); //removes first index (this first index is a negative num)
	var UL_Present_Value = finance.NPV(g.unleveredDiscountRate, UL_RowDataTCF);
	// #L_Present_Value
	var L_RowDataTCF = rsRowData('#levered-analysis','RS_Total_Cash_Flows').datalist;
	L_RowDataTCF.shift(); //removes first index (this first index is a negative num)
	var L_Present_Value = finance.NPV(g.leveredDiscountRate, L_RowDataTCF);

	//UL_IRR_from_Sale
	var UL_RowDataTCFsum = rsRowData('#unlevered-analysis','RS_Total_Cash_Flows').datatotal - rsRowData('#unlevered-analysis','RS_Total_Cash_Flows').datalist[0];

	//L_IRR_from_Sale
	var L_RowDataTCFsum = rsRowData('#levered-analysis','RS_Total_Cash_Flows').datatotal - rsRowData('#levered-analysis','RS_Total_Cash_Flows').datalist[0];



	// Dashboard - Returns Summary Table
	$('#UL_Net_Profit').text(FormatCurrency(rsRowData('#unlevered-analysis','RS_Total_Cash_Flows').datatotal));
	$('#UL_Present_Value').text(FormatCurrency(UL_Present_Value));
	$('#UL_Net_Present_Value').text(FormatCurrency(remSpcChr($('#UL_Present_Value').text()) - remSpcChr($('#PI_Total_Costs').text())));
	$('#UL_Equity_Multiple').text($('#RSUL_Equity_Multiple').text());
	$('#UL_IRR').text($('#RSUL_IRR').text());
	$('#UL_IRR_from_CF').text($('#RSUL_IRR_from_Cash_Flow_P').text());
	$('#UL_IRR_from_Sale').text($('#RSUL_IRR_from_ReversionSale_P').text());
	$('#UL_Cash_On_Cash').text(FormatPercent2(pFloat('#dashboard #Purchase_Information td#PI_Total_Costs')/UL_RowDataTCFsum*100));

	$('#L_Net_Profit').text(FormatCurrency(rsRowData('#levered-analysis','RS_Total_Cash_Flows').datatotal))
	$('#L_Present_Value').text(FormatCurrency(L_Present_Value))
	$('#L_Net_Present_Value').text(FormatCurrency(remSpcChr($('#L_Present_Value').text()) - remSpcChr($('#Equity_Total').text())));
	$('#L_Equity_Multiple').text($('#RSL_Equity_Multiple').text())
	$('#L_IRR').text($('#RSL_IRR').text())
	$('#L_IRR_from_CF').text($('#RSL_IRR_from_Cash_Flow_P').text());
	$('#L_IRR_from_Sale').text($('#RSL_IRR_from_ReversionSale_P').text());
	$('#L_Cash_On_Cash').text(FormatPercent2(pFloat('#dashboard #Sources_and_Uses td#Equity_Total')/L_RowDataTCFsum*100));


} //end myApp.returnsSummary function
