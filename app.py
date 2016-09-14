import os
from flask import *
#from model import *

app = Flask(__name__)







@app.route("/")
def index():
    title = "Home"
    return render_template("base.html",
        title = title)

@app.route("/login")
def login():
    return render_template("login.html")

@app.route("/logout")
def logout():
    pass

@app.route("/dashboard")
def dashboard():
    title = "Dashboard"

    #INPUT VARIABLES
    #Property Information Table
    property_name = request.form.get('Property_Name')
    property_location = request.form.get('Property_Address')
    property_type = request.form.get('Property_Type')
    #Purchase Information Table
    purchase_price = request.form.get('Purchase_Price')
    closing_costs_percentage = request.form.get('Closing_Costs_Percentage')
    #Sale Assumption Table
    sale_year = request.form.get('Sale_Year')
    terminal_cap_rate = request.form.get('Terminal_Cap_Rate')
    sales_costs = request.form.get('Sales_Costs')
    #Financial Assumptions Table
    leverage = request.form.get('Leverage')
    interest_rate_on_mortgage = request.form.get('Interest_Rate_on_Mortgage')
    loan_term = request.form.get('Loan_Term')
    loan_amortization = request.form.get('Loan_Amortization')
    #Returns Summary Table
    ul_discount_rate = request.form.get('UL_Discount_Rate')
    l_discount_rate = request.form.get('L_Discout_Rate')
    #Current Financial Performance Table
    other_income_total = request.form.get('Other_Income_Total')
    less_vacancy = request.form.get('Less_Vacancy')
    less_concessions = request.form.get('Less_Concessions')
    less_credit_loss = request.form.get('Less_Credit_Loss')
    real_estate_taxes_total = request.form.get('Real_Estate_Taxes_Total')#Why total?
    insurance_total = request.form.get('Insurance_Total')
    utilities_total = request.form.get('Utilities_Total')
    payroll_total = request.form.get('Payroll_Total')
    repairs_and_maintenance_total = request.form.get('Repairs_and_Maintenance_Total')
    contract_services_total = request.form.get('Contract_Services_Total')
    turnover_total = request.form.get('Turnover_Total')
    sales_and_marketing_total = request.form.get('Sales_and_Marketing_Total')
    administrative = request.form.get('Administrative_Total')
    management_percentage = request.form.get('Management_Percentage')
    replacement_reserves_percentage = request.form.get('Replacement_Reserves_Percentage')

    #CALCULATIONS VARIABLES
    # ========================================================================================
    #Property Information Table
    Num_Units = 0       # {total Num_Units of Rental Rate Assumptions}
    Total_Sq_Ft = 0     # {total Sq_Ft of Rental Rate Assumptions}

    #Purchase Information Table
    Closing_Costs = closing_costs_percentage * purchase_price
    Total_Costs = Closing_Costs + purchase_price
    Purchase_Cost_Per_Unit = purchase_price/Num_Units
    Total_Cost_Per_Unit = Total_Costs/Num_Units
    Purchase_Cost_Per_SF = purchase_price/Total_Sq_Ft
    Total_Cost_Per_SF = Total_Costs/Total_Sq_Ft
    Cap_Rate_on_Purchase_Price = Net_Operating_Income_Total/purchase_price
    Cap_Rate_on_Total_Price = Net_Operating_Income_Total/Total_Costs

    #Sales Assumptions Table
    # {all input fields}

    #Sales Summary Table
    Sale_Price = 100       #{=HLOOKUP(Sale_Year+1,Proforma!C4:M30,27)/Terminal_Cap}
    Sale_Price_Per_Unit = Sale_Price/Num_Units
    Sale_Price_Per_SF = Sale_Price/Total_Sq_Ft

    #Finance Assumptions Table
    # {all input fields}

    #Sources And Uses Table
    Equity_Total = Total_Costs - Loan_Total
    Equity_DollarPerUnit = Equity_Total/Num_Units
    Equity_DollarPerSF = Equity_Total/Total_Sq_Ft
    Equity_PercentofTotal = Equity_Total/Total_Sources_Total

    Loan_Total = Total_Costs*leverage
    Loan_DollarPerUnit = Loan_Total/Num_Units
    Loan_DollarPerSF = Loan_Total/Total_Sq_Ft
    Loan_PercentofTotal = Loan_Total/Total_Sources_Total

    Total_Sources_Total = Equity_Total + Loan_Total
    Total_Sources_DollarPerUnit = Equity_DollarPerUnit + Loan_DollarPerUnit
    Total_Sources_DollarPerSF = Equity_DollarPerSF + Loan_DollarPerSF
    Total_Sources_PercentofTotal = Equity_PercentofTotal + Loan_PercentofTotal

    Purchasing_Price_Total = purchase_price
    Purchasing_Price_DollarPerUnit = Purchasing_Price_Total/Num_Units
    Purchasing_Price_DollarPerSF = Purchasing_Price_Total/Total_Sq_Ft
    Purchasing_Price_PercentofTotal = Purchasing_Price_Total/Total_Uses_Total

    Closing_Costs_Total = Closing_Costs
    Closing_Costs_DollarPerUnit = Closing_Costs/Num_Units
    Closing_Costs_DollarPerSF = Closing_Costs/Total_Sq_Ft
    Closing_Costs_PercentofTotal = Closing_Costs/Total_Uses_Total

    Total_Uses_Total = Purchasing_Price_Total + Closing_Costs_Total
    Total_Uses_DollarPerUnit = Purchasing_Price_DollarPerUnit + Closing_Costs_DollarPerUnit
    Total_Uses_DollarPerSF = Purchasing_Price_DollarPerSF + Closing_Costs_DollarPerSF
    Total_Uses_PercentofTotal = Purchasing_Price_PercentofTotal + Closing_Costs_PercentofTotal
 
    #Rental Rate Assumptions Table ***dynamic***
    # TBD

    #Returns Summary Table
    UL_Net_Profit = # {=SUM('Returns Summary'!C24:M24)}
    UL_Present_Value = 
    UL_Net_Present_Value =
    UL_Equity_Multiple =
    UL_IRR =
    UL_IRR_from_CF =
    UL_IRR_from_Sale =
    UL_Cash_On_Cash = 

    L_Net_Profit =
    L_Present_Value =
    L_Net_Present_Value =
    L_Equity_Multiple =
    L_IRR =
    L_IRR_from_CF =
    L_IRR_from_Sale =
    L_Cash_On_Cash =
 
    #Current Financial Performance Table
    Rental_Income_Total = # {=((SUMPRODUCT(G18:G20,K18:K20)*12))}
    Rental_Income_DollarPerUnit = Rental_Income_Total/Num_Units
    Rental_Income_DollarPerSF = Rental_Income_Total/Total_Sq_Ft
    Rental_Income_PercentofTotal = Rental_Income_Total/Gross_Rental_Income_Total

    Other_Income_DollarPerUnit = other_income_total/Num_Units
    Other_Income_DollarPerSF = other_income_total/Total_Sq_Ft
    Other_Income_PercentofTotal = other_income_total/Gross_Rental_Income_Total

    Gross_Rental_Income_Total = other_income_total + Rental_Income_Total
    Gross_Rental_Income_DollarPerUnit = Rental_Income_DollarPerUnit + Other_Income_DollarPerUnit
    Gross_Rental_Income_DollarPerSF = Rental_Income_DollarPerSF + Other_Income_DollarPerSF
    Gross_Rental_Income_PercentofTotal = Rental_Income_PercentofTotal + Other_Income_PercentofTotal

    Vacancy_Total = #negative nums
    Vacancy_DollarPerUnit = #negative nums
    Vacancy_DollarPerSF = #negative nums

    Concessions_Total = #negative nums
    Concessions_DollarPerUnit = #negative nums
    Concessions_DollarPerSF = #negative nums

    Credit_Loss_Total = #negative nums
    Credit_Loss_DollarPerUnit = #negative nums
    Credit_Loss_DollarPerSF = #negative nums

    Net_Rental_Income_Total =
    Net_Rental_Income_DollarPerUnit =
    Net_Rental_Income_DollarPerSF =

    Real_Estate_Taxes_DollarPerUnit =
    Real_Estate_Taxes_DollarPerSF =
    Real_Estate_Taxes_PercentofTotal =

    Insurance_DollarPerUnit =
    Insurance_DollarPerSF =
    Insurance_PercentofTotal =

    Utilities_DollarPerUnit =
    Utilities_DollarPerSF =
    Utilities_PercentofTotal =

    Payroll_DollarPerUnit =
    Payroll_DollarPerSF =
    Payroll_PercentofTotal =

    Repairs_and_Maintenance_DollarPerUnit =
    Repairs_and_Maintenance_DollarPerSF =
    Repairs_and_Maintenance_PercentofTotal =

    Contract_Services_DollarPerUnit =
    Contract_Services_DollarPerSF =
    Contract_Services_PercentofTotal =

    Turnover_DollarPerUnit =
    Turnover_DollarPerSF =
    Turnover_PercentofTotal =

    Sales_and_Marketing_DollarPerUnit =
    Sales_and_Marketing_DollarPerSF =
    Sales_and_Marketing_PercentofTotal =

    Administrative_DollarPerUnit =
    Administrative_DollarPerSF =
    Administrative_PercentofTotal =

    Management_Total =
    Management_DollarPerUnit =
    Management_DollarPerSF =
    Management_PercentofTotal =

    Replacement_Reserves_Total =
    Replacement_Reserves_DollarPerUnit =
    Replacement_Reserves_DollarPerSF =
    Replacement_Reserves_PercentofTotal =

    Total_Operating_Expenses_Total =
    Total_Operating_Expenses_DollarPerUnit =
    Total_Operating_Expenses_DollarPerSF =
    Total_Operating_Expenses_PercentofTotal =

    Net_Operating_Income_Total =
    Net_Operating_Income_DollarPerUnit =
    Net_Operating_Income_DollarPerSF =
    #Market Rental Assumptions Table #***dynamic***

    return render_template("dashboard.html",
        title = title)

@app.route("/performa")
def performa():
    title = "Performa"
    return render_template("performa.html",
        title=title )

@app.route('/returnsummary')
def returnSum():
    title = "Return Summary"
    return render_template('returns_summary.html',
        title=title)

@app.route('/inputform')
def inputForm():
    title="Input Form"
    return render_template('input_form.html',
        title = title)

if __name__ == "__main__":
    app.run(port=3000,debug=True)
