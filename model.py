from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import(
                        generate_password_hash,
                        check_password_hash,
                        )

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///user_save.db'

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Saves(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    datetime = db.Column(db.String(64))
    savename = db.Column(db.String(64))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))



    def __init__(self,datetime,savename,user_id):
        self.datetime = datetime
        self.savename = savename
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

    def set_password(self,password):
        self.pw_hash = generate_password_hash(p)

    def check_password(self, password):
        return check_password_hash(self.pw_hash, password)

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

    print("Database has been created...")
