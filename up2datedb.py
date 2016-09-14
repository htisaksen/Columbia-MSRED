from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///user_save.db'

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Saves(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    datetime = db.Column(db.String(64))
    savename = db.Column(db.String(64))
    property_name = db.Column(db.String(64))
    property_location = db.Column(db.String(64))
    property_type = db.Column(db.String(64))
    #Purchase Information Table
    purchase_price = db.Column(db.Integer)
    closing_costs_percentage = db.Column(db.Integer)
    #Sale Assumption Table
    sale_year = db.Column(db.String(64))
    terminal_cap_rate = db.Column(db.String(64))
    sales_costs = db.Column(db.String(64))
    #Financial Assumptions Table
    leverage = db.Column(db.String(64))
    interest_rate_on_mortgage = db.Column(db.String(64))
    loan_term = db.Column(db.String(64))
    loan_amortization = db.Column(db.String(64))
    #Returns Summary Table
    ul_discount_rate = db.Column(db.String(64))
    l_discount_rate = db.Column(db.String(64))
    #Current Financial Performance Table
    other_income_total = db.Column(db.String(64))
    less_vacancy = db.Column(db.String(64))
    less_concessions = db.Column(db.String(64))
    less_credit_loss = db.Column(db.String(64))
    real_estate_taxes_total = db.Column(db.String(64))
    insurance_total = db.Column(db.String(64))
    utilities_total = db.Column(db.String(64))
    payroll_total = db.Column(db.String(64))
    repairs_and_maintenance_total = db.Column(db.String(64))
    contract_services_total = db.Column(db.String(64))
    turnover_total = db.Column(db.String(64))
    sales_and_marketing_total = db.Column(db.String(64))
    administrative = db.Column(db.String(64))
    management_percentage = db.Column(db.String(64))
    replacement_reserves_percentage = db.Column(db.String(64))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    save3 = Saves('5/2.16 8:30pm','assumption1','2')

    def __init__(self,
    datetime,
    savename,
    property_name,
    property_location,
    property_type,
    purchase_price,
    closing_costs_percentage,
    sale_year,
    terminal_cap_rate,
    sales_costs,
    leverage,
    interest_rate_on_mortgage,
    loan_term,
    loan_amortization,
    ul_discount_rate,
    l_discount_rate,
    other_income_total,
    less_vacancy,
    less_concessions,
    less_credit_loss,
    real_estate_taxes_total,
    insurance_total,
    utilities_total,
    payroll_total,
    repairs_and_maintenance_total,
    contract_services_total,
    turnover_total,
    sales_and_marketing_total,
    administrative,
    management_percentage,
    replacement_reserves_percentage,
    user_id):
        self.datetime = datetime
        self.savename = savename
        self.property_name = property_name
        self.property_location = property_location
        self.property_type = property_type
        #Purchase Information Table
        self.purchase_price = purchase_price
        self.closing_costs_percentage = closing_costs_percentage
        #Sale Assumption Table
        self.sale_year = sale_year
        self.terminal_cap_rate = terminal_cap_rate
        self.sales_costs = sales_costs
        #Financial Assumptions Table
        self.leverage = leverage
        self.interest_rate_on_mortgage = interest_rate_on_mortgage
        self.loan_term = loan_term
        self.loan_amortization = loan_amortization
        #Returns Summary Table
        self.ul_discount_rate = ul_discount_rate
        self.l_discount_rate = l_discount_rate
        #Current Financial Performance Table
        self.other_income_total = other_income_total
        self.less_vacancy = less_vacancy
        self.less_concessions = less_concessions
        self.less_credit_loss = less_credit_loss
        self.real_estate_taxes_total = real_estate_taxes_total
        self.insurance_total = insurance_total
        self.utilities_total = utilities_total
        self.payroll_total = payroll_total
        self.repairs_and_maintenance_total = repairs_and_maintenance_total
        self.contract_services_total = contract_services_total
        self.turnover_total = turnover_total
        self.sales_and_marketing_total = sales_and_marketing_total
        self.administrative = administrative
        self.management_percentage = management_percentage
        self.replacement_reserves_percentage = replacement_reserves_percentage
        self.user_id = user_id

    # def serialize(self):
    #     return {
    #         'id': self.id,
    #         'user_id': self.user_id,
    #     }

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True, index=True)
    password = db.Column(db.String(64))
    save = db.relationship('Saves',backref='User',lazy='dynamic')

    def __init__(self,username,password):
        self.username = username
        self.password = password

    # def serialize(self):
    #     return {
    #         'id': self.id,
    #         'username': self.username,
    #         'password': self.password,
    #     }

if __name__=="__main__":
    db.drop_all()
    db.create_all()
    tak = User('Tak',"Tak")
    Pres = User('Pres Comancho','america')
    test = User('test','test')

    db.session.add(tak)
    db.session.add(Pres)
    db.session.add(test)
    db.session.commit()

    # print(User.query.all())
    # print(User.query.filter_by(username='Tak').first())

    save1 = Saves('1/1/15 5:30pm','test','1')
    save2 = Saves('2/1/16 3:30pm','savename2','2')
    save3 = Saves('5/2.16 8:30pm','assumption1','2')
    db.session.add(save1)
    db.session.add(save2)
    db.session.add(save3)
    db.session.commit()
