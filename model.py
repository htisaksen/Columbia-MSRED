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
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))

    def __init__(self, model_name, user_id):
        self.model_name = model_name
        self.user_id = user_id


class User(db.Model):
    __tablename__ = "users"
    id = db.Column('user_id', db.Integer, primary_key=True)
    email = db.Column('email', db.String(60), unique = True, index=True)
    password = db.Column('password', db.String(30))
    firstname = db.Column('firstname', db.String(30))
    lastname = db.Column('lastname', db.String(30))
    registered_on = db.Column('registered_on', db.DateTime)
    real_estate_model = db.relationship('RealEstateModel',backref='users',lazy='dynamic')

    def __init__(self, email, password, firstname, lastname):
        self.email = email
        self.password = password
        self.firstname = firstname
        self.lastname = lastname
        self.registered_on = datetime.utcnow()

    def set_password(self,password):
        self.pw_hash = generate_password_hash(p)

    def check_password(self, password):
        return check_password_hash(self.pw_hash, password)


    def is_authenticated(self):
        return True
 
    def is_active(self):
        return True
 
    def is_anonymous(self):
        return False
 
    # def get_id(self):
    #     return unicode(self.id)
 
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
