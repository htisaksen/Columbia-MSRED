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

@app.route('/edit/<modelid>',methods = ["GET","POST"])
@login_required
def load_data(modelid):
	print("We are on the edit page of Model id:",modelid)
	modeldata = RealEstateModel.query.filter_by(id = modelid).first()
	print("modeldata:",modeldata)
	print("rental_rate_assumptions:",modeldata.rental_rate_assumptions)
	print("market_rental_assumptions:",modeldata.market_rental_assumptions)

	#object to be returned to the template
	rental_rate_list = []
	if modeldata.rental_rate_assumptions:
		rental_rate_query = modeldata.rental_rate_assumptions.split(',')
		print("rental_rate_query:",rental_rate_query)
		print("rental_rate_query[0]:",rental_rate_query[0])

		while rental_rate_query:
			RRA_curr_list = []
			for i in range(5):
				RRA_curr_list.append(rental_rate_query.pop(0))
			print("RRA_curr_list:",RRA_curr_list)
			rental_rate_list.append(RRA_curr_list)
		print("rental_rate_list:",rental_rate_list)
		
		RRA_row_count = len(rental_rate_list)
		print("RRA_row_count:",RRA_row_count)

	#object to be returned to the template
	market_rental_list = []
	if modeldata.market_rental_assumptions:
		market_rental_query = modeldata.market_rental_assumptions.split(',')
		print("market_rental_query:",market_rental_query)

		while market_rental_query:
			MRA_curr_list = []
			for i in range(6):
				MRA_curr_list.append(market_rental_query.pop(0))
			print("MRA_curr_list:",MRA_curr_list)
			market_rental_list.append(MRA_curr_list)
		print("market_rental_list:",market_rental_list)
		

		MRA_row_count = len(market_rental_list)
		print("MRA_row_count:",MRA_row_count)

	return render_template("main_load.html",
		modeldata = modeldata,
		rental_rate_list = rental_rate_list,
		market_rental_list = market_rental_list)

@app.route('/del/<modelid>',methods = ["GET","POST"])
@login_required
def del_data(modelid):
	print("We are on the del page of Model id:",modelid)
	modeldata = RealEstateModel.query.filter_by(id = modelid).first()
	if modeldata is not None:
		db.session.delete(modeldata)
		db.session.commit()
	return redirect("/home")


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
				session['id'] = user.id
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
	if request.method == 'GET':
		user = session.get('id')
		print("/Home GET userid:",user)
		modelslist = RealEstateModel.query.filter_by(user_id = user).all()
	return render_template('home.html', modelslist = modelslist)

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

@app.route('/savedata', methods = ["POST"])
@login_required
def save_data():
	print('='*50+" start save")
	object1 = 'object'
	market_counter = 1
	market_rental_input_counter = 1
	rental_rate_counter = 1
	# rental rate lists
	proj_rents_list = []
	total_units_list = []
	avg_sf_per_unit_list = []
	rent_per_unit_list = []
	# market rental lists
	revenue_list = []
	expenses_list = []
	vacancy_list = []
	concession_list = []
	credit_loss_list = []
	# static inputs
	save = RealEstateModel(
				request.form['save_name'],
				datetime.utcnow(),
				request.form['Analysis_Start_Date'],
				request.form['Property_Name'],
				request.form['Property_Address'],
				request.form['Property_Type'],
				request.form['Purchase_Price'],
				request.form['Closing_Costs_Percentage'],
				request.form['Sale_Year'],
				request.form['Terminal_Cap_Rate'],
				request.form['Sales_Costs'],
				request.form['Leverage'],
				request.form['Interest_Rate_on_Mortgage'],
				request.form['Loan_Term'],
				request.form['Loan_Amortization'],
				request.form['UL_Discount_Rate'],
				request.form['L_Discount_Rate'],
				request.form['Other_Income_Total'],
				request.form['Less_Vacancy'],
				request.form['Less_Concessions'],
				request.form['Less_Credit_Loss'],
				request.form['Real_Estate_Taxes_Total'],
				request.form['Insurance_Total'],
				request.form['Utilities_Total'],
				request.form['Payroll_Total'],
				request.form['Repairs_and_Maintenance_Total'],
				request.form['Contract_Services_Total'],
				request.form['Turnover_Total'],
				request.form['Sales_and_Marketing_Total'],
				request.form['Administrative_Total'],
				request.form['Management_Percentage'],
				request.form['Replacement_Reserves_Percentage'],
				request.form['rental_rate_assumptions'],
				request.form['market_rental_assumptions'],
				session['id'])
	db.session.add(save)
	db.session.commit()
	print('='*50+" save successful")
	return jsonify(success = 'success')

@app.route('/updatedata', methods = ["POST"])
@login_required
def update_data():
	print('='*50+" start update save")
	object1 = 'object'
	market_counter = 1
	market_rental_input_counter = 1
	rental_rate_counter = 1
	# rental rate lists
	proj_rents_list = []
	total_units_list = []
	avg_sf_per_unit_list = []
	rent_per_unit_list = []
	# market rental lists
	revenue_list = []
	expenses_list = []
	vacancy_list = []
	concession_list = []
	credit_loss_list = []

	print("model_id:", request.form['model_id'])
	updatemodel = RealEstateModel.query.filter_by(id = request.form['model_id']).first()

	updatemodel.analysis_start_date = request.form['Analysis_Start_Date']
	updatemodel.property_name = request.form['Property_Name']
	updatemodel.property_location = request.form['Property_Address']
	updatemodel.property_type = request.form['Property_Type']
	updatemodel.purchase_price = request.form['Purchase_Price']
	updatemodel.closing_cost_percentage = request.form['Closing_Costs_Percentage']
	updatemodel.sale_year = request.form['Sale_Year']
	updatemodel.terminal_cap_rate = request.form['Terminal_Cap_Rate']
	updatemodel.sales_costs = request.form['Sales_Costs']
	updatemodel.leverage = request.form['Leverage']
	updatemodel.interest_rate_on_mortgage = request.form['Interest_Rate_on_Mortgage']
	updatemodel.loan_term = request.form['Loan_Term']
	updatemodel.loan_amortization = request.form['Loan_Amortization']
	updatemodel.unlevered_discountRate = request.form['UL_Discount_Rate']
	updatemodel.levered_discount_rate = request.form['L_Discount_Rate']
	updatemodel.other_income_total = request.form['Other_Income_Total']
	updatemodel.less_vacancy = request.form['Less_Vacancy']
	updatemodel.less_concessions = request.form['Less_Concessions']
	updatemodel.less_credit_loss = request.form['Less_Credit_Loss']
	updatemodel.real_estate_taxes_total = request.form['Real_Estate_Taxes_Total']
	updatemodel.insurance_total = request.form['Insurance_Total']
	updatemodel.utilities_total = request.form['Utilities_Total']
	updatemodel.payroll_total = request.form['Payroll_Total']
	updatemodel.repairs_and_maintenance_total = request.form['Repairs_and_Maintenance_Total']
	updatemodel.contract_services_total = request.form['Contract_Services_Total']
	updatemodel.turnover_total = request.form['Turnover_Total']
	updatemodel.sales_and_marketing_total = request.form['Sales_and_Marketing_Total']
	updatemodel.administrative_total = request.form['Administrative_Total']
	updatemodel.management_percentage = request.form['Management_Percentage']
	updatemodel.replacement_reserves_percentage = request.form['Replacement_Reserves_Percentage']
	updatemodel.rental_rate_assumptions = request.form['rental_rate_assumptions']
	updatemodel.market_rental_assumptions =request.form['market_rental_assumptions']

	print("DB columns updated")
	db.session.commit()

	print('='*50+" update successful")
	return jsonify(success = 'success')

if __name__ == "__main__":
	app.secret_key = os.urandom(12)
	app.run(port=3000,debug=True)
