import os, re
from model import *
from flask import Flask,session, request, flash, url_for, redirect, render_template, abort, g
# import flask_login
from flask_login import LoginManager, login_user, logout_user, current_user, login_required

 
app = Flask(__name__)


login_manager = LoginManager()
login_manager.init_app(app)

login_manager.login_view = 'login'

@login_manager.user_loader
def load_user(id):
	return User.query.get(int(id))


@app.before_request
def before_request():
    g.user = current_user


# =====================================================================================================
# Routes ==============================================================================================
# =====================================================================================================

@app.route("/", methods=['POST','GET'])
def index():
	email = ''
	if session.get('logged_in'):
		email = session.get('email')
		return render_template('home.html')
	return redirect("/main")

@app.route("/main")
@login_required
def main():
	title = "Main Dashboard"
	return render_template("main.html",
		title = title)

@app.route("/login", methods=['POST','GET'])
def login():
	if request.method == 'POST':
		email = request.form.get('email')
		password = request.form.get('password')
		user_obj = User.query.filter_by(email=email).first()
		print("email:", email)
		print("user_obj:", user_obj)

		if user_obj:
			if password == user_obj.password:
				session['logged_in'] = True
				session['email'] = user_obj.email
				print("successfully logged in")
				return redirect('/main')
		error_msg = "Incorrect email/password. Please try again."
	return render_template("login.html")


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
def logout():
	logout_user()
	return redirect('/login')


@app.route("/dashboard", methods=['GET','POST'])
@login_required
def dashboard():
	title = "Dashboard"
	return render_template("dashboard.html",
		title = title)

@app.route("/performa", methods=['GET','POST'])
@login_required
def performa():
	title = "Performa"
	return render_template("performa.html",
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
