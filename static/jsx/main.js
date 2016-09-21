$(document).ready(function(){

	var RRAlist = []; //Rental Rate Assumptions list
	var MRAlist = []; //Market Rental Assumptions list


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
// Start of ALL calculations for dashboard
// ============================================================================================================

	var pInt = function(value){
		return parseInt($(value).text())
	};

	var DashboardInput = function(event){
	// Global objects: Inputs (possibly calculated values)
		var g = {
			analysisStartDate: $('#Analysis_Start_Date').val(),
			propertyName:	$('#Property_Name').val(),
			propertyLocation: $('#Property_Address').val(),
			propertyType: $('#Property_Type').val(),
			purchasePrice: parseInt($('#Purchase_Price').val()),
			closingCostPercentage: parseInt($('#Closing_Costs_Percentage').val())/100,
			saleYear: parseInt($('#Sale_Year').val()),
			terminalCapRate: parseInt($('#Terminal_Cap_Rate').val()),
			salesCosts: parseInt($('#Sales_Costs').val()),
			leverage: parseInt($('#Leverage').val()),
			interestRateOnMortgage: parseInt($('#Interest_Rate_on_Mortgage').val()),
			loanTerm: parseInt($('#Loan_Term').val()),
			loanAmortization: parseInt($('#Loan_Amortization').val()),
			unleveredDiscountRate: parseInt($('#UL_Discount_Rate').val()),
			leveredDiscountRate: parseInt($('#L_Discount_Rate').val()),
			otherIncomeTotal: parseInt($('#Other_Income_Total').val()),
			lessVacancy: parseInt($('#Less_Vacancy').val()),
			lessConcessions: parseInt($('#Less_Concessions').val()),
			lessCreditLoss: parseInt($('#Less_Credit_Loss').val()),
			realEstateTaxesTotal: parseInt($('#Real_Estate_Taxes_Total').val()),
			insuranceTotal: parseInt($('#Insurance_Total').val()),
			utlitiesTotal: parseInt($('#Utilities_Total').val()),
			payrollTotal: parseInt($('#Payroll_Total').val()),
			repairsAndMaintenanceTotal: parseInt($('#Repairs_and_Maintenance_Total').val()),
			contractServicesTotal: parseInt($('#Contract_Services_Total').val()),
			turnoverTotal: parseInt($('#Turnover_Total').val()),
			salesAndMarketingTotal: parseInt($('#Sales_and_Marketing_Total').val()),
			administrativeTotal: parseInt($('#Administrative_Total').val()),
			managementPercentage: parseInt($('#Management_Percentage').val()),
			replacementReservesPercentage: parseInt($('#Replacement_Reserves_Percentage').val()),
		};

		//Property Info Calculations
		$('#prop_info_total_num_units').text($('#Rental_Rate_Assumptions tfoot .total_units').text());
		$('#prop_info_total_sq_ft').text($('#Rental_Rate_Assumptions tfoot .total_sf').text());

		//Purchase Info Calculations
		$('#PI_Closing_Costs').text(g.purchasePrice*g.closingCostPercentage);
		$('#PI_Total_Costs').text(g.purchasePrice+pInt('#PI_Closing_Costs'));
		$('#PI_Purchase_Cost_Per_Unit').text(g.purchasePrice/pInt('#prop_info_total_num_units'));
		$('#PI_Total_Cost_Per_Unit').text(pInt('#PI_Total_Costs')/pInt('#prop_info_total_num_units'));
		$('#PI_Purchase_Cost_Per_SF').text(g.purchasePrice/pInt('#prop_info_total_sq_ft'));
		$('#PI_Total_Cost_Per_SF').text(pInt('#PI_Total_Costs')/pInt('#prop_info_total_sq_ft'));
		$('#PI_Cap_Rate_on_Purchase_Price').text(pInt('#Net_Operating_Income_Total')/g.purchasePrice);
		$('#PI_Cap_Rate_on_Total_Price').text(pInt('#Net_Operating_Income_Total')/pInt('#PI_Total_Costs'));

		//Sale Summary Calculations
		// // Sale_Price = 100       #{=HLOOKUP(Sale_Year+1,Proforma!C4:M30,27)/Terminal_Cap}
		// Sale_Price_Per_Unit = Sale_Price/Num_Units
		// Sale_Price_Per_SF = Sale_Price/Total_Sq_Ft


		//Sources and Uses Calculations
			//Equity
		$('#PI_Total_Cost_Per_Unit').text(pInt('#PI_Total_Costs')/pInt('#prop_info_total_num_units'));
			//Loans
		$('#Loan_Total').text(pInt('#PI_Total_Costs')*g.leverage);

		//tests
		console.log($('#prop_info_total_sq_ft').text());

		// // #Finance Assumptions Table
		// // # {all input fields}
		//
		// // #Sources And Uses Table
		// Equity_Total = Total_Costs - Loan_Total
		// Equity_DollarPerUnit = Equity_Total/Num_Units
		// Equity_DollarPerSF = Equity_Total/Total_Sq_Ft
		// Equity_PercentofTotal = Equity_Total/Total_Sources_Total
		//
		// Loan_Total = Total_Costs*leverage
		// Loan_DollarPerUnit = Loan_Total/Num_Units
		// Loan_DollarPerSF = Loan_Total/Total_Sq_Ft
		// Loan_PercentofTotal = Loan_Total/Total_Sources_Total
		//
		// Total_Sources_Total = Equity_Total + Loan_Total
		// Total_Sources_DollarPerUnit = Equity_DollarPerUnit + Loan_DollarPerUnit
		// Total_Sources_DollarPerSF = Equity_DollarPerSF + Loan_DollarPerSF
		// Total_Sources_PercentofTotal = Equity_PercentofTotal + Loan_PercentofTotal
		//
		// Purchasing_Price_Total = purchase_price
		// Purchasing_Price_DollarPerUnit = Purchasing_Price_Total/Num_Units
		// Purchasing_Price_DollarPerSF = Purchasing_Price_Total/Total_Sq_Ft
		// Purchasing_Price_PercentofTotal = Purchasing_Price_Total/Total_Uses_Total
		//
		// Closing_Costs_Total = Closing_Costs
		// Closing_Costs_DollarPerUnit = Closing_Costs/Num_Units
		// Closing_Costs_DollarPerSF = Closing_Costs/Total_Sq_Ft
		// Closing_Costs_PercentofTotal = Closing_Costs/Total_Uses_Total
		//
		// Total_Uses_Total = Purchasing_Price_Total + Closing_Costs_Total
		// Total_Uses_DollarPerUnit = Purchasing_Price_DollarPerUnit + Closing_Costs_DollarPerUnit
		// Total_Uses_DollarPerSF = Purchasing_Price_DollarPerSF + Closing_Costs_DollarPerSF
		// Total_Uses_PercentofTotal = Purchasing_Price_PercentofTotal + Closing_Costs_PercentofTotal
		//
		// // #Rental Rate Assumptions Table ***dynamic***
		// // # TBD
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
		//
		// #Current Financial Performance Table
		// Rental_Income_Total = 0     # {=((SUMPRODUCT(G18:G20,K18:K20)*12))}
		// Rental_Income_DollarPerUnit = Rental_Income_Total/Num_Units
		// Rental_Income_DollarPerSF = Rental_Income_Total/Total_Sq_Ft
		// Rental_Income_PercentofTotal = Rental_Income_Total/Gross_Rental_Income_Total
		//
		// Other_Income_DollarPerUnit = other_income_total/Num_Units
		// Other_Income_DollarPerSF = other_income_total/Total_Sq_Ft
		// Other_Income_PercentofTotal = other_income_total/Gross_Rental_Income_Total
		//
		// Gross_Rental_Income_Total = other_income_total + Rental_Income_Total
		// Gross_Rental_Income_DollarPerUnit = Rental_Income_DollarPerUnit + Other_Income_DollarPerUnit
		// Gross_Rental_Income_DollarPerSF = Rental_Income_DollarPerSF + Other_Income_DollarPerSF
		// Gross_Rental_Income_PercentofTotal = Rental_Income_PercentofTotal + Other_Income_PercentofTotal
		//
		// Vacancy_Total = -1 * less_vacancy * Gross_Rental_Income_Total         #negative nums
		// Vacancy_DollarPerUnit = Vacancy_Total/Num_Units        #negative nums
		// Vacancy_DollarPerSF = Vacancy_Total/Total_Sq_Ft      #negative nums
		//
		// Concessions_Total = -1 * less_concessions * Gross_Rental_Income_Total        #negative nums
		// Concessions_DollarPerUnit = Concessions_Total/Num_Units        #negative nums
		// Concessions_DollarPerSF = Concessions_Total/Total_Sq_Ft      #negative nums
		//
		// Credit_Loss_Total = -1 * less_credit_loss * Gross_Rental_Income_Total        #negative nums
		// Credit_Loss_DollarPerUnit = Credit_Loss_Total/Num_Units        #negative nums
		// Credit_Loss_DollarPerSF = Credit_Loss_Total/Total_Sq_Ft      #negative nums
		//
		// Net_Rental_Income_Total = Gross_Rental_Income_Total + Vacancy_Total + Concessions_Total + Credit_Loss_Total
		// Net_Rental_Income_DollarPerUnit = Net_Rental_Income_Total/Num_Units
		// Net_Rental_Income_DollarPerSF = Net_Rental_Income_Total/Total_Sq_Ft
		//
		// Real_Estate_Taxes_DollarPerUnit = real_estate_taxes_total/Num_Units
		// Real_Estate_Taxes_DollarPerSF = real_estate_taxes_total/Total_Sq_Ft
		// Real_Estate_Taxes_PercentofTotal = real_estate_taxes_total/Total_Operating_Expenses_Total
		//
		// Insurance_DollarPerUnit = insurance_total/Num_Units
		// Insurance_DollarPerSF = insurance_total/Total_Sq_Ft
		// Insurance_PercentofTotal = insurance_total/Total_Operating_Expenses_Total
		//
		// Utilities_DollarPerUnit = utilities_total/Num_Units
		// Utilities_DollarPerSF = utilities_total/Total_Sq_Ft
		// Utilities_PercentofTotal = utilities_total/Total_Operating_Expenses_Total
		//
		// Payroll_DollarPerUnit = payroll_total/Num_Units
		// Payroll_DollarPerSF = payroll_total/Total_Sq_Ft
		// Payroll_PercentofTotal = payroll_total/Total_Operating_Expenses_Total
		//
		// Repairs_and_Maintenance_DollarPerUnit = repairs_and_maintenance_total/Num_Units
		// Repairs_and_Maintenance_DollarPerSF = repairs_and_maintenance_total/Total_Sq_Ft
		// Repairs_and_Maintenance_PercentofTotal = repairs_and_maintenance_total/Total_Operating_Expenses_Total
		//
		// Contract_Services_DollarPerUnit = contract_services_total/Num_Units
		// Contract_Services_DollarPerSF = contract_services_total/Total_Sq_Ft
		// Contract_Services_PercentofTotal = contract_services_total/Total_Operating_Expenses_Total
		//
		// Turnover_DollarPerUnit = turnover_total/Num_Units
		// Turnover_DollarPerSF = turnover_total/Total_Sq_Ft
		// Turnover_PercentofTotal = turnover_total/Total_Operating_Expenses_Total
		//
		// Sales_and_Marketing_DollarPerUnit = sales_and_marketing_total/Num_Units
		// Sales_and_Marketing_DollarPerSF = sales_and_marketing_total/Total_Sq_Ft
		// Sales_and_Marketing_PercentofTotal = sales_and_marketing_total/Total_Operating_Expenses_Total
		//
		// Administrative_DollarPerUnit = administrative/Num_Units
		// Administrative_DollarPerSF = administrative/Total_Sq_Ft
		// Administrative_PercentofTotal = administrative/Total_Operating_Expenses_Total
		//
		// Management_Total = management_percentage * Net_Rental_Income_Total
		// Management_DollarPerUnit = Management_Total/Num_Units
		// Management_DollarPerSF = Management_Total/Total_Sq_Ft
		// Management_PercentofTotal = Management_Total/Total_Operating_Expenses_Total
		//
		// Replacement_Reserves_Total = replacement_reserves_percentage * Net_Rental_Income_Total
		// Replacement_Reserves_DollarPerUnit = Replacement_Reserves_Total/Num_Units
		// Replacement_Reserves_DollarPerSF = Replacement_Reserves_Total/Total_Sq_Ft
		// Replacement_Reserves_PercentofTotal = Replacement_Reserves_Total/Total_Operating_Expenses_Total
		//
		// Total_Operating_Expenses_Total = real_estate_taxes_total + insurance_total + utilities_total + payroll_total + repairs_and_maintenance_total + contract_services_total + turnover_total + sales_and_marketing_total + administrative + Management_Total + Replacement_Reserves_Total
		// Total_Operating_Expenses_DollarPerUnit = Total_Operating_Expenses_Total/Num_Units
		// Total_Operating_Expenses_DollarPerSF = Total_Operating_Expenses_Total/Total_Sq_Ft
		// Total_Operating_Expenses_PercentofTotal = Real_Estate_Taxes_PercentofTotal + Insurance_PercentofTotal + Utilities_PercentofTotal + Payroll_PercentofTotal + Repairs_and_Maintenance_PercentofTotal + Contract_Services_PercentofTotal + Turnover_PercentofTotal + Sales_and_Marketing_PercentofTotal + Administrative_PercentofTotal + Management_PercentofTotal + Replacement_Reserves_PercentofTotal
		//
		// Net_Operating_Income_Total = Net_Rental_Income_Total - Total_Operating_Expenses_Total
		// Net_Operating_Income_DollarPerUnit = Net_Operating_Income_Total/Num_Units
		// Net_Operating_Income_DollarPerSF = Net_Operating_Income_Total/Total_Sq_Ft
		//
		// #Market Rental Assumptions Table #***dynamic***


	}; //end DashboardInput









//RENTAL RATE ASSUMPTIONS Table calculations=======================================================================
	var RRAInput = function(event){
		// Calculates row data for Rental Rate Assumptions -------------------------------------------
		totalUnits = parseInt($('.total_units', this).val());
		avgSFPerUnit = parseInt($(".avg_sf_per_unit", this).val());
		rentPerUnit = parseInt($(".rent_per_unit", this).val());
		console.log(totalUnits,avgSFPerUnit,rentPerUnit)

		var totalSF = totalUnits*avgSFPerUnit;
		var rentPerSF = rentPerUnit/avgSFPerUnit;
		$('.total_sf', this).text(totalSF);
		$('.rent_per_sf', this).text(rentPerSF);



		// Calculates column sum data for Rental Rate Assumptions -------------------------------------------
		var $tu = $('#Rental_Rate_Assumptions tbody .total_units');
		var $tsf = $('#Rental_Rate_Assumptions tbody .total_sf');
		var $rrow = $('#Rental_Rate_Assumptions tbody .rent_row');

		sumTotalUnits = 0;
		sumTotalSF = 0;
		spListRPU = 0;

		//calculates total value: Total Units
		$tu.each(function(){
			sumTotalUnits += parseInt($(this).val());
		});

		//calculates total value: Total SF
		$tsf.each(function(){
			sumTotalSF += parseInt($(this).text());
		});

		//calculates total value: Rent Per Unit
		$rrow.each(function(){
			numUnits = $(this).find('.total_units').val();
			rentUnits = $(this).find('.rent_per_unit').val();
			spListRPU = spListRPU + (numUnits * rentUnits);
		});

		//creates an array of arrays for all the Projected Rent rows and stores the array in the global "g" object
		$rrow.each(function(){
			tempProjectRents = $(this).find('.proj_rents').val();
			tempNumUnits = $(this).find('.total_units').val();
			tempAvgSFPerUnit = $(this).find('.avg_sf_per_unit').val();
			tempRentUnits = $(this).find('.rent_per_unit').val();
			var rraObjTemp = {tempProjectRents: tempProjectRents,
							 tempNumUnits: tempNumUnits,
							 tempAvgSFPerUnit: tempAvgSFPerUnit,
							 tempRentUnits: tempRentUnits
						 	};
			// var RRAlistTemp = new Array(tempProjectRents, tempNumUnits, tempAvgSFPerUnit, tempRentUnits);
			RRAlist.push(rraObjTemp);
			console.log("RRA LIST: ",RRAlist);
		});

		sumAvgSFPerUnit = sumTotalSF/sumTotalUnits; //calculates total value: Avg SF Per Unit
		spListRPU = spListRPU/sumTotalUnits; 		//calculates total value: Rent Per Unit
		sumRentPerSF = spListRPU/sumAvgSFPerUnit;		//calculates total value: Rent Per SF

		//appends total values to dashboard
		$('#Rental_Rate_Assumptions tfoot .total_units').text(sumTotalUnits);
		$('#Rental_Rate_Assumptions tfoot .total_sf').text(sumTotalSF);
		$('#Rental_Rate_Assumptions tfoot .avg_sf_per_unit').text(sumAvgSFPerUnit);
		$('#Rental_Rate_Assumptions tfoot .rent_per_sf').text(sumRentPerSF);
		$('#Rental_Rate_Assumptions tfoot .rent_per_unit').text(spListRPU);
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
			console.log("MRALIST: ",MRAlist);
		});

	};
//END OF MARKET RENTAL ASSUMPTIONS Table calculations=======================================================================














// ============================================================================================================
//Rental Rate Form Dynamic Table
// ============================================================================================================
	$('.rent_row').on('input', RRAInput);
	$('#dashboard').on('input', DashboardInput);


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
		$('#dashboard').on('input', DashboardInput);


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
		$('#dashboard').on('input', DashboardInput);
		$('.rent_row').on('input', DashboardInput);
		// $('.year_row').on('input', DashboardInput);

	}); //end addrow function

















// ============================================================================================================
}); //end of doc
