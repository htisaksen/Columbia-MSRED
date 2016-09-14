import os
from flask import *
#from model import *

app = Flask(__name__)

#INPUT VARIABLES
#Property Information Table
property_name = request.form.get('Property_Name')
property_location = request.form.get('Property_Address')
property_type = request.form.get('Property_Type')
#Purchase Information Table
purchase_price = request.form.get('Purchase_Price')
closing_costs = request.form.get('Closing_Costs')
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
#Property Information Table
number_of_units =
total_square_feet =
#Purchase Information Table
closing_costs =
pit_total_cost =
purchase_cost_per_unit =
total_cost_per_unit =
purchase_cost_per_sf =
total_cost_per_sf =
cap_rate_on_purchase_price =
cap_rate_on_total_price =
#Sales Assumptions Table
#Sales Summary Table
sale_price =
sale_price_per_unit =
sale_price_per_sf =
#Finance Assumptions Table
#Sources And Uses Table
e_total =
e_unit =
e_sf =
e_percent_of_total =

l_total =
l_unit =
l_sf =
l_percent_of_total =

total_of_sources =
total_sources_unit =
total_sources_sf =
total_sources_percent_of_total =

pp_total =
pp_unit =
pp_sf =
pp_percent_of_total =

cc_total =
cc_unit =
cc_sf =
cc_percent_of_total =

total_of_uses =
total_uses_unit =
total_uses_sf =
total_unit_percent_of_total =
#Rental Rate Assumptions Table ***dynamic***
#Returns Summary Table
ul_net_profit =
ul_discount_rate =
ul_present_value =
ul_net_present_value =
ul_equity_multiple =
ul_irr =
ul_irr_from_cf =
ul_irr_from_sale =
ul_cash_on_cash =

l_net_profit =
l_discount_rate =
l_present_value =
l_net_present_value =
l_equity_multiple =
l_irr =
l_irr_from_cf =
l_irr_from_sale =
l_cash_on_cash =
#Current Financial Performance Table
rental_income_total =
rental_income_unit =
rental_income_sf =
rental_income_percent_of_total =

other_income_unit =
other_unit_sf =
other_unit_percent_of_total =

gross_rental_income_total_totals =
gross_rental_income_unit_totals =
gross_rental_income_sf_totals =
gross_rental_income_percent_of_total_totals =

less_vacancy_total = #negative nums
less_vacancy_unit = #negative nums
less_vacancy_sf = #negative nums

less_concessions_total = #negative nums
less_concessions_unit = #negative nums
less_concessions_sf = #negative nums

less_credit_loss_total = #negative nums
less_credit_loss_unit = #negative nums
less_credit_loss_sf = #negative nums

net_rental_income_totals =
net_rental_income_unit_totals =
net_rental_income_sf_totals =

real_estate_taxes_unit =
real_estate_taxes_sf =
real_estate_taxes_percent_of_total =

insurance_unit =
insurance_sf =
insurance_percent_of_total =

utilities_unit =
utilities_sf =
utilities_percent_of_total =

payroll_unit =
payroll_sf =
payroll_percent_of_total =

repairs_and_maintenance_unit =
repairs_and_maintenance_sf =
repairs_and_maintenance_percent_of_total =

contract_services_unit =
contract_services_sf =
contract_services_percent_of_total =

turnover_unit =
turnover_sf =
turnover_percent_of_total =

sales_and_marketing_unit =
sales_and_marketing_sf =
sales_and_marketing_percent_of_total =

administrative_unit =
administrative_sf =
administrative_percent_of_total =

management_total =
management_unit =
management_sf =
management_percent_of_total =

replacement_reserves_total =
replacement_reserves_unit =
replacement_reserves_sf =
replacement_reserves_percent_of_total =

total_operating_expenses_total_totals =
total_operating_expenses_unit_totals =
total_operating_expenses_sf_totals =
total_operating_expenses_percent_of_total_totals =

net_operating_income_total_totals =
net_operating_income_unit_totals =
net_operating_income_sf_totals =
#Market Rental Assumptions Table ***dynamic***



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
