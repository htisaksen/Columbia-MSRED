import os, re
from flask import *
from model import *


from flask.ext.login import LoginManager
 
app = Flask(__name__)

login_manager = LoginManager()
login_manager.init_app(app)

login_manager.login_view = 'login'

@login_manager.user_loader
def load_user(id):
	return User.query.get(int(id))



# =====================================================================================================
# Routes ==============================================================================================
# =====================================================================================================
@app.route("/", methods=['POST','GET'])
def index():
	username = ''
	if session.get('logged_in'):
		username = session.get('username')
		return render_template('home.html')
	return redirect("/main")

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
			return redirect('/main')
	return render_template("login.html")

@app.route("/logout")
def logout():
	if session.get('logged_in') == True:
		session['logged_in'] = False
		session['username'] = False
	return redirect('/login')


@app.route("/register")
def register():
	pass

@app.route("/dashboard", methods=['GET','POST'])
def dashboard():
	title = "Dashboard"
	return render_template("dashboard.html",
		title = title)

@app.route("/performa")
def performa():
	title = "Performa"
	return render_template("performa.html",
		title=title)

@app.route('/returns_summary')
def returnSum():
	title = "Returns Summary"
	return render_template('returns_summary.html',
		title=title)

@app.route('/inputform')
def inputForm():
	title="Input Form"
	return render_template('input_form.html',
		title = title)

@app.route("/main")
def main():
	login_redirect()
	print("===We are here")
	title = "Main Dashboard"
	return render_template("main.html",
		title = title)





if __name__ == "__main__":
	app.secret_key = os.urandom(12)
	app.run(port=3000,debug=True)
