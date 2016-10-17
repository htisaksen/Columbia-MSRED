from flask import Flask
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import(
                        generate_password_hash,
                        check_password_hash,
                        )

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///user_REmodels.db'

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class RealEstateModel(db.Model):
    __tablename__ = "realestatemodels"
    id = db.Column('model_id', db.Integer, primary_key=True)
    created_on = db.Column('created_on', db.String(64))
    model_name = db.Column('model_name', db.String(64))
    analysis_start_date = db.Column('analysis_start_date', db.String(12))
    property_name = db.Column('property_name', db.String(32))
    property_location = db.Column('property_location', db.String(32))
    property_type = db.Column('property_type', db.String(32))
    purchase_price = db.Column('purchase_price', db.String(32))
    closing_cost_percentage = db.Column('closing_cost_percentage', db.String(32))
    sale_year = db.Column('sale_year', db.String(32))
    terminal_cap_rate = db.Column('terminal_cap_rate', db.String(32))
    sales_costs = db.Column('sales_costs', db.String(32))
    leverage = db.Column('leverage', db.String(32))
    interest_rate_on_mortgage = db.Column('interest_rate_on_mortgage', db.String(32))
    loan_term = db.Column('loan_term', db.String(32))
    loan_amortization = db.Column('loan_amortization', db.String(32))
    unlevered_discountRate = db.Column('unlevered_discountRate', db.String(32))
    levered_discount_rate = db.Column('levered_discount_rate', db.String(32))
    other_income_total = db.Column('other_income_total', db.String(32))
    less_vacancy = db.Column('less_vacancy', db.String(32))
    less_concessions = db.Column('less_concessions', db.String(32))
    less_credit_loss = db.Column('less_credit_loss', db.String(32))
    real_estate_taxes_total = db.Column('real_estate_taxes_total', db.String(32))
    insurance_total = db.Column('insurance_total', db.String(32))
    utilities_total = db.Column('utilities_total', db.String(32))
    payroll_total = db.Column('payroll_total', db.String(32))
    repairs_and_maintenance_total = db.Column('repairs_and_maintenance_total', db.String(32))
    contract_services_total = db.Column('contract_services_total', db.String(32))
    turnover_total = db.Column('turnover_total', db.String(32))
    sales_and_marketing_total = db.Column('sales_and_marketing_total', db.String(32))
    administrative_total = db.Column('administrative_total', db.String(32))
    management_percentage = db.Column('management_percentage', db.String(32))
    replacement_reserves_percentage = db.Column('replacement_reserves_percentage', db.String(32))
    rental_rate_assumptions = db.Column('rental_rate_assumptions', db.String(256))
    market_rental_assumptions = db.Column('market_rental_assumptions', db.String(256))
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    def __init__(self, model_name, created_on, analysis_start_date, property_name, property_location, property_type, purchase_price, closing_cost_percentage, sale_year, terminal_cap_rate, sales_costs, leverage, interest_rate_on_mortgage, loan_term, loan_amortization, unlevered_discountRate, levered_discount_rate, other_income_total, less_vacancy, less_concessions, less_credit_loss, real_estate_taxes_total, insurance_total, utilities_total, payroll_total, repairs_and_maintenance_total, contract_services_total, turnover_total, sales_and_marketing_total, administrative_total, management_percentage, replacement_reserves_percentage, rental_rate_assumptions, market_rental_assumptions, user_id):
        self.model_name = model_name
        self.created_on = created_on
        self.analysis_start_date = analysis_start_date
        self.property_name = property_name
        self.property_location = property_location
        self.property_type = property_type
        self.purchase_price = purchase_price
        self.closing_cost_percentage = closing_cost_percentage
        self.sale_year = sale_year
        self.terminal_cap_rate = terminal_cap_rate
        self.sales_costs = sales_costs
        self.leverage = leverage
        self.interest_rate_on_mortgage = interest_rate_on_mortgage
        self.loan_term = loan_term
        self.loan_amortization = loan_amortization
        self.unlevered_discountRate = unlevered_discountRate
        self.levered_discount_rate = levered_discount_rate
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
        self.administrative_total = administrative_total
        self.management_percentage = management_percentage
        self.replacement_reserves_percentage = replacement_reserves_percentage
        self.rental_rate_assumptions = rental_rate_assumptions
        self.market_rental_assumptions = market_rental_assumptions
        self.user_id = user_id

class User(db.Model):
    __tablename__ = "users"
    id = db.Column('user_id', db.Integer, primary_key=True)
    email = db.Column('email', db.String(60), unique = True, index=True)
    pw_hash = db.Column('pw_hash', db.String(100))
    firstname = db.Column('firstname', db.String(30))
    lastname = db.Column('lastname', db.String(30))
    registered_on = db.Column('registered_on', db.DateTime)
    real_estate_model = db.relationship('RealEstateModel',backref='users',lazy='dynamic')

    def __init__(self, email, password, firstname, lastname):
        self.email = email
        self.set_password(password)
        self.firstname = firstname
        self.lastname = lastname
        self.registered_on = datetime.utcnow()

    def set_password(self,password):
        self.pw_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.pw_hash, password)


    def __repr__(self):
        return '<User %r>' % (self.email)


if __name__== "__main__":
    print('='*50, datetime.utcnow())
    db.drop_all()
    db.create_all()
    tak = User('tak@i.com','tak', 'Tak','I.')
    fred = User('joey@joey.com','joey', 'Fred','VS.')
    db.session.add(tak)
    db.session.add(fred)
    db.session.commit()

    # print("User.query.all():=============",User.query.all())
    # print("User.query.filter_by(email='tak@i.com)':=======",User.query.filter_by(email='tak@i.com').first())
    #
    #  (self, model_name, created_on, analysis_start_date, property_name, property_location, property_type, purchase_price, closing_cost_percentage, sale_year, terminal_cap_rate, sales_costs, leverage, interest_rate_on_mortgage, loan_term, loan_amortization, unlevered_discountRate, levered_discount_rate, other_income_total, less_vacancy, less_concessions, less_credit_loss, real_estate_taxes_total, insurance_total, utilities_total, payroll_total, repairs_and_maintenance_total, contract_services_total, turnover_total, sales_and_marketing_total, administrative_total, management_percentage, replacement_reserves_percentage, user_id, rental_rate_assumptions, market_rental_assumptions):

    # save1 = RealEstateModel("Model1", datetime.utcnow(), '11/04/2015', 'Commercial bldg A', 'New York', 'Commercial', 400000, 3, 2, 7, 2, 65, 5.5, 10, 25, 8, 8, 100000, 10, 3, 2, 500000, 75000, 125000, 150000, 75000, 100000, 75000, 50000, 50000, 3, 2, 1)
    # save2 = RealEstateModel("Model3", datetime.utcnow(), '11/04/2015', 'Commercial bldg A', 'New York', 'Commercial', 400000, 3, 2, 7, 2, 65, 5.5, 10, 25, 8, 8, 100000, 10, 3, 2, 500000, 75000, 125000, 150000, 75000, 100000, 75000, 50000, 50000, 3, 2, 2, '[4000,300,2000]', '[1,2,3,4,5]')
    # save3 = RealEstateModel("Modelwhat", datetime.utcnow(), '11/04/2015', 'Commercial bldg A', 'New York', 'Commercial', 400000, 3, 2, 7, 2, 65, 5.5, 10, 25, 8, 8, 100000, 10, 3, 2, 500000, 75000, 125000, 150000, 75000, 100000, 75000, 50000, 50000, 3, 2, 3, '[4000,300,2000]', '[1,2,3,4,5]')
    save1 = RealEstateModel("Model1",datetime.utcnow(),'11/04/2015','CommercialbldgA','NewYork','Commercial','400000','3','2','7','2','65','5.5','10','25','8','8','100000','10','3','2','500000','75000','125000','150000','75000','100000','75000','50000','50000','3','2',1)



    db.session.add(save1)
    # db.session.add(save2)
    # db.session.add(save3)
    db.session.commit()

    rr1 = RentalRateAssumption('1bed/2bath','30','200','1200',1)
    db.session.add(rr1)
    db.session.commit()

    ma1 = MarketRentalAssumption('3','3','3','3','3',1)
    db.session.add(ma1)
    db.session.commit()

    print("Database has been created...")
