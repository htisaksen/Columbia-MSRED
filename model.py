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
    created_on = db.Column('created_on', db.DateTime)
    model_name = db.Column('model_name', db.String(64))
    last_modified = db.Column('last_modified', db.DateTime)
    analysis_start_date = db.Column('analysis_start_date', db.String(12))
    property_name = db.Column('property_name', db.String(32))
    property_location = db.Column('property_location', db.String(32))
    property_type = db.Column('property_type', db.String(32))
    purchase_price = db.Column('purchase_price', db.Integer)
    closing_cost_percentage = db.Column('closing_cost_percentage', db.Integer)
    sale_year = db.Column('sale_year', db.Integer)
    terminal_cap_rate = db.Column('terminal_cap_rate', db.Integer)
    sales_costs = db.Column('sales_costs', db.Integer)
    leverage = db.Column('leverage', db.Integer)
    interest_rate_on_mortgage = db.Column('interest_rate_on_mortgage', db.Integer)
    loan_term = db.Column('loan_term', db.Integer)
    loan_amortization = db.Column('loan_amortization', db.Integer)
    unlevered_discountRate = db.Column('unlevered_discountRate', db.Integer)
    levered_discount_rate = db.Column('levered_discount_rate', db.Integer)
    other_income_total = db.Column('other_income_total', db.Integer)
    less_vacancy = db.Column('less_vacancy', db.Integer)
    less_concessions = db.Column('less_concessions', db.Integer)
    less_credit_loss = db.Column('less_credit_loss', db.Integer)
    real_estate_taxes_total = db.Column('real_estate_taxes_total', db.Integer)
    insurance_total = db.Column('insurance_total', db.Integer)
    utilities_total = db.Column('utilities_total', db.Integer)
    payroll_total = db.Column('payroll_total', db.Integer)
    repairs_and_maintenance_total = db.Column('repairs_and_maintenance_total', db.Integer)
    contract_services_total = db.Column('contract_services_total', db.Integer)
    turnover_total = db.Column('turnover_total', db.Integer)
    sales_and_marketing_total = db.Column('sales_and_marketing_total', db.Integer)
    administrative_total = db.Column('administrative_total', db.Integer)
    management_percentage = db.Column('management_percentage', db.Integer)
    replacement_reserves_percentage = db.Column('replacement_reserves_percentage', db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    rental_rate_assumption = db.relationship('RentalRateAssumption',backref='realestatemodels',lazy='dynamic')
    market_rental_assumptions = db.relationship('MarketRentalAssumptions',backref='realestatemodels',lazy='dynamic')
    def __init__(self, model_name, user_id):
        self.model_name = model_name
        self.user_id = user_id

#FK extended Real Estate Model table. Extension on userinputs
class RentalRateAssumption(db.Model):
    __tablename__ = "rentalrateassumptions"
    id = db.Column('rental_rate_assumptions_id', db.Integer, primary_key=True)
    proj_rent = db.Column('proj_rent', db.String(32))
    total_units = db.Column('total_units', db.Integer)
    avg_sf_per_unit = db.Column('avg_sf_per_unit', db.Integer)
    rent_per_unit = db.Column('rent_per_unit', db.Integer)
    real_estate_model_id = db.Column(db.Integer, db.ForeignKey('realestatemodels.model_id'))

#FK extended Real Estate Model table. Extension on userinputs
class MarketRentalAssumptions(db.Model):
    __tablename__ = "marketrentalassumptions"
    id = db.Column('market_rental_assumptions_id', db.Integer, primary_key=True)
    revenue = db.Column('revenue', db.Integer)
    expenses = db.Column('expenses', db.Integer)
    vacancy = db.Column('vacancy', db.Integer)
    concessions = db.Column('concessions', db.Integer)
    credit_loss = db.Column('credit_loss', db.Integer)
    real_estate_model_id = db.Column(db.Integer, db.ForeignKey('realestatemodels.model_id'))


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
    db.drop_all()
    db.create_all()
    tak = User('tak@i.com','tak', 'Tak','I.')
    fred = User('fred@vs.com','fred', 'Fred','VS.')

    db.session.add(tak)
    db.session.add(fred)
    db.session.commit()

    print("User.query.all():=============",User.query.all())
    print("User.query.filter_by(email='tak@i.com)':=======",User.query.filter_by(email='tak@i.com').first())

    save1 = RealEstateModel('TAKAMON Round1','1')
    save2 = RealEstateModel('Fredsters first model','2')
    save3 = RealEstateModel('Fredsters second model','2')
    db.session.add(save1)
    db.session.add(save2)
    db.session.add(save3)
    db.session.commit()

    print("Database has been created...")
