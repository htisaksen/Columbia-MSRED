
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



  myApp.dashboard.dashboardInput = function(){
  var g = myApp.dashboard.getInputs();
  var remSpcChr = myApp.utils.remSpcChr;
  var pInt = myApp.utils.pInt;
  var pFloat = myApp.utils.pFloat;
  var nanCheck = myApp.utils.nanCheck
  var roundOneDec = myApp.utils.roundOneDec
  var roundTwoDec = myApp.utils.roundTwoDec
  var FormatCurrency = myApp.utils.FormatCurrency
  var FormatPercent1 = myApp.utils.FormatPercent1
  var FormatPercent2 = myApp.utils.FormatPercent2
  //VARIABLES FOR CALCULATIONS-------------------------------------------------------
  var totalUnits = pInt('#Rental_Rate_Assumptions tfoot .total_units');
  var totalSquareFoot = pInt('#Rental_Rate_Assumptions tfoot .total_sf');
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
    FormatPercent2(nanCheck(pInt('#Net_Operating_Income_Total')/g.purchasePrice)*100));		//%
  $('#PI_Cap_Rate_on_Total_Price').text(
    FormatPercent2(nanCheck(pInt('#Net_Operating_Income_Total')/pInt('#PI_Total_Costs'))*100));		//%


  //Sale Summary Calculations
  $('#Sale_Price').text(
    FormatCurrency(nanCheck(pFloat('.PF_Net_Operating_Income:last')/g.terminalCapRate)))
  $('#Sale_Price_Per_Unit').text(
    FormatCurrency(nanCheck(pFloat('#Sale_Price')/totalUnits)))
  $('#Sale_Price_Per_SF').text(
    FormatCurrency(nanCheck(pFloat('#Sale_Price')/totalSquareFoot)))


  //Sources and Uses Calculations
    //Equity
  $('#PI_Total_Cost_Per_Unit').text(FormatCurrency(nanCheck(pInt('#PI_Total_Costs')/pInt('#prop_info_total_num_units'))));		//$

    //Loans
  $('#Loan_Total').text(FormatCurrency(nanCheck(pInt('#PI_Total_Costs')*g.leverage)));

    // #Sources And Uses Table
  $('#Equity_Total').text(FormatCurrency(nanCheck(pInt('#PI_Total_Costs') - pInt('#Loan_Total'))));
  $('#Equity_DollarPerUnit').text(FormatCurrency(nanCheck(pInt('#Equity_Total')/totalUnits)));
  $('#Equity_DollarPerSF').text(FormatCurrency(nanCheck(pInt('#Equity_Total')/totalSquareFoot)));
  $('#Equity_PercentofTotal').text(FormatPercent1(nanCheck(pFloat('#Equity_Total')/pFloat('#Total_Sources_Total')*100)));

  $('#Loan_Total').text(FormatCurrency(nanCheck(pInt('#PI_Total_Costs')*g.leverage)));
  $('#Loan_DollarPerUnit').text(FormatCurrency(nanCheck(pInt('#Loan_Total')/totalUnits)));
  $('#Loan_DollarPerSF').text(FormatCurrency(nanCheck(pInt('#Loan_Total')/totalSquareFoot)));
  $('#Loan_PercentofTotal').text(FormatPercent1(nanCheck(pFloat('#Loan_Total')/pFloat('#Total_Sources_Total')*100)));

  $('#Total_Sources_Total').text(FormatCurrency(nanCheck(pInt('#Equity_Total') + pInt('#Loan_Total'))));
  $('#Total_Sources_DollarPerUnit').text(FormatCurrency(nanCheck(pInt('#Equity_DollarPerUnit') + pInt('#Loan_DollarPerUnit'))));
  $('#Total_Sources_DollarPerSF').text(FormatCurrency(nanCheck(pInt('#Equity_DollarPerSF') + pInt('#Loan_DollarPerSF'))));
  $('#Total_Sources_PercentofTotal').text(FormatPercent1(nanCheck(pFloat('#Equity_PercentofTotal') + pFloat('#Loan_PercentofTotal'))));

  $('#Purchasing_Price_Total').text(FormatCurrency(nanCheck(g.purchasePrice)))
  $('#Purchasing_Price_DollarPerUnit').text(FormatCurrency(nanCheck(pInt('#Purchasing_Price_Total')/totalUnits)));
  $('#Purchasing_Price_DollarPerSF').text(FormatCurrency(nanCheck(pInt('#Purchasing_Price_Total')/totalSquareFoot)));
  $('#Purchasing_Price_PercentofTotal').text(FormatPercent1(nanCheck(pFloat('#Purchasing_Price_Total')/pFloat('#Total_Uses_Total')*100)));

  $('#Closing_Costs_Total').text(FormatCurrency(nanCheck(pInt('#PI_Closing_Costs'))));
  $('#Closing_Costs_DollarPerUnit').text(FormatCurrency(nanCheck(pInt('#PI_Closing_Costs')/totalUnits)));
  $('#Closing_Costs_DollarPerSF').text(FormatCurrency(nanCheck(pInt('#PI_Closing_Costs')/totalSquareFoot)));
  $('#Closing_Costs_PercentofTotal').text(FormatPercent1(nanCheck(pFloat('#PI_Closing_Costs')/pFloat('#Total_Uses_Total')*100)));

  $('#Total_Uses_Total').text(FormatCurrency(nanCheck(pInt('#Purchasing_Price_Total') + pInt('#Closing_Costs_Total'))));
  $('#Total_Uses_DollarPerUnit').text(FormatCurrency(nanCheck(pInt('#Purchasing_Price_DollarPerUnit') + pInt('#Closing_Costs_DollarPerUnit'))));
  $('#Total_Uses_DollarPerSF').text(FormatCurrency(nanCheck(pFloat('#Purchasing_Price_DollarPerSF') + pFloat('#Closing_Costs_DollarPerSF'))));
  $('#Total_Uses_PercentofTotal').text(FormatPercent1(nanCheck(pFloat('#Purchasing_Price_PercentofTotal') + pFloat('#Closing_Costs_PercentofTotal'))));
  //
  // #Returns Summary Table
  // UL_Net_Profit = 0
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


// Current Financial Performance Table
  //moved formulas to top to prevent 'infinity' error
  $('#Gross_Rental_Income_Total').text(FormatCurrency(nanCheck(g.otherIncomeTotal + pInt('#Rental_Income_Total'))));				//$
  $('#Rental_Income_Total').text(FormatCurrency(nanCheck(pInt('#Rental_Rate_Assumptions tfoot .rent_per_unit')*totalUnits*12)));		//$

  $('#Rental_Income_DollarPerUnit').text(FormatCurrency(nanCheck(pInt('#Rental_Income_Total')/totalUnits)));			//$
  $('#Rental_Income_DollarPerSF').text(FormatCurrency(nanCheck(pInt('#Rental_Income_Total')/totalSquareFoot)));			//$
  $('#Rental_Income_PercentofTotal').text(FormatPercent1(nanCheck(pFloat('#Rental_Income_Total'))/(pFloat('#Gross_Rental_Income_Total'))*100));		//%

  $('#Other_Income_DollarPerUnit').text(FormatCurrency(nanCheck(g.otherIncomeTotal/totalUnits)));		//$
  $('#Other_Income_DollarPerSF').text(FormatCurrency(nanCheck(g.otherIncomeTotal/totalSquareFoot)));		//$
  $('#Other_Income_PercentofTotal').text(FormatPercent1(nanCheck(g.otherIncomeTotal/pFloat('#Gross_Rental_Income_Total')*100)));		//%

  $('#Gross_Rental_Income_DollarPerUnit').text(FormatCurrency(nanCheck(pInt('#Rental_Income_DollarPerUnit') + pInt('#Other_Income_DollarPerUnit'))));		//$
  $('#Gross_Rental_Income_DollarPerSF').text(FormatCurrency(nanCheck(pInt('#Gross_Rental_Income_Total')/totalSquareFoot)));		//$
  $('#Gross_Rental_Income_PercentofTotal').text(FormatPercent1(nanCheck(pFloat('#Rental_Income_PercentofTotal') + pFloat('#Other_Income_PercentofTotal'))));		//%

  $('#Vacancy_Total').text(FormatCurrency(nanCheck(-1 * g.lessVacancy * pInt('#Gross_Rental_Income_Total'))));		//$
  $('#Vacancy_DollarPerUnit').text(FormatCurrency(nanCheck(pInt('#Vacancy_Total')/totalUnits)));		//$
  $('#Vacancy_DollarPerSF').text(FormatCurrency(nanCheck(pInt('#Vacancy_Total')/totalSquareFoot)));		//$

  $('#Concessions_Total').text(FormatCurrency(nanCheck(-1 * g.lessConcessions * pInt('#Gross_Rental_Income_Total'))));		//$
  $('#Concessions_DollarPerUnit').text(FormatCurrency(nanCheck(pInt('#Concessions_Total')/totalUnits)));		//$
  $('#Concessions_DollarPerSF').text(FormatCurrency(nanCheck(pInt('#Concessions_Total')/totalSquareFoot)));		//$

  $('#Credit_Loss_Total').text(FormatCurrency(nanCheck(-1 * g.lessCreditLoss * pInt('#Gross_Rental_Income_Total'))));		//$
  $('#Credit_Loss_DollarPerUnit').text(FormatCurrency(nanCheck(pInt('#Credit_Loss_Total')/totalUnits)));		//$
  $('#Credit_Loss_DollarPerSF').text(FormatCurrency(nanCheck(pInt('#Credit_Loss_Total')/totalSquareFoot)));		//$

  $('#Net_Rental_Income_Total').text(FormatCurrency(nanCheck(pInt('#Gross_Rental_Income_Total') + pInt('#Vacancy_Total') + pInt('#Concessions_Total') + pInt('#Credit_Loss_Total'))));		//$
  $('#Net_Rental_Income_DollarPerUnit').text(FormatCurrency(nanCheck(pInt('#Net_Rental_Income_Total')/totalUnits)));		//$
  $('#Net_Rental_Income_DollarPerSF').text(FormatCurrency(nanCheck(pInt('#Net_Rental_Income_Total')/totalSquareFoot)));		//$

  $('#Real_Estate_Taxes_DollarPerUnit').text(FormatCurrency(nanCheck(g.realEstateTaxesTotal/totalUnits)));		//$
  $('#Real_Estate_Taxes_DollarPerSF').text(FormatCurrency(nanCheck(g.realEstateTaxesTotal/totalSquareFoot)));		//$
  $('#Real_Estate_Taxes_PercentofTotal').text(FormatPercent1(nanCheck(g.realEstateTaxesTotal/pInt('#Total_Operating_Expenses_Total')*100)));		//%

  $('#Insurance_DollarPerUnit').text(FormatCurrency(nanCheck(g.insuranceTotal/totalUnits)));		//$
  $('#Insurance_DollarPerSF').text(FormatCurrency(nanCheck(g.insuranceTotal/totalSquareFoot)));		//$
  $('#Insurance_PercentofTotal').text(FormatPercent1(nanCheck(g.insuranceTotal/pInt('#Total_Operating_Expenses_Total')*100)));		//%

  $('#Utilities_DollarPerUnit').text(FormatCurrency(nanCheck(g.utilitiesTotal/totalUnits)));		//$
  $('#Utilities_DollarPerSF').text(FormatCurrency(nanCheck(g.utilitiesTotal/totalSquareFoot)));		//$
  $('#Utilities_PercentofTotal').text(FormatPercent1(nanCheck(g.utilitiesTotal/pInt('#Total_Operating_Expenses_Total')*100)));		//%

  $('#Payroll_DollarPerUnit').text(FormatCurrency(nanCheck(g.payrollTotal/totalUnits)));		//$
  $('#Payroll_DollarPerSF').text(FormatCurrency(nanCheck(g.payrollTotal/totalSquareFoot)));		//$
  $('#Payroll_PercentofTotal').text(FormatPercent1(nanCheck(g.payrollTotal/pInt('#Total_Operating_Expenses_Total')*100)));		//%

  $('#Repairs_and_Maintenance_DollarPerUnit').text(FormatCurrency(nanCheck(g.repairsAndMaintenanceTotal/totalUnits)));		//$
  $('#Repairs_and_Maintenance_DollarPerSF').text(FormatCurrency(nanCheck(g.repairsAndMaintenanceTotal/totalSquareFoot)));		//$
  $('#Repairs_and_Maintenance_PercentofTotal').text(FormatPercent1(nanCheck(g.repairsAndMaintenanceTotal/pInt('#Total_Operating_Expenses_Total')*100)));		//%

  $('#Contract_Services_DollarPerUnit').text(FormatCurrency(nanCheck(g.contractServicesTotal/totalUnits)));		//$
  $('#Contract_Services_DollarPerSF').text(FormatCurrency(nanCheck(g.contractServicesTotal/totalSquareFoot)));		//$
  $('#Contract_Services_PercentofTotal').text(FormatPercent1(nanCheck(g.contractServicesTotal/pInt('#Total_Operating_Expenses_Total')*100)));		//%

  $('#Turnover_DollarPerUnit').text(FormatCurrency(nanCheck(g.turnoverTotal/totalUnits)));		//$
  $('#Turnover_DollarPerSF').text(FormatCurrency(nanCheck(g.turnoverTotal/totalSquareFoot)));		//$
  $('#Turnover_PercentofTotal').text(FormatPercent1(nanCheck(g.turnoverTotal/pInt('#Total_Operating_Expenses_Total')*100)));		//%

  $('#Sales_and_Marketing_DollarPerUnit').text(
    FormatCurrency(nanCheck(g.salesAndMarketingTotal/totalUnits)));		//$
  $('#Sales_and_Marketing_DollarPerSF').text(
    FormatCurrency(nanCheck(g.salesAndMarketingTotal/totalSquareFoot)));		//$
  $('#Sales_and_Marketing_PercentofTotal').text(
    FormatPercent1(nanCheck(g.salesAndMarketingTotal/pInt('#Total_Operating_Expenses_Total')*100)));		//%

  $('#Administrative_DollarPerUnit').text(
    FormatCurrency(nanCheck(g.administrativeTotal/totalUnits)));		//$
  $('#Administrative_DollarPerSF').text(
    FormatCurrency(nanCheck(g.administrativeTotal/totalSquareFoot)));		//$
  $('#Administrative_PercentofTotal').text(
    FormatPercent1(nanCheck(g.administrativeTotal/pInt('#Total_Operating_Expenses_Total')*100)));		//%

  $('#Management_Total').text(
    FormatCurrency(nanCheck(g.managementPercentage * pInt('#Net_Rental_Income_Total'))));		//$
  $('#Management_DollarPerUnit').text(
    FormatCurrency(nanCheck(pInt('#Management_Total')/totalUnits)));								//$
  $('#Management_DollarPerSF').text(
    FormatCurrency(nanCheck(pInt('#Management_Total')/totalSquareFoot)));					//$
  $('#Management_PercentofTotal').text(
    FormatPercent1(nanCheck(pInt('#Management_Total')/pInt('#Total_Operating_Expenses_Total')*100)));		//%

  $('#Replacement_Reserves_Total').text(
    FormatCurrency(nanCheck(g.replacementReservesPercentage * pInt('#Net_Rental_Income_Total'))));		//$
  $('#Replacement_Reserves_DollarPerUnit').text(
    FormatCurrency(nanCheck(pInt('#Replacement_Reserves_Total')/totalUnits)));					//$
  $('#Replacement_Reserves_DollarPerSF').text(
    FormatCurrency(nanCheck(pInt('#Replacement_Reserves_Total')/totalSquareFoot)));		//$
  $('#Replacement_Reserves_PercentofTotal').text(
    FormatPercent1(nanCheck(pInt('#Replacement_Reserves_Total')/pInt('#Total_Operating_Expenses_Total')*100)));		//%

  $('#Total_Operating_Expenses_Total').text(
    FormatCurrency(nanCheck(g.realEstateTaxesTotal + g.insuranceTotal + g.utilitiesTotal + g.payrollTotal + g.repairsAndMaintenanceTotal + g.contractServicesTotal + g.turnoverTotal + g.salesAndMarketingTotal + g.administrativeTotal + pInt('#Management_Total') + pInt('#Replacement_Reserves_Total')))); 		//$
  $('#Total_Operating_Expenses_DollarPerUnit').text(
    FormatCurrency(nanCheck(pInt('#Total_Operating_Expenses_Total')/totalUnits)));					//$
  $('#Total_Operating_Expenses_DollarPerSF').text(
    FormatCurrency(nanCheck(pInt('#Total_Operating_Expenses_Total')/totalSquareFoot)));		//$
  $('#Total_Operating_Expenses_PercentofTotal').text(
    FormatPercent1(nanCheck(pFloat('#Real_Estate_Taxes_PercentofTotal') + pFloat('#Insurance_PercentofTotal') + pFloat('#Utilities_PercentofTotal') + pFloat('#Payroll_PercentofTotal') + pFloat('#Repairs_and_Maintenance_PercentofTotal') + pFloat('#Contract_Services_PercentofTotal') + pFloat('#Turnover_PercentofTotal') + pFloat('#Sales_and_Marketing_PercentofTotal') + pFloat('#Administrative_PercentofTotal') + pFloat('#Management_PercentofTotal') + pFloat('#Replacement_Reserves_PercentofTotal'))));		//%

  $('#Net_Operating_Income_Total').text(
    FormatCurrency(nanCheck(pInt('#Net_Rental_Income_Total') - pInt('#Total_Operating_Expenses_Total'))));		//$
  $('#Net_Operating_Income_DollarPerUnit').text(
    FormatCurrency(nanCheck(pInt('#Net_Operating_Income_Total')/totalUnits)));											//$
  $('#Net_Operating_Income_DollarPerSF').text(
    FormatCurrency(nanCheck(pInt('#Net_Operating_Income_Total')/totalSquareFoot)));									//$





}; //end dashboardInput
