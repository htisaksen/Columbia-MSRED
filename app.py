import os, re
from model import *
from flask import Flask, session, request, flash, url_for, redirect, render_template, abort, g
# import flask_login
from flask_login import LoginManager, login_user, logout_user, current_user, login_required
from functools import wraps
 
app = Flask(__name__)

def login_required(f):
	@wraps(f)
	def wrap(*args, **kwargs):
		if 'logged_in' in session:
			return f(*args, **kwargs)
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
def returnSum():
	title = "Returns Summary"
	return render_template('returns_summary.html',
		title=title)

@app.route('/inputform')
@login_required
def inputForm():
	title="Input Form"
	return render_template('input_form.html',
		title = title)






if __name__ == "__main__":
	app.secret_key = os.urandom(12)
	app.run(port=3000,debug=True)
