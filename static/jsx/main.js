'use strict';
// Math.round(num * 100) / 100
$(document).ready(function(){

//TESTING PURPOSES @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
	$('#Rental_Rate_Assumptions').find('tbody')
		.append($("<tr class = 'rent_row'>")
		.append($("<td>").html("<input type='text' name='proj_rents' class='proj_rents' placeholder='Project Rents' value='1 Bed/1 Bath'></td>"))
		.append($("<td>").html("<input type='number' name='total_units' class='total_units' placeholder='Total Units' value='50'></td>"))
		.append($("<td class = 'total_sf'></td>").text("0"))
		.append($("<td>").html("<input type='number' name='avg_sf_per_unit' class='avg_sf_per_unit' placeholder='Avg SF Per Unit' value='662'></td>"))
		.append($("<td class = 'rent_per_sf'></td>").text("$0.00"))
		.append($("<td>").html("<input type='number' name='rent_per_unit' class='rent_per_unit' placeholder='Rent Per Unit' value='1100'></td>"))
		)
	$('#Rental_Rate_Assumptions').find('tbody')
		.append($("<tr class = 'rent_row'>")
		.append($("<td>").html("<input type='text' name='proj_rents' class='proj_rents' placeholder='Project Rents' value='2 Bed/1 Bath'></td>"))
		.append($("<td>").html("<input type='number' name='total_units' class='total_units' placeholder='Total Units' value='75'></td>"))
		.append($("<td class = 'total_sf'></td>").text("0"))
		.append($("<td>").html("<input type='number' name='avg_sf_per_unit' class='avg_sf_per_unit' placeholder='Avg SF Per Unit' value='1041'></td>"))
		.append($("<td class = 'rent_per_sf'></td>").text("$0.00"))
		.append($("<td>").html("<input type='number' name='rent_per_unit' class='rent_per_unit' placeholder='Rent Per Unit' value='1400'></td>"))
		)
	$('#Rental_Rate_Assumptions').find('tbody')
		.append($("<tr class = 'rent_row'>")
		.append($("<td>").html("<input type='text' name='proj_rents' class='proj_rents' placeholder='Project Rents' value='2 Bed/2 Bath'></td>"))
		.append($("<td>").html("<input type='number' name='total_units' class='total_units' placeholder='Total Units' value='75'></td>"))
		.append($("<td class = 'total_sf'></td>").text("0"))
		.append($("<td>").html("<input type='number' name='avg_sf_per_unit' class='avg_sf_per_unit' placeholder='Avg SF Per Unit' value='1185'></td>"))
		.append($("<td class = 'rent_per_sf'></td>").text("$0.00"))
		.append($("<td>").html("<input type='number' name='rent_per_unit' class='rent_per_unit' placeholder='Rent Per Unit' value='1800'></td>"))
		)
//END TESTING PURPOSES @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@




// //Javascript Rental Rate Assumptions first insert row -------------------------------------------
// 	$('#Rental_Rate_Assumptions').find('tbody')
// 		.append($("<tr class = 'rent_row'>")
// 		.append($("<td>").html("<input type='text' name='proj_rents' class='proj_rents' placeholder='Project Rents'></td>"))
// 		.append($("<td>").html("<input type='number' name='total_units' class='total_units' placeholder='Total Units'></td>"))
// 		.append($("<td class = 'total_sf'></td>").text("0"))
// 		.append($("<td>").html("<input type='number' name='avg_sf_per_unit' class='avg_sf_per_unit' placeholder='Avg SF Per Unit'></td>"))
// 		.append($("<td class = 'rent_per_sf'></td>").text("$0.00"))
// 		.append($("<td>").html("<input type='number' name='rent_per_unit' class='rent_per_unit' placeholder='Rent Per Unit'></td>"))
// 		)
//Javascript Market Rental Rate Assumptions first insert row -------------------------------------------
	$('#Market_Rental_Assumptions').find('tbody')
		.append($("<tr class = 'year_row' id='year_row_1'>")
		.append($("<td>Year 1</td>"))
		.append($("<td></td>"))
		.append($("<td>").html("<input type='number' name='mkt_rent_revenue' class='mkt_rent_revenue' placeholder='Revenue (%)'></td>"))
		.append($("<td>").html("<input type='number' name='mkt_rent_expenses' class='mkt_rent_expenses' placeholder='Expenses (%)'></td>"))
		.append($("<td>").html("<input type='number' name='mkt_rent_vacancy' class='mkt_rent_vacancy' placeholder='Vacancy (%)'></td>"))
		.append($("<td>").html("<input type='number' name='mkt_rent_concessions' class='mkt_rent_concessions' placeholder='Concessions (%)'></td>"))
		.append($("<td>").html("<input type='number' name='mkt_rent_credit_loss' class='mkt_rent_credit_loss' placeholder='Credit Loss (%)'></td>"))
		)





// ============================================================================================================
// Functions created for dashboard
// ============================================================================================================
//Returns int val of element

	var remSpcChr = function(value){
		return value.replace(/[&\/\\#,+()$~%'":*?<>{}]/g, '');
	}

	var roundOneDec = function(value){
		return Math.round(value * 10) / 10;
	};

	var roundTwoDec = function(value){
		return Math.round(value * 100) / 100;
	};

	var pFloat = function(value){
		return parseFloat($(value).text()|| 0)
	}

	var pInt = function(value){
		return parseInt($(value).text()|| 0)
	};

//runs function on a set time delay
	var debouncer = function(func, time) {
		var timeWindow = 500; //time in ms. waits this amount of time after the final click before running function
		var timeout;
		return function() {
			// var context = this;
			clearTimeout(timeout);
			timeout = setTimeout(function() {
				func();
			}, timeWindow)
		} //end function
	}; //end debouncer

	var nanCheck = function(value) {
		if(jQuery.isNumeric(value) === false){
			return 0
		}
		else{
			return value
		}
	};

	var numForCurrency = function(number) {
		return (new Intl.NumberFormat('en-EN', {style: 'currency', currency: 'USD' }).format(number))
	}
// ============================================================================================================



// ============================================================================================================
// Start of ALL calculations for dashboard
// ============================================================================================================

	var RRAlist = []; //Rental Rate Assumptions list
	var MRAlist = []; //Market Rental Assumptions list

	var DashboardInput = function(event){
	// Global objects: Inputs (possibly calculated values)
		var g = {
			analysisStartDate: $('#Analysis_Start_Date').val(),
			propertyName:	$('#Property_Name').val(),
			propertyLocation: $('#Property_Address').val(),
			propertyType: $('#Property_Type').val(),
			purchasePrice: parseInt($('#Purchase_Price').val()) || 0,
			closingCostPercentage: parseInt($('#Closing_Costs_Percentage').val())/100 || 0,
			saleYear: parseInt($('#Sale_Year').val()) || 0,
			terminalCapRate: parseInt($('#Terminal_Cap_Rate').val()) || 0,
			salesCosts: parseInt($('#Sales_Costs').val()) || 0,
			leverage: parseInt($('#Leverage').val())/100 || 0,
			interestRateOnMortgage: parseInt($('#Interest_Rate_on_Mortgage').val()) || 0,
			loanTerm: parseInt($('#Loan_Term').val()) || 0,
			loanAmortization: parseInt($('#Loan_Amortization').val()) || 0,
			unleveredDiscountRate: parseInt($('#UL_Discount_Rate').val()) || 0,
			leveredDiscountRate: parseInt($('#L_Discount_Rate').val()) || 0,
			otherIncomeTotal: parseInt($('#Other_Income_Total').val()) || 0,
			lessVacancy: parseInt($('#Less_Vacancy').val())/100 || 0,
			lessConcessions: parseInt($('#Less_Concessions').val())/100 || 0,
			lessCreditLoss: parseInt($('#Less_Credit_Loss').val())/100 || 0,
			realEstateTaxesTotal: parseInt($('#Real_Estate_Taxes_Total').val()) || 0,
			insuranceTotal: parseInt($('#Insurance_Total').val()) || 0,
			utilitiesTotal: parseInt($('#Utilities_Total').val()) || 0,
			payrollTotal: parseInt($('#Payroll_Total').val()) || 0,
			repairsAndMaintenanceTotal: parseInt($('#Repairs_and_Maintenance_Total').val()) || 0,
			contractServicesTotal: parseInt($('#Contract_Services_Total').val()) || 0,
			turnoverTotal: parseInt($('#Turnover_Total').val()) || 0,
			salesAndMarketingTotal: parseInt($('#Sales_and_Marketing_Total').val()) || 0,
			administrativeTotal: parseInt($('#Administrative_Total').val()) || 0,
			managementPercentage: parseInt($('#Management_Percentage').val())/100 || 0,
			replacementReservesPercentage: parseInt($('#Replacement_Reserves_Percentage').val())/100 || 0,
		};

		//VARIABLES FOR CALCULATIONS-------------------------------------------------------
		var tu = pInt('#Rental_Rate_Assumptions tfoot .total_units');
		var tsf = pInt('#Rental_Rate_Assumptions tfoot .total_sf');
		//--------------------------------------------------------------------------------

		//moved because infinity


		//Property Info Calculations
		$('#prop_info_total_num_units').text($('#Rental_Rate_Assumptions tfoot .total_units').text());
		$('#prop_info_total_sq_ft').text($('#Rental_Rate_Assumptions tfoot .total_sf').text());

		// //Purchase Info Calculations
		// $('#PI_Closing_Costs').text(nanCheck(g.purchasePrice*g.closingCostPercentage));
		// $('#PI_Total_Costs').text(nanCheck(g.purchasePrice+pInt('#PI_Closing_Costs')));
		// $('#PI_Purchase_Cost_Per_Unit').text(nanCheck(g.purchasePrice/pInt('#prop_info_total_num_units')));
		// $('#PI_Total_Cost_Per_Unit').text(nanCheck(pInt('#PI_Total_Costs')/pInt('#prop_info_total_num_units')));
		// $('#PI_Purchase_Cost_Per_SF').text(nanCheck(g.purchasePrice/pInt('#prop_info_total_sq_ft')));
		// $('#PI_Total_Cost_Per_SF').text(nanCheck(pInt('#PI_Total_Costs')/pInt('#prop_info_total_sq_ft')));
		// $('#PI_Cap_Rate_on_Purchase_Price').text(nanCheck(pInt('#Net_Operating_Income_Total')/g.purchasePrice));
		// $('#PI_Cap_Rate_on_Total_Price').text(nanCheck(pInt('#Net_Operating_Income_Total')/pInt('#PI_Total_Costs')));

		//Purchase Info Calculations
		$('#PI_Closing_Costs').text(
			nanCheck(g.purchasePrice*g.closingCostPercentage)
		);
		$('#PI_Total_Costs').text(
			nanCheck(g.purchasePrice+pInt('#PI_Closing_Costs'))
		);
		$('#PI_Purchase_Cost_Per_Unit').text(
			nanCheck(g.purchasePrice/pInt('#prop_info_total_num_units'))
		);
		$('#PI_Total_Cost_Per_Unit').text(
			nanCheck(pInt('#PI_Total_Costs')/pInt('#prop_info_total_num_units'))
		);
		//Math.round(num * 100) / 100
		$('#PI_Purchase_Cost_Per_SF').text(roundTwoDec(
			nanCheck(g.purchasePrice/pInt('#prop_info_total_sq_ft'))
		));
		$('#PI_Total_Cost_Per_SF').text(roundTwoDec(
			nanCheck(pInt('#PI_Total_Costs')/pInt('#prop_info_total_sq_ft'))
		));
		$('#PI_Cap_Rate_on_Purchase_Price').text(roundTwoDec(
			nanCheck(pInt('#Net_Operating_Income_Total')/g.purchasePrice)*100
		));
		$('#PI_Cap_Rate_on_Total_Price').text(roundTwoDec(
			nanCheck(pInt('#Net_Operating_Income_Total')/pInt('#PI_Total_Costs'))*100
		));


		//Sale Summary Calculations
		// // Sale_Price = 100       #{=HLOOKUP(Sale_Year+1,Proforma!C4:M30,27)/Terminal_Cap}
		// Sale_Price_Per_Unit = Sale_Price/Num_Units
		// Sale_Price_Per_SF = Sale_Price/Total_Sq_Ft


		//Sources and Uses Calculations
			//Equity
		$('#PI_Total_Cost_Per_Unit').text(roundTwoDec(nanCheck(pInt('#PI_Total_Costs')/pInt('#prop_info_total_num_units'))));
			//Loans
		$('#Loan_Total').text(roundTwoDec(nanCheck(pInt('#PI_Total_Costs')*g.leverage)));

			// #Sources And Uses Table
		$('#Equity_Total').text(roundTwoDec(nanCheck(pInt('#PI_Total_Costs') - pInt('#Loan_Total'))));
		$('#Equity_DollarPerUnit').text(roundTwoDec(nanCheck(pInt('#Equity_Total')/tu)));
		$('#Equity_DollarPerSF').text(roundTwoDec(nanCheck(pInt('#Equity_Total')/tsf)));
		$('#Equity_PercentofTotal').text(roundTwoDec(nanCheck(pFloat('#Equity_Total')/pFloat('#Total_Sources_Total')*100)));

		$('#Loan_Total').text(roundTwoDec(nanCheck(pInt('#PI_Total_Costs')*g.leverage)));
		$('#Loan_DollarPerUnit').text(roundTwoDec(nanCheck(pInt('#Loan_Total')/tu)));
		$('#Loan_DollarPerSF').text(roundTwoDec(nanCheck(pInt('#Loan_Total')/tsf)));
		$('#Loan_PercentofTotal').text(roundTwoDec(nanCheck(pFloat('#Loan_Total')/pFloat('#Total_Sources_Total')*100)));

		$('#Total_Sources_Total').text(roundTwoDec(nanCheck(pInt('#Equity_Total') + pInt('#Loan_Total'))));
		$('#Total_Sources_DollarPerUnit').text(roundTwoDec(nanCheck(pInt('#Equity_DollarPerUnit') + pInt('#Loan_DollarPerUnit'))));
		$('#Total_Sources_DollarPerSF').text(roundTwoDec(nanCheck(pInt('#Equity_DollarPerSF') + pInt('#Loan_DollarPerSF'))));
		$('#Total_Sources_PercentofTotal').text(roundTwoDec(nanCheck(pFloat('#Equity_PercentofTotal') + pFloat('#Loan_PercentofTotal'))));

		$('#Purchasing_Price_Total').text(roundTwoDec(nanCheck(g.purchasePrice)))
		$('#Purchasing_Price_DollarPerUnit').text(roundTwoDec(nanCheck(pInt('#Purchasing_Price_Total')/tu)));
		$('#Purchasing_Price_DollarPerSF').text(roundTwoDec(nanCheck(pInt('#Purchasing_Price_Total')/tsf)));
		$('#Purchasing_Price_PercentofTotal').text(roundTwoDec(nanCheck(pFloat('#Purchasing_Price_Total')/pFloat('#Total_Uses_Total')*100)));

		$('#Closing_Costs_Total').text(roundTwoDec(nanCheck(pInt('#PI_Closing_Costs'))));
		$('#Closing_Costs_DollarPerUnit').text(roundTwoDec(nanCheck(pInt('#PI_Closing_Costs')/tu)));
		$('#Closing_Costs_DollarPerSF').text(roundTwoDec(nanCheck(pInt('#PI_Closing_Costs')/tsf)));
		$('#Closing_Costs_PercentofTotal').text(roundTwoDec(nanCheck(pFloat('#PI_Closing_Costs')/pFloat('#Total_Uses_Total')*100)));

		$('#Total_Uses_Total').text(roundTwoDec(nanCheck(pInt('#Purchasing_Price_Total') + pInt('#Closing_Costs_Total'))));
		$('#Total_Uses_DollarPerUnit').text(roundTwoDec(nanCheck(pInt('#Purchasing_Price_DollarPerUnit') + pInt('#Closing_Costs_DollarPerUnit'))));
		$('#Total_Uses_DollarPerSF').text(roundTwoDec(nanCheck(pFloat('#Purchasing_Price_DollarPerSF') + pFloat('#Closing_Costs_DollarPerSF'))));
		var x = (roundTwoDec(nanCheck(pFloat('#Purchasing_Price_PercentofTotal'))));
		var y = (roundTwoDec(nanCheck(pFloat('#Closing_Costs_PercentofTotal'))));
		console.log("x: ",x)
		console.log("y: ",y)
		console.log(x+y);
		$('#Total_Uses_PercentofTotal').text(roundTwoDec(nanCheck(pFloat('#Purchasing_Price_PercentofTotal') + pFloat('#Closing_Costs_PercentofTotal'))));
		//
		// #Returns Summary Table
		// UL_Net_Profit = 0       # {=SUM('Returns Summary'!C24:M24)}
		// UL_Present_Value = 0
		// UL_Net_Present_Value = 0
		// UL_Equity_Multiple = 0
		// UL_IRR = 0
		// UL_IRR_from_CF = 0
		// UL_IRR_from_Sale = 0
		// UL_Cash_On_Cash = 0
		//
		// L_Net_Profit = 0
		// L_Present_Value = 0
		// L_Net_Present_Value = 0
		// L_Equity_Multiple = 0
		// L_IRR = 0
		// L_IRR_from_CF = 0
		// L_IRR_from_Sale = 0
		// L_Cash_On_Cash = 0

	// #Current Financial Performance Table
		//moved formulas to top to prevent 'infinity' error
		$('#Gross_Rental_Income_Total').text(roundTwoDec(nanCheck(g.otherIncomeTotal + pInt('#Rental_Income_Total'))));
		$('#Rental_Income_Total').text(roundTwoDec(nanCheck(pInt('#Rental_Rate_Assumptions tfoot .rent_per_unit')*tu*12)));

		$('#Rental_Income_DollarPerUnit').text(roundTwoDec(nanCheck(pInt('#Rental_Income_Total')/tu)));
		$('#Rental_Income_DollarPerSF').text(roundTwoDec(nanCheck(pInt('#Rental_Income_Total')/tsf)));
		$('#Rental_Income_PercentofTotal').text((roundOneDec(nanCheck(pFloat('#Rental_Income_Total'))/(pFloat('#Gross_Rental_Income_Total'))*100)));

		$('#Other_Income_DollarPerUnit').text(roundTwoDec(nanCheck(g.otherIncomeTotal/tu)));
		$('#Other_Income_DollarPerSF').text(roundTwoDec(nanCheck(g.otherIncomeTotal/tsf)));
		$('#Other_Income_PercentofTotal').text(roundOneDec(nanCheck(g.otherIncomeTotal/pFloat('#Gross_Rental_Income_Total')*100)));

		$('#Gross_Rental_Income_DollarPerUnit').text(roundTwoDec(nanCheck(pInt('#Rental_Income_DollarPerUnit') + pInt('#Other_Income_DollarPerUnit'))))
		$('#Gross_Rental_Income_DollarPerSF').text(roundTwoDec(nanCheck(pInt('#Rental_Income_DollarPerSF') + pInt('#Other_Income_DollarPerSF'))))
		$('#Gross_Rental_Income_PercentofTotal').text(roundTwoDec(nanCheck(pFloat('#Rental_Income_PercentofTotal') + pFloat('#Other_Income_PercentofTotal'))))

		$('#Vacancy_Total').text(roundTwoDec(nanCheck(-1 * g.lessVacancy * pInt('#Gross_Rental_Income_Total'))));
		$('#Vacancy_DollarPerUnit').text(roundTwoDec(nanCheck(pInt('#Vacancy_Total')/tu)));
		$('#Vacancy_DollarPerSF').text(roundTwoDec(nanCheck(pInt('#Vacancy_Total')/tsf)));

		$('#Concessions_Total').text(roundTwoDec(nanCheck(-1 * g.lessConcessions * pInt('#Gross_Rental_Income_Total'))));
		$('#Concessions_DollarPerUnit').text(roundTwoDec(nanCheck(pInt('#Concessions_Total')/tu)));
		$('#Concessions_DollarPerSF').text(roundTwoDec(nanCheck(pInt('#Concessions_Total')/tsf)));

		$('#Credit_Loss_Total').text(roundTwoDec(nanCheck(-1 * g.lessCreditLoss * pInt('#Gross_Rental_Income_Total'))));
		$('#Credit_Loss_DollarPerUnit').text(roundTwoDec(nanCheck(pInt('#Credit_Loss_Total')/tu)));
		$('#Credit_Loss_DollarPerSF').text(roundTwoDec(nanCheck(pInt('#Credit_Loss_Total')/tsf)));

		$('#Net_Rental_Income_Total').text(roundTwoDec(nanCheck(pInt('#Gross_Rental_Income_Total') + pInt('#Vacancy_Total') + pInt('#Concessions_Total') + pInt('#Credit_Loss_Total'))));
		$('#Net_Rental_Income_DollarPerUnit').text(roundTwoDec(nanCheck(pInt('#Net_Rental_Income_Total')/tu)));
		$('#Net_Rental_Income_DollarPerSF').text(roundTwoDec(nanCheck(pInt('#Net_Rental_Income_Total')/tsf)));

		$('#Real_Estate_Taxes_DollarPerUnit').text(roundTwoDec(nanCheck(g.realEstateTaxesTotal/tu)));
		$('#Real_Estate_Taxes_DollarPerSF').text(roundTwoDec(nanCheck(g.realEstateTaxesTotal/tsf)));
		$('#Real_Estate_Taxes_PercentofTotal').text(roundOneDec(nanCheck(g.realEstateTaxesTotal/pInt('#Total_Operating_Expenses_Total')*100)));

		$('#Insurance_DollarPerUnit').text(roundTwoDec(nanCheck(g.insuranceTotal/tu)));
		$('#Insurance_DollarPerSF').text(roundTwoDec(nanCheck(g.insuranceTotal/tsf)));
		$('#Insurance_PercentofTotal').text(roundOneDec(nanCheck(g.insuranceTotal/pInt('#Total_Operating_Expenses_Total')*100)));

		$('#Utilities_DollarPerUnit').text(roundTwoDec(nanCheck(g.utilitiesTotal/tu)));
		$('#Utilities_DollarPerSF').text(roundTwoDec(nanCheck(g.utilitiesTotal/tsf)));
		$('#Utilities_PercentofTotal').text(roundOneDec(nanCheck(g.utilitiesTotal/pInt('#Total_Operating_Expenses_Total')*100)));

		$('#Payroll_DollarPerUnit').text(roundTwoDec(nanCheck(g.payrollTotal/tu)));
		$('#Payroll_DollarPerSF').text(roundTwoDec(nanCheck(g.payrollTotal/tsf)));
		$('#Payroll_PercentofTotal').text(roundOneDec(nanCheck(g.payrollTotal/pInt('#Total_Operating_Expenses_Total')*100)));

		$('#Repairs_and_Maintenance_DollarPerUnit').text(roundTwoDec(nanCheck(g.repairsAndMaintenanceTotal/tu)));
		$('#Repairs_and_Maintenance_DollarPerSF').text(roundTwoDec(nanCheck(g.repairsAndMaintenanceTotal/tsf)));
		$('#Repairs_and_Maintenance_PercentofTotal').text(roundOneDec(nanCheck(g.repairsAndMaintenanceTotal/pInt('#Total_Operating_Expenses_Total')*100)));

		$('#Contract_Services_DollarPerUnit').text(roundTwoDec(nanCheck(g.contractServicesTotal/tu)));
		$('#Contract_Services_DollarPerSF').text(roundTwoDec(nanCheck(g.contractServicesTotal/tsf)));
		$('#Contract_Services_PercentofTotal').text(roundOneDec(nanCheck(g.contractServicesTotal/pInt('#Total_Operating_Expenses_Total')*100)));

		$('#Turnover_DollarPerUnit').text(roundTwoDec(nanCheck(g.turnoverTotal/tu)));
		$('#Turnover_DollarPerSF').text(roundTwoDec(nanCheck(g.turnoverTotal/tsf)));
		$('#Turnover_PercentofTotal').text(roundOneDec(nanCheck(g.turnoverTotal/pInt('#Total_Operating_Expenses_Total')*100)));

		$('#Sales_and_Marketing_DollarPerUnit').text(roundTwoDec(nanCheck(g.salesAndMarketingTotal/tu)));
		$('#Sales_and_Marketing_DollarPerSF').text(roundTwoDec(nanCheck(g.salesAndMarketingTotal/tsf)));
		$('#Sales_and_Marketing_PercentofTotal').text(roundOneDec(nanCheck(g.salesAndMarketingTotal/pInt('#Total_Operating_Expenses_Total')*100)));

		$('#Administrative_DollarPerUnit').text(roundTwoDec(nanCheck(g.administrativeTotal/tu)));
		$('#Administrative_DollarPerSF').text(roundTwoDec(nanCheck(g.administrativeTotal/tsf)));
		$('#Administrative_PercentofTotal').text(roundOneDec(nanCheck(g.administrativeTotal/pInt('#Total_Operating_Expenses_Total')*100)));

		$('#Management_Total').text(roundTwoDec(nanCheck(g.managementPercentage * pInt('#Net_Rental_Income_Total'))));
		$('#Management_DollarPerUnit').text(roundTwoDec(nanCheck(pInt('#Management_Total')/tu)));
		$('#Management_DollarPerSF').text(roundTwoDec(nanCheck(pInt('#Management_Total')/tsf)));
		$('#Management_PercentofTotal').text(roundOneDec(nanCheck(pInt('#Management_Total')/pInt('#Total_Operating_Expenses_Total')*100)));

		$('#Replacement_Reserves_Total').text(roundTwoDec(nanCheck(g.replacementReservesPercentage * pInt('#Net_Rental_Income_Total'))));
		$('#Replacement_Reserves_DollarPerUnit').text(roundTwoDec(nanCheck(pInt('#Replacement_Reserves_Total')/tu)));
		$('#Replacement_Reserves_DollarPerSF').text(roundTwoDec(nanCheck(pInt('#Replacement_Reserves_Total')/tsf)));
		$('#Replacement_Reserves_PercentofTotal').text(roundOneDec(nanCheck(pInt('#Replacement_Reserves_Total')/pInt('#Total_Operating_Expenses_Total')*100)));

		$('#Total_Operating_Expenses_Total').text(roundTwoDec(nanCheck(g.realEstateTaxesTotal + g.insuranceTotal + g.utilitiesTotal + g.payrollTotal + g.repairsAndMaintenanceTotal + g.contractServicesTotal + g.turnoverTotal + g.salesAndMarketingTotal + g.administrativeTotal + pInt('#Management_Total') + pInt('#Replacement_Reserves_Total'))));
		$('#Total_Operating_Expenses_DollarPerUnit').text(roundTwoDec(nanCheck(pInt('#Total_Operating_Expenses_Total')/tu)));
		$('#Total_Operating_Expenses_DollarPerSF').text(roundTwoDec(nanCheck(pInt('#Total_Operating_Expenses_Total')/tsf)));
		$('#Total_Operating_Expenses_PercentofTotal').text(roundTwoDec(nanCheck(pFloat('#Real_Estate_Taxes_PercentofTotal') + pFloat('#Insurance_PercentofTotal') + pFloat('#Utilities_PercentofTotal') + pFloat('#Payroll_PercentofTotal') + pFloat('#Repairs_and_Maintenance_PercentofTotal') + pFloat('#Contract_Services_PercentofTotal') + pFloat('#Turnover_PercentofTotal') + pFloat('#Sales_and_Marketing_PercentofTotal') + pFloat('#Administrative_PercentofTotal') + pFloat('#Management_PercentofTotal') + pFloat('#Replacement_Reserves_PercentofTotal'))));

		$('#Net_Operating_Income_Total').text(roundTwoDec(nanCheck(pInt('#Net_Rental_Income_Total') - pInt('#Total_Operating_Expenses_Total'))));
		$('#Net_Operating_Income_DollarPerUnit').text(roundTwoDec(nanCheck(pInt('#Net_Operating_Income_Total')/tu)));
		$('#Net_Operating_Income_DollarPerSF').text(roundTwoDec(nanCheck(pInt('#Net_Operating_Income_Total')/tsf)));
	}; //end DashboardInput









//RENTAL RATE ASSUMPTIONS Table calculations=======================================================================
	var RRAInput = function(event){
		// Calculates row data for Rental Rate Assumptions -------------------------------------------
		var totalUnits = parseInt($('.total_units', this).val());
		var avgSFPerUnit = parseInt($(".avg_sf_per_unit", this).val());
		var rentPerUnit = parseInt($(".rent_per_unit", this).val());
		// console.log(totalUnits,avgSFPerUnit,rentPerUnit)

		var totalSF = totalUnits*avgSFPerUnit;
		var rentPerSF = rentPerUnit/avgSFPerUnit;
		$('.total_sf', this).text(roundTwoDec(nanCheck(totalSF)));
		$('.rent_per_sf', this).text(roundTwoDec(nanCheck(rentPerSF)));



		// Calculates column sum data for Rental Rate Assumptions -------------------------------------------
		var $tu = $('#Rental_Rate_Assumptions tbody .total_units');
		var $tsf = $('#Rental_Rate_Assumptions tbody .total_sf');
		var $rrow = $('#Rental_Rate_Assumptions tbody .rent_row');

		var sumTotalUnits = 0;
		var sumTotalSF = 0;
		var spListRPU = 0;

		//calculates total value: Total Units
		$tu.each(function(){
			sumTotalUnits = sumTotalUnits + parseInt($(this).val());
		});

		//calculates total value: Total SF
		$tsf.each(function(){
			sumTotalSF = sumTotalSF + parseInt($(this).text());
		});

		//calculates total value: Rent Per Unit
		$rrow.each(function(){
			var numUnits = $(this).find('.total_units').val();
			var rentUnits = $(this).find('.rent_per_unit').val();
			spListRPU = spListRPU + (numUnits * rentUnits);
		});

		//creates an array of arrays for all the Projected Rent rows and stores the array in the global "g" object
		$rrow.each(function(){
			var tempProjectRents = $(this).find('.proj_rents').val();
			var tempNumUnits = $(this).find('.total_units').val();
			var tempAvgSFPerUnit = $(this).find('.avg_sf_per_unit').val();
			var tempRentUnits = $(this).find('.rent_per_unit').val();
			var rraObjTemp = {tempProjectRents: tempProjectRents,
							 tempNumUnits: tempNumUnits,
							 tempAvgSFPerUnit: tempAvgSFPerUnit,
							 tempRentUnits: tempRentUnits
						 	};
			// var RRAlistTemp = new Array(tempProjectRents, tempNumUnits, tempAvgSFPerUnit, tempRentUnits);
			RRAlist.push(rraObjTemp);
		});

		var sumAvgSFPerUnit = sumTotalSF/sumTotalUnits; //calculates total value: Avg SF Per Unit
		spListRPU = spListRPU/sumTotalUnits; 		//calculates total value: Rent Per Unit
		var sumRentPerSF = spListRPU/sumAvgSFPerUnit;		//calculates total value: Rent Per SF

		//appends total values to dashboard
		$('#Rental_Rate_Assumptions tfoot .total_units').text(roundTwoDec(nanCheck(sumTotalUnits)));
		$('#Rental_Rate_Assumptions tfoot .total_sf').text(roundTwoDec(nanCheck(sumTotalSF)));
		$('#Rental_Rate_Assumptions tfoot .avg_sf_per_unit').text(Math. round(nanCheck(sumAvgSFPerUnit)));
		$('#Rental_Rate_Assumptions tfoot .rent_per_sf').text(roundTwoDec(nanCheck(sumRentPerSF)));
		$('#Rental_Rate_Assumptions tfoot .rent_per_unit').text(roundTwoDec(nanCheck(spListRPU)));
	};
//END RENTAL RATE ASSUMPTIONS Table calculations=======================================================================



//MARKET RENTAL ASSUMPTIONS Table calculations=======================================================================
	var MRAInput = function(event){
		//creates an array of arrays for all the Market Rent Assumption rows and stores the array in the global "g" object
		var $mraRow = $('#Market_Rental_Assumptions tbody .year_row');
		$rrow.each(function(){
			tempMktRentRevenue = $(this).find('.mkt_rent_revenue').val();
			tempMktRentExpenses = $(this).find('.mkt_rent_expenses').val();
			tempMktRentVacancy = $(this).find('.mkt_rent_vacancy').val();
			tempMktRentConcessions = $(this).find('.mkt_rent_concessions').val();
			tempMktRentCreditLoss = $(this).find('.mkt_rent_credit_loss').val();
			var mraObjTemp = {tempMktRentRevenue,
							 tempMktRentExpenses,
							 tempMktRentVacancy,
							 tempMktRentConcessions,
							 tempMktRentCreditLoss};
			MRAlist.push(mraObjTemp);
			// ("MRALIST: ",MRAlist);
		});

	};
//END OF MARKET RENTAL ASSUMPTIONS Table calculations=======================================================================



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
			DashboardInput();
		});
	//Runs input function inside
		$('.rent_row').on('input', RRAInput);
		$('#dashboard').on('input', function(){
			DashboardInput();
			DashboardInput();
		});


	}) //end addrow function




// ============================================================================================================
//MARKET RENTAL ASSUMPTIONS Dynamic Table
// ============================================================================================================
	// adds one row to table when the 'add' button is clicked

	$("#market_rental_form").on('click', function(event) {
		var mraCounter = $('#Market_Rental_Assumptions tbody tr').length+1;
		event.preventDefault();
		$('#Market_Rental_Assumptions').find('tbody')
			.append($("<tr class = 'year_row' id='year_row_"+mraCounter+"'>")
			.append($("<td class='mkt_rent_year'>Year "+mraCounter+"</td>"))
			.append($("<td></td>"))
			.append($("<td>").html("<input type='number' name='mkt_rent_revenue' class='mkt_rent_revenue' placeholder='Revenue (%)'></td>"))
			.append($("<td>").html("<input type='number' name='mkt_rent_expenses' class='mkt_rent_expenses' placeholder='Expenses (%)'></td>"))
			.append($("<td>").html("<input type='number' name='mkt_rent_vacancy' class='mkt_rent_vacancy' placeholder='Vacancy (%)'></td>"))
			.append($("<td>").html("<input type='number' name='mkt_rent_concessions' class='mkt_rent_concessions' placeholder='Concessions (%)'></td>"))
			.append($("<td>").html("<input type='number' name='mkt_rent_credit_loss' class='mkt_rent_credit_loss' placeholder='Credit Loss (%)'></td>"))
			.append($('<td>').html("<a>[X]</a></td>"))
			)
		MRAInput();

	// function to delete all additionally added rows
		$('tr[class^="year_row"] a').on('click', function(event) {
			$(this).parent().parent().remove();
			var $mraRow = $('#Market_Rental_Assumptions tbody .year_row');
			mraCounterTemp = 1;

	// reorders year text and year_row_id sequentially on deletion of row
			$mraRow.each(function(){
				$(this).find('.mkt_rent_year').text("Year "+mraCounterTemp);
				$(this).attr('id',"year_row_"+mraCounterTemp);
				mraCounterTemp += 1;
			});
		});

	//Runs input function inside
	$('#dashboard').on('input', function(){
		DashboardInput();
		DashboardInput();
	});
	$('.rent_row').on('input', RRAInput);
		// $('.year_row').on('input', debouncer(DashboardInput,500));

	}); //end addrow function

















// ============================================================================================================
// $('.rent_row').on('input', debouncer(RRAInput,500));
	$('.rent_row').on('input', RRAInput);
	$('#dashboard').on('input', function(){
	DashboardInput();
	DashboardInput();
	});





}); //end of doc
