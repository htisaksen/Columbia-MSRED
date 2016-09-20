import os, re
from flask import *
from model import *

app = Flask(__name__)







@app.route("/", methods=['POST','GET'])
def index():
	username = ''
	if session.get('logged_in'):
		username = session.get('username')
		user_text = "Welcome " + username + "!"
		return render_template('home.html', user_text = user_text)
	return redirect("/login")

@app.route("/login", methods=['POST','GET'])
def login():
	username = request.form.get('username')
	password = request.form.get('password')
	user_obj = User.query.filter_by(username=username).first()
	print("user_obj:", user_obj)

	if user_obj:
		if password == user_obj.password:
			session['logged_in'] = True
			session['username'] = user_obj.username
			return redirect('/')
	return render_template("login.html")

@app.route("/logout")
def logout():
	if session.get('logged_in') == True:
		session['logged_in'] = False
		session['username'] = False
	return redirect('/')


@app.route("/register")
def register():
	pass


@app.route("/dashboard", methods=['GET','POST'])
def dashboard():
	title = "Dashboard"
	if request.method =='GET':
		return render_template("dashboard.html")

	if request.method == 'POST':
		#INPUT VARIABLES
		#Property Information Table
		property_name = request.form.get('Property_Name')
		property_location = request.form.get('Property_Address')
		property_type = request.form.get('Property_Type')
		#Purchase Information Table

		if request.form.get('Purchase_Price',"").isnumeric():
			purchase_price = int(request.form.get('Purchase_Price'))
		else:
			purchase_price = 0

		if request.form.get('Closing_Costs_Percentage',"").isnumeric():
			closing_costs_percentage = int(request.form.get('Closing_Costs_Percentage'))
		else:
			closing_costs_percentage = 0

		print("="*40)
		print("Purchase Price:",purchase_price)
		print("closing cost percentage:", closing_costs_percentage)
		print("="*40)

				# #Sale Assumption Table)
		# sale_year = int(request.form.get('Sale_Year'))
		# terminal_cap_rate = int(request.form.get('Terminal_Cap_Rate'))
		# sales_costs = int(request.form.get('Sales_Costs'))
		# #Financial Assumptions Table
		# leverage = request.form.get('Leverage')
		# interest_rate_on_mortgage = request.form.get('Interest_Rate_on_Mortgage')
		# loan_term = request.form.get('Loan_Term')
		# loan_amortization = request.form.get('Loan_Amortization')
		# #Returns Summary Table
		# ul_discount_rate = request.form.get('UL_Discount_Rate')
		# l_discount_rate = request.form.get('L_Discout_Rate')
		# #Current Financial Performance Table
		# other_income_total = request.form.get('Other_Income_Total')
		# less_vacancy = request.form.get('Less_Vacancy')
		# less_concessions = request.form.get('Less_Concessions')
		# less_credit_loss = request.form.get('Less_Credit_Loss')
		# real_estate_taxes_total = request.form.get('Real_Estate_Taxes_Total')#Why total?
		# insurance_total = request.form.get('Insurance_Total')
		# utilities_total = request.form.get('Utilities_Total')
		# payroll_total = request.form.get('Payroll_Total')
		# repairs_and_maintenance_total = request.form.get('Repairs_and_Maintenance_Total')
		# contract_services_total = request.form.get('Contract_Services_Total')
		# turnover_total = request.form.get('Turnover_Total')
		# sales_and_marketing_total = request.form.get('Sales_and_Marketing_Total')
		# administrative = request.form.get('Administrative_Total')
		# management_percentage = request.form.get('Management_Percentage')
		# replacement_reserves_percentage = request.form.get('Replacement_Reserves_Percentage')


		Num_Units = 200       # {total Num_Units of Rental Rate Assumptions}
		Total_Sq_Ft = 200013     # {total Sq_Ft of Rental Rate Assumptions}

		#Purchase Information Table
		Closing_Costs = closing_costs_percentage * purchase_price
		Total_Costs = Closing_Costs + purchase_price
		Purchase_Cost_Per_Unit = purchase_price/Num_Units
		Total_Cost_Per_Unit = Total_Costs/Num_Units
		Purchase_Cost_Per_SF = purchase_price/Total_Sq_Ft
		Total_Cost_Per_SF = Total_Costs/Total_Sq_Ft





		return render_template("dashboard.html",
			title = title,
			Closing_Costs = Closing_Costs,
			Total_Costs = Total_Costs,
			Purchase_Cost_Per_Unit = Purchase_Cost_Per_Unit,
			Total_Cost_Per_Unit = Total_Cost_Per_Unit,
			Purchase_Cost_Per_SF = Purchase_Cost_Per_SF,
			Total_Cost_Per_SF = Total_Cost_Per_SF,
			)



def calculations():

	#CALCULATIONS VARIABLES
	# ========================================================================================
	#Property Information Table
	Num_Units = 200       # {total Num_Units of Rental Rate Assumptions}
	Total_Sq_Ft = 200013     # {total Sq_Ft of Rental Rate Assumptions}

	#Purchase Information Table
	Closing_Costs = closing_costs_percentage * purchase_price
	Total_Costs = Closing_Costs + purchase_price
	Purchase_Cost_Per_Unit = purchase_price/Num_Units
	Total_Cost_Per_Unit = Total_Costs/Num_Units
	Purchase_Cost_Per_SF = purchase_price/Total_Sq_Ft
	Total_Cost_Per_SF = Total_Costs/Total_Sq_Ft
	Cap_Rate_on_Purchase_Price = Net_Operating_Income_Total/purchase_price
	Cap_Rate_on_Total_Price = Net_Operating_Income_Total/Total_Costs

	# #Sales Assumptions Table
	# # {all input fields}

	# #Sales Summary Table
	# Sale_Price = 100       #{=HLOOKUP(Sale_Year+1,Proforma!C4:M30,27)/Terminal_Cap}
	# Sale_Price_Per_Unit = Sale_Price/Num_Units
	# Sale_Price_Per_SF = Sale_Price/Total_Sq_Ft

	# #Finance Assumptions Table
	# # {all input fields}

	# #Sources And Uses Table
	# Equity_Total = Total_Costs - Loan_Total
	# Equity_DollarPerUnit = Equity_Total/Num_Units
	# Equity_DollarPerSF = Equity_Total/Total_Sq_Ft
	# Equity_PercentofTotal = Equity_Total/Total_Sources_Total

	# Loan_Total = Total_Costs*leverage
	# Loan_DollarPerUnit = Loan_Total/Num_Units
	# Loan_DollarPerSF = Loan_Total/Total_Sq_Ft
	# Loan_PercentofTotal = Loan_Total/Total_Sources_Total

	# Total_Sources_Total = Equity_Total + Loan_Total
	# Total_Sources_DollarPerUnit = Equity_DollarPerUnit + Loan_DollarPerUnit
	# Total_Sources_DollarPerSF = Equity_DollarPerSF + Loan_DollarPerSF
	# Total_Sources_PercentofTotal = Equity_PercentofTotal + Loan_PercentofTotal

	# Purchasing_Price_Total = purchase_price
	# Purchasing_Price_DollarPerUnit = Purchasing_Price_Total/Num_Units
	# Purchasing_Price_DollarPerSF = Purchasing_Price_Total/Total_Sq_Ft
	# Purchasing_Price_PercentofTotal = Purchasing_Price_Total/Total_Uses_Total

	# Closing_Costs_Total = Closing_Costs
	# Closing_Costs_DollarPerUnit = Closing_Costs/Num_Units
	# Closing_Costs_DollarPerSF = Closing_Costs/Total_Sq_Ft
	# Closing_Costs_PercentofTotal = Closing_Costs/Total_Uses_Total

	# Total_Uses_Total = Purchasing_Price_Total + Closing_Costs_Total
	# Total_Uses_DollarPerUnit = Purchasing_Price_DollarPerUnit + Closing_Costs_DollarPerUnit
	# Total_Uses_DollarPerSF = Purchasing_Price_DollarPerSF + Closing_Costs_DollarPerSF
	# Total_Uses_PercentofTotal = Purchasing_Price_PercentofTotal + Closing_Costs_PercentofTotal

	# #Rental Rate Assumptions Table ***dynamic***
	# # TBD

	# #Returns Summary Table
	# UL_Net_Profit = 0       # {=SUM('Returns Summary'!C24:M24)}
	# UL_Present_Value = 0
	# UL_Net_Present_Value = 0
	# UL_Equity_Multiple = 0
	# UL_IRR = 0
	# UL_IRR_from_CF = 0
	# UL_IRR_from_Sale = 0
	# UL_Cash_On_Cash = 0

	# L_Net_Profit = 0
	# L_Present_Value = 0
	# L_Net_Present_Value = 0
	# L_Equity_Multiple = 0
	# L_IRR = 0
	# L_IRR_from_CF = 0
	# L_IRR_from_Sale = 0
	# L_Cash_On_Cash = 0

	# #Current Financial Performance Table
	# Rental_Income_Total = 0     # {=((SUMPRODUCT(G18:G20,K18:K20)*12))}
	# Rental_Income_DollarPerUnit = Rental_Income_Total/Num_Units
	# Rental_Income_DollarPerSF = Rental_Income_Total/Total_Sq_Ft
	# Rental_Income_PercentofTotal = Rental_Income_Total/Gross_Rental_Income_Total

	# Other_Income_DollarPerUnit = other_income_total/Num_Units
	# Other_Income_DollarPerSF = other_income_total/Total_Sq_Ft
	# Other_Income_PercentofTotal = other_income_total/Gross_Rental_Income_Total

	# Gross_Rental_Income_Total = other_income_total + Rental_Income_Total
	# Gross_Rental_Income_DollarPerUnit = Rental_Income_DollarPerUnit + Other_Income_DollarPerUnit
	# Gross_Rental_Income_DollarPerSF = Rental_Income_DollarPerSF + Other_Income_DollarPerSF
	# Gross_Rental_Income_PercentofTotal = Rental_Income_PercentofTotal + Other_Income_PercentofTotal

	# Vacancy_Total = -1 * less_vacancy * Gross_Rental_Income_Total         #negative nums
	# Vacancy_DollarPerUnit = Vacancy_Total/Num_Units        #negative nums
	# Vacancy_DollarPerSF = Vacancy_Total/Total_Sq_Ft      #negative nums

	# Concessions_Total = -1 * less_concessions * Gross_Rental_Income_Total        #negative nums
	# Concessions_DollarPerUnit = Concessions_Total/Num_Units        #negative nums
	# Concessions_DollarPerSF = Concessions_Total/Total_Sq_Ft      #negative nums

	# Credit_Loss_Total = -1 * less_credit_loss * Gross_Rental_Income_Total        #negative nums
	# Credit_Loss_DollarPerUnit = Credit_Loss_Total/Num_Units        #negative nums
	# Credit_Loss_DollarPerSF = Credit_Loss_Total/Total_Sq_Ft      #negative nums

	# Net_Rental_Income_Total = Gross_Rental_Income_Total + Vacancy_Total + Concessions_Total + Credit_Loss_Total
	# Net_Rental_Income_DollarPerUnit = Net_Rental_Income_Total/Num_Units
	# Net_Rental_Income_DollarPerSF = Net_Rental_Income_Total/Total_Sq_Ft

	# Real_Estate_Taxes_DollarPerUnit = real_estate_taxes_total/Num_Units
	# Real_Estate_Taxes_DollarPerSF = real_estate_taxes_total/Total_Sq_Ft
	# Real_Estate_Taxes_PercentofTotal = real_estate_taxes_total/Total_Operating_Expenses_Total

	# Insurance_DollarPerUnit = insurance_total/Num_Units
	# Insurance_DollarPerSF = insurance_total/Total_Sq_Ft
	# Insurance_PercentofTotal = insurance_total/Total_Operating_Expenses_Total

	# Utilities_DollarPerUnit = utilities_total/Num_Units
	# Utilities_DollarPerSF = utilities_total/Total_Sq_Ft
	# Utilities_PercentofTotal = utilities_total/Total_Operating_Expenses_Total

	# Payroll_DollarPerUnit = payroll_total/Num_Units
	# Payroll_DollarPerSF = payroll_total/Total_Sq_Ft
	# Payroll_PercentofTotal = payroll_total/Total_Operating_Expenses_Total

	# Repairs_and_Maintenance_DollarPerUnit = repairs_and_maintenance_total/Num_Units
	# Repairs_and_Maintenance_DollarPerSF = repairs_and_maintenance_total/Total_Sq_Ft
	# Repairs_and_Maintenance_PercentofTotal = repairs_and_maintenance_total/Total_Operating_Expenses_Total

	# Contract_Services_DollarPerUnit = contract_services_total/Num_Units
	# Contract_Services_DollarPerSF = contract_services_total/Total_Sq_Ft
	# Contract_Services_PercentofTotal = contract_services_total/Total_Operating_Expenses_Total

	# Turnover_DollarPerUnit = turnover_total/Num_Units
	# Turnover_DollarPerSF = turnover_total/Total_Sq_Ft
	# Turnover_PercentofTotal = turnover_total/Total_Operating_Expenses_Total

	# Sales_and_Marketing_DollarPerUnit = sales_and_marketing_total/Num_Units
	# Sales_and_Marketing_DollarPerSF = sales_and_marketing_total/Total_Sq_Ft
	# Sales_and_Marketing_PercentofTotal = sales_and_marketing_total/Total_Operating_Expenses_Total

	# Administrative_DollarPerUnit = administrative/Num_Units
	# Administrative_DollarPerSF = administrative/Total_Sq_Ft
	# Administrative_PercentofTotal = administrative/Total_Operating_Expenses_Total

	# Management_Total = management_percentage * Net_Rental_Income_Total
	# Management_DollarPerUnit = Management_Total/Num_Units
	# Management_DollarPerSF = Management_Total/Total_Sq_Ft
	# Management_PercentofTotal = Management_Total/Total_Operating_Expenses_Total

	# Replacement_Reserves_Total = replacement_reserves_percentage * Net_Rental_Income_Total
	# Replacement_Reserves_DollarPerUnit = Replacement_Reserves_Total/Num_Units
	# Replacement_Reserves_DollarPerSF = Replacement_Reserves_Total/Total_Sq_Ft
	# Replacement_Reserves_PercentofTotal = Replacement_Reserves_Total/Total_Operating_Expenses_Total

	# Total_Operating_Expenses_Total = real_estate_taxes_total + insurance_total + utilities_total + payroll_total + repairs_and_maintenance_total + contract_services_total + turnover_total + sales_and_marketing_total + administrative + Management_Total + Replacement_Reserves_Total
	# Total_Operating_Expenses_DollarPerUnit = Total_Operating_Expenses_Total/Num_Units
	# Total_Operating_Expenses_DollarPerSF = Total_Operating_Expenses_Total/Total_Sq_Ft
	# Total_Operating_Expenses_PercentofTotal = Real_Estate_Taxes_PercentofTotal + Insurance_PercentofTotal + Utilities_PercentofTotal + Payroll_PercentofTotal + Repairs_and_Maintenance_PercentofTotal + Contract_Services_PercentofTotal + Turnover_PercentofTotal + Sales_and_Marketing_PercentofTotal + Administrative_PercentofTotal + Management_PercentofTotal + Replacement_Reserves_PercentofTotal

	# Net_Operating_Income_Total = Net_Rental_Income_Total - Total_Operating_Expenses_Total
	# Net_Operating_Income_DollarPerUnit = Net_Operating_Income_Total/Num_Units
	# Net_Operating_Income_DollarPerSF = Net_Operating_Income_Total/Total_Sq_Ft

	# #Market Rental Assumptions Table #***dynamic***
	# # TBD

	return (
		Closing_Costs,
		Total_Costs,
		Purchase_Cost_Per_Unit,
		Total_Cost_Per_Unit,
		Purchase_Cost_Per_SF,
		Total_Cost_Per_SF,
		Cap_Rate_on_Purchase_Price,
		Cap_Rate_on_Total_Price
		)





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
	app.secret_key = os.urandom(12)
	app.run(port=3000,debug=True)
