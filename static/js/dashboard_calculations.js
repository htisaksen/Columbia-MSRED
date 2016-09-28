
//grabs the inputs as an object
myApp.dashboard = {}
myApp.dashboard.getInputs = function(){
  return {
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
}

  // ============================================================================================================
  // Start of ALL calculations for dashboard
  // ============================================================================================================



  myApp.dashboard.DashboardInput = function(){
  var g = myApp.dashboard.getInputs();
  var remSpcChr = myApp.utils.remSpcChr;
  var pInt = myApp.utils.pInt;
  var pFloat = myApp.utils.pFloat;
  var nanCheck = myApp.utils.nanCheck
  var roundOneDec = myApp.utils.roundOneDec
  var roundTwoDec = myApp.utils.roundTwoDec
  var FormatCurrency = myApp.utils.FormatCurrency
  var FormatPercent = myApp.utils.FormatPercent
  //VARIABLES FOR CALCULATIONS-------------------------------------------------------
  var tu = pInt('#Rental_Rate_Assumptions tfoot .total_units');
  var tsf = pInt('#Rental_Rate_Assumptions tfoot .total_sf');
  //--------------------------------------------------------------------------------


  //Property Info Calculations
  $('#prop_info_total_num_units').text(pInt('#Rental_Rate_Assumptions tfoot .total_units'));  //num
  $('#prop_info_total_sq_ft').text($('#Rental_Rate_Assumptions tfoot .total_sf').text());   //num

  //moved to top of formula list to fix infinity issue
  $('#PI_Closing_Costs').text(
    FormatCurrency(nanCheck(g.purchasePrice*g.closingCostPercentage)));     //$
  $('#PI_Total_Costs').text(
    FormatCurrency(nanCheck(g.purchasePrice+pFloat('#PI_Closing_Costs'))));   //$

  //Purchase Info Calculations
  $('#PI_Purchase_Cost_Per_Unit').text(
    FormatCurrency(nanCheck(g.purchasePrice/pInt('#prop_info_total_num_units'))));		//$
  $('#PI_Total_Cost_Per_Unit').text(
    FormatCurrency(nanCheck(pInt('#PI_Total_Costs')/pInt('#prop_info_total_num_units'))));		//$
  $('#PI_Purchase_Cost_Per_SF').text(
    FormatCurrency(nanCheck(g.purchasePrice/pInt('#prop_info_total_sq_ft'))));		//$
  $('#PI_Total_Cost_Per_SF').text(
    FormatCurrency(nanCheck(pInt('#PI_Total_Costs')/pInt('#prop_info_total_sq_ft'))));		//$
  $('#PI_Cap_Rate_on_Purchase_Price').text(
    FormatPercent(nanCheck(pInt('#Net_Operating_Income_Total')/g.purchasePrice)*100));		//%
  $('#PI_Cap_Rate_on_Total_Price').text(
    FormatPercent(nanCheck(pInt('#Net_Operating_Income_Total')/pInt('#PI_Total_Costs'))*100));		//%



  //Sale Summary Calculations
  // // Sale_Price = 100       #{=HLOOKUP(Sale_Year+1,Proforma!C4:M30,27)/Terminal_Cap}
  // Sale_Price_Per_Unit = Sale_Price/Num_Units
  // Sale_Price_Per_SF = Sale_Price/Total_Sq_Ft


  //Sources and Uses Calculations
    //Equity

  $('#PI_Total_Cost_Per_Unit').text(FormatCurrency(nanCheck(pInt('#PI_Total_Costs')/pInt('#prop_info_total_num_units'))));		//$

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


  $('#Gross_Rental_Income_Total').text(roundTwoDec(nanCheck(g.otherIncomeTotal + pInt('#Rental_Income_Total'))));				//$
  $('#Rental_Income_Total').text(roundTwoDec(nanCheck(pInt('#Rental_Rate_Assumptions tfoot .rent_per_unit')*tu*12)));		//$

  $('#Rental_Income_DollarPerUnit').text(roundTwoDec(nanCheck(pInt('#Rental_Income_Total')/tu)));			//$
  $('#Rental_Income_DollarPerSF').text(roundTwoDec(nanCheck(pInt('#Rental_Income_Total')/tsf)));			//$
  $('#Rental_Income_PercentofTotal').text(roundOneDec(nanCheck(pFloat('#Rental_Income_Total'))/(pFloat('#Gross_Rental_Income_Total'))*100));		//%

  $('#Other_Income_DollarPerUnit').text(roundTwoDec(nanCheck(g.otherIncomeTotal/tu)));		//$
  $('#Other_Income_DollarPerSF').text(roundTwoDec(nanCheck(g.otherIncomeTotal/tsf)));		//$
  $('#Other_Income_PercentofTotal').text(roundOneDec(nanCheck(g.otherIncomeTotal/pFloat('#Gross_Rental_Income_Total')*100)));		//%

  $('#Gross_Rental_Income_DollarPerUnit').text(roundTwoDec(nanCheck(pInt('#Rental_Income_DollarPerUnit') + pInt('#Other_Income_DollarPerUnit'))));		//$
  $('#Gross_Rental_Income_DollarPerSF').text(roundTwoDec(nanCheck(pInt('#Gross_Rental_Income_Total')/tsf)));		//$
  $('#Gross_Rental_Income_PercentofTotal').text(roundTwoDec(nanCheck(pFloat('#Rental_Income_PercentofTotal') + pFloat('#Other_Income_PercentofTotal'))));		//%

  $('#Vacancy_Total').text(roundTwoDec(nanCheck(-1 * g.lessVacancy * pInt('#Gross_Rental_Income_Total'))));		//$
  $('#Vacancy_DollarPerUnit').text(roundTwoDec(nanCheck(pInt('#Vacancy_Total')/tu)));		//$
  $('#Vacancy_DollarPerSF').text(roundTwoDec(nanCheck(pInt('#Vacancy_Total')/tsf)));		//$

  $('#Concessions_Total').text(roundTwoDec(nanCheck(-1 * g.lessConcessions * pInt('#Gross_Rental_Income_Total'))));		//$
  $('#Concessions_DollarPerUnit').text(roundTwoDec(nanCheck(pInt('#Concessions_Total')/tu)));		//$
  $('#Concessions_DollarPerSF').text(roundTwoDec(nanCheck(pInt('#Concessions_Total')/tsf)));		//$

  $('#Credit_Loss_Total').text(roundTwoDec(nanCheck(-1 * g.lessCreditLoss * pInt('#Gross_Rental_Income_Total'))));		//$
  $('#Credit_Loss_DollarPerUnit').text(roundTwoDec(nanCheck(pInt('#Credit_Loss_Total')/tu)));		//$
  $('#Credit_Loss_DollarPerSF').text(roundTwoDec(nanCheck(pInt('#Credit_Loss_Total')/tsf)));		//$

  $('#Net_Rental_Income_Total').text(roundTwoDec(nanCheck(pInt('#Gross_Rental_Income_Total') + pInt('#Vacancy_Total') + pInt('#Concessions_Total') + pInt('#Credit_Loss_Total'))));		//$
  $('#Net_Rental_Income_DollarPerUnit').text(roundTwoDec(nanCheck(pInt('#Net_Rental_Income_Total')/tu)));		//$
  $('#Net_Rental_Income_DollarPerSF').text(roundTwoDec(nanCheck(pInt('#Net_Rental_Income_Total')/tsf)));		//$

  $('#Real_Estate_Taxes_DollarPerUnit').text(roundTwoDec(nanCheck(g.realEstateTaxesTotal/tu)));		//$
  $('#Real_Estate_Taxes_DollarPerSF').text(roundTwoDec(nanCheck(g.realEstateTaxesTotal/tsf)));		//$
  $('#Real_Estate_Taxes_PercentofTotal').text(roundOneDec(nanCheck(g.realEstateTaxesTotal/pInt('#Total_Operating_Expenses_Total')*100)));		//%

  $('#Insurance_DollarPerUnit').text(roundTwoDec(nanCheck(g.insuranceTotal/tu)));		//$
  $('#Insurance_DollarPerSF').text(roundTwoDec(nanCheck(g.insuranceTotal/tsf)));		//$
  $('#Insurance_PercentofTotal').text(roundOneDec(nanCheck(g.insuranceTotal/pInt('#Total_Operating_Expenses_Total')*100)));		//%

  $('#Utilities_DollarPerUnit').text(roundTwoDec(nanCheck(g.utilitiesTotal/tu)));		//$
  $('#Utilities_DollarPerSF').text(roundTwoDec(nanCheck(g.utilitiesTotal/tsf)));		//$
  $('#Utilities_PercentofTotal').text(roundOneDec(nanCheck(g.utilitiesTotal/pInt('#Total_Operating_Expenses_Total')*100)));		//%

  $('#Payroll_DollarPerUnit').text(roundTwoDec(nanCheck(g.payrollTotal/tu)));		//$
  $('#Payroll_DollarPerSF').text(roundTwoDec(nanCheck(g.payrollTotal/tsf)));		//$
  $('#Payroll_PercentofTotal').text(roundOneDec(nanCheck(g.payrollTotal/pInt('#Total_Operating_Expenses_Total')*100)));		//%

  $('#Repairs_and_Maintenance_DollarPerUnit').text(roundTwoDec(nanCheck(g.repairsAndMaintenanceTotal/tu)));		//$
  $('#Repairs_and_Maintenance_DollarPerSF').text(roundTwoDec(nanCheck(g.repairsAndMaintenanceTotal/tsf)));		//$
  $('#Repairs_and_Maintenance_PercentofTotal').text(roundOneDec(nanCheck(g.repairsAndMaintenanceTotal/pInt('#Total_Operating_Expenses_Total')*100)));		//%

  $('#Contract_Services_DollarPerUnit').text(roundTwoDec(nanCheck(g.contractServicesTotal/tu)));		//$
  $('#Contract_Services_DollarPerSF').text(roundTwoDec(nanCheck(g.contractServicesTotal/tsf)));		//$
  $('#Contract_Services_PercentofTotal').text(roundOneDec(nanCheck(g.contractServicesTotal/pInt('#Total_Operating_Expenses_Total')*100)));		//%

  $('#Turnover_DollarPerUnit').text(roundTwoDec(nanCheck(g.turnoverTotal/tu)));		//$
  $('#Turnover_DollarPerSF').text(roundTwoDec(nanCheck(g.turnoverTotal/tsf)));		//$
  $('#Turnover_PercentofTotal').text(roundOneDec(nanCheck(g.turnoverTotal/pInt('#Total_Operating_Expenses_Total')*100)));		//%

  $('#Sales_and_Marketing_DollarPerUnit').text(
    FormatCurrency(nanCheck(g.salesAndMarketingTotal/tu)));		//$
  $('#Sales_and_Marketing_DollarPerSF').text(
    FormatCurrency(nanCheck(g.salesAndMarketingTotal/tsf)));		//$
  $('#Sales_and_Marketing_PercentofTotal').text(
    FormatPercent(nanCheck(g.salesAndMarketingTotal/pInt('#Total_Operating_Expenses_Total')*100)));		//%

  $('#Administrative_DollarPerUnit').text(
    FormatCurrency(nanCheck(g.administrativeTotal/tu)));		//$
  $('#Administrative_DollarPerSF').text(
    FormatCurrency(nanCheck(g.administrativeTotal/tsf)));		//$
  $('#Administrative_PercentofTotal').text(
    FormatPercent(nanCheck(g.administrativeTotal/pInt('#Total_Operating_Expenses_Total')*100)));		//%

  $('#Management_Total').text(
    roundTwoDec(nanCheck(g.managementPercentage * pInt('#Net_Rental_Income_Total'))));		//$
  $('#Management_DollarPerUnit').text(
    FormatCurrency(nanCheck(pInt('#Management_Total')/tu)));								//$
  $('#Management_DollarPerSF').text(
    FormatCurrency(nanCheck(pInt('#Management_Total')/tsf)));					//$
  $('#Management_PercentofTotal').text(
    FormatPercent(nanCheck(pInt('#Management_Total')/pInt('#Total_Operating_Expenses_Total')*100)));		//%

  $('#Replacement_Reserves_Total').text(
    FormatCurrency(nanCheck(g.replacementReservesPercentage * pInt('#Net_Rental_Income_Total'))));		//$
  $('#Replacement_Reserves_DollarPerUnit').text(
    FormatCurrency(nanCheck(pInt('#Replacement_Reserves_Total')/tu)));					//$
  $('#Replacement_Reserves_DollarPerSF').text(
    FormatCurrency(nanCheck(pInt('#Replacement_Reserves_Total')/tsf)));		//$
  $('#Replacement_Reserves_PercentofTotal').text(
    FormatPercent(nanCheck(pInt('#Replacement_Reserves_Total')/pInt('#Total_Operating_Expenses_Total')*100)));		//%

  $('#Total_Operating_Expenses_Total').text(
    FormatCurrency(nanCheck(g.realEstateTaxesTotal + g.insuranceTotal + g.utilitiesTotal + g.payrollTotal + g.repairsAndMaintenanceTotal + g.contractServicesTotal + g.turnoverTotal + g.salesAndMarketingTotal + g.administrativeTotal + pInt('#Management_Total') + pInt('#Replacement_Reserves_Total')))); 		//$
  $('#Total_Operating_Expenses_DollarPerUnit').text(
    FormatCurrency(nanCheck(pInt('#Total_Operating_Expenses_Total')/tu)));					//$
  $('#Total_Operating_Expenses_DollarPerSF').text(
    FormatCurrency(nanCheck(pInt('#Total_Operating_Expenses_Total')/tsf)));		//$
  $('#Total_Operating_Expenses_PercentofTotal').text(
    FormatPercent(nanCheck(pFloat('#Real_Estate_Taxes_PercentofTotal') + pFloat('#Insurance_PercentofTotal') + pFloat('#Utilities_PercentofTotal') + pFloat('#Payroll_PercentofTotal') + pFloat('#Repairs_and_Maintenance_PercentofTotal') + pFloat('#Contract_Services_PercentofTotal') + pFloat('#Turnover_PercentofTotal') + pFloat('#Sales_and_Marketing_PercentofTotal') + pFloat('#Administrative_PercentofTotal') + pFloat('#Management_PercentofTotal') + pFloat('#Replacement_Reserves_PercentofTotal'))));		//%

  $('#Net_Operating_Income_Total').text(
    FormatCurrency(nanCheck(pInt('#Net_Rental_Income_Total') - pInt('#Total_Operating_Expenses_Total'))));		//$
  $('#Net_Operating_Income_DollarPerUnit').text(
    FormatCurrency(nanCheck(pInt('#Net_Operating_Income_Total')/tu)));											//$
  $('#Net_Operating_Income_DollarPerSF').text(
    FormatCurrency(nanCheck(pInt('#Net_Operating_Income_Total')/tsf)));									//$

  $("td:contains('NaN')").each(function() {
    $(this).text('0');
  });

}; //end DashboardInput
