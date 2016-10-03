import os, re
from model import *
from flask import Flask, session, request, flash, url_for, redirect, render_template, abort, jsonify
# import flask_login
from flask_login import LoginManager, login_user, logout_user, current_user, login_required
from functools import wraps


app = Flask(__name__)

def login_required(userinput):
	@wraps(userinput)
	def wrap(*args, **kwargs):
		if 'logged_in' in session:
			return userinput(*args, **kwargs)
		else:
			flash("You need to login first.")
			return redirect('/login')
	return wrap

# =====================================================================================================
# Routes ==============================================================================================
# =====================================================================================================

@app.route("/", methods=['POST','GET'])
def index():
	email = ''
	if session.get('logged_in'):
		email = session.get('email')
		print("session logged in = true")
		return redirect("/home")
	else:
		print("session logged in = false")
		return redirect("/login")

@app.route("/dashboard", methods=['POST','GET'])
@login_required
def dashboard():
	title = "Main Dashboard"
	return render_template("main.html",
		title = title)

@app.route("/login", methods=['POST','GET'])
def login():
	error_msg = ""
	if request.method == 'POST':
		email = request.form.get('email')
		password = request.form.get('password')
		user = User.query.filter_by(email=email).first()
		print("email:", email)
		print("user:", user)
		if user:
			print("user.check_password(password):", user.check_password(password))
			if user.check_password(password):
				session['logged_in'] = True
				session['firstname'] = user.firstname
				print("/Login: successfully logged in")
				return redirect('/home')
		error_msg = "Incorrect email/password. Please try again."
	return render_template("login.html", error_msg = error_msg)


@app.route("/register", methods = ['GET', 'POST'])
def register():
	if request.method == 'GET':
		return render_template('register.html')
	user = User(request.form['email'], request.form['password'], request.form['firstname'], request.form['lastname'])
	db.session.add(user)
	db.session.commit()
	print("User successfully added.")
	return redirect('/login')

@app.route("/logout")
@login_required
def logout():
	session.clear()
	print("User logged out.")
	return redirect('/login')

@app.route("/home", methods=['GET','POST'])
@login_required
def home():
	return render_template('home.html')


@app.route("/org_dashboard", methods=['GET','POST'])
@login_required
def org_dashboard():
	title = "Original Dashboard"
	return render_template("org_dashboard.html",
		title = title)

@app.route("/proforma", methods=['GET','POST'])
@login_required
def proforma():
	title = "Pro Forma"
	return render_template("proforma.html",
		title=title)

@app.route('/returns_summary', methods=['GET','POST'])
@login_required
def return_sum():
	title = "Returns Summary"
	return render_template('returns_summary.html',
		title=title)

@app.route('/inputform')
@login_required
def inputForm():
	title="Input Form"
	return render_template('input_form.html',
		title = title)

@app.route('/savedata',methods = ["POST"])
@login_required
def save_data():
	market_counter = 1
	rental_rate_counter = 1
	market_rental_assumption_list = []
	rental_rate_assumption_list = []
	analysis_start_date = request.form['Analysis_Start_Date']
	property_name = request.form['Property_Name']
	property_location = request.form['Property_Address']
	property_type = request.form['Property_Type']
	purchase_price = request.form['Purchase_Price']
	closing_cost_percentage = request.form['Closing_Costs_Percentage']
	sale_year = request.form['Sale_Year']
	terminal_cap_rate = request.form['Terminal_Cap_Rate']
	sales_costs = request.form['Sales_Costs']
	leverage = request.form['Leverage']
	interest_rate_on_mortgage = request.form['Interest_Rate_on_Mortgage']
	loan_term = request.form['Loan_Term']
	loan_amortization = request.form['Loan_Amortization']
	unlevered_discountRate = request.form['UL_Discount_Rate']
	levered_discount_rate = request.form['L_Discount_Rate']
	other_income_total = request.form['Other_Income_Total']
	less_vacancy = request.form['Less_Vacancy']
	less_concessions = request.form['Less_Concessions']
	less_credit_loss = request.form['Less_Credit_Loss']
	real_estate_taxes_total = request.form['Real_Estate_Taxes_Total']
	insurance_total = request.form['Insurance_Total']
	utilities_total = request.form['Utilities_Total']
	payroll_total = request.form['Payroll_Total']
	repairs_and_maintenance_total = request.form['Repairs_and_Maintenance_Total']
	contract_services_total = request.form['Contract_Services_Total']
	turnover_total = request.form['Turnover_Total']
	sales_and_marketing_total = request.form['Sales_and_Marketing_Total']
	administrative_total = request.form['Administrative_Total']
	management_percentage = request.form['Management_Percentage']
	replacement_reserves_percentage = request.form['Replacement_Reserves_Percentage']

	while True:
		if not request.form.get('total_units'+str(rental_rate_counter)):
			break
		rental_rate_assumption_list.append(request.form['total_units'+str(rental_rate_counter)])

		rental_rate_counter +=1


	return jsonify(market_rental_assumption_list = market_rental_assumption_list,
	rental_rate_assumption_list = rental_rate_assumption_list,
	analysis_start_date = analysis_start_date,
    property_name = property_name,
    property_location = property_location,
    property_type = property_type,
    purchase_price = purchase_price,
    closing_cost_percentage = closing_cost_percentage,
    sale_year = sale_year,
    terminal_cap_rate = terminal_cap_rate,
    sales_costs = sales_costs,
    leverage = leverage,
    interest_rate_on_mortgage = interest_rate_on_mortgage,
    loan_term = loan_term,
    loan_amortization = loan_amortization,
    unlevered_discountRate = unlevered_discountRate,
    levered_discount_rate = levered_discount_rate,
    other_income_total = other_income_total,
    less_vacancy = less_vacancy,
    less_concessions = less_concessions,
    less_credit_loss = less_credit_loss,
    real_estate_taxes_total = real_estate_taxes_total,
    insurance_total = insurance_total,
    utilities_total = utilities_total,
    payroll_total = payroll_total,
    repairs_and_maintenance_total = repairs_and_maintenance_total,
    contract_services_total = contract_services_total,
    turnover_total = turnover_total,
    sales_and_marketing_total = sales_and_marketing_total,
    administrative_total = administrative_total,
    management_percentage = management_percentage,
    replacement_reserves_percentage = replacement_reserves_percentage,)




if __name__ == "__main__":
	app.secret_key = os.urandom(12)
	app.run(port=3000,debug=True)
