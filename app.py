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
    pass

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
    app.run(debug=True)
