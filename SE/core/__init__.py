
from flask import jsonify
from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from collections import defaultdict
import config

app = Flask(__name__)
app.config.from_object(config)
db = SQLAlchemy(app)

class user(db.Model):
    __tablename__ = "user"
    
    userID = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    username = db.Column(db.String(64), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    phone = db.Column(db.String(11))
    image = db.Column(db.String(1024))


class goods(db.Model):
    __tablename__ = "goods"

    goodsID = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    category = db.Column(db.String(128), nullable=False)
    name = db.Column(db.String(128), nullable=False)
    word_description = db.Column(db.Text)
    image = db.Column(db.String(1024))
    price = db.Column(db.Float, nullable=False)
    remaining = db.Column(db.Integer, nullable=False)

    db.create_all()

'''
class goods_init ():
    newgoods1 = goods(category = 'A', name = 'aaa', word_description = 'nb1', image = 'f1', price = '5.5', remaining = '10')
    newgoods2 = goods(category = 'A', name = 'abb', word_description = 'nb2', image = 'f2', price = '7.8', remaining = '5')
    newgoods3 = goods(category = 'B', name = 'baa', word_description = 'nb3', image = 'f3', price = '16.5', remaining = '20')
    db.session.add(newgoods1)
    db.session.add(newgoods2)
    db.session.add(newgoods3)
    db.session.commit()
'''


@app.route('/user', methods = ['POST', 'PUT', 'GET'])
def User():
    if request.method == 'GET':#Sign in
        name = request.args.get('username')
        pw = request.args.get('password')

        result = user.query.filter_by(username = name).first()
        n = str(result.username)
        p = str(result.password)
        ph = str(result.phone)
        id = str(result.userID)

        if name == n and pw == p:
            data = {}
            data['phone'] = ph
            data['userID'] = id
            result = {}
            result['code'] = 200
            result['data'] = data
            return jsonify(result)
        else:
            return '0'

    if request.method == 'POST':#Sign up
        username = str(request.args.get('username'))
        phone = str(request.args.get('phone'))
        password = str(request.args.get('password'))
        image = str(request.args.get('image'))

        newuser = user(username = username, phone = phone, password = password, image = image)
        db.session.add(newuser)
        db.session.commit()

        result = {}
        result['code'] = 200
        result['message'] = 'new user has created'
        return jsonify(result)

    if request.method == 'PUT':
        userID = request.args.get('userID')
        phone = request.args.get('phone')
        username = request.args.get('username')
        password = request.args.get('password')
        image = request.args.get('image')

        result = user.query.filter(user.userID == userID).first()
        old_username = result.username
        old_phone = result.phone
        old_password = result.password
        old_image = result.image

        result.username = username
        result.phone = phone
        result.password = password
        result.image = image

        db.session.commit()

        result = {}
        result['code'] = 200
        return jsonify(result)

    
@app.route('/goods', methods = ['GET'])
def Goods():

    goods_info = goods.query.all()

    result = defaultdict(list)
    result['code'] = 200
    num = goods.query.count()
    

    i = 0
    while i < num:
        info = {}
        info['goodsID'] = goods_info[i].goodsID
        info['category'] = goods_info[i].category
        info['name'] = goods_info[i].name
        info['word_description'] = goods_info[i].word_description
        info['image'] = goods_info[i].image
        info['price'] = goods_info[i].price
        info['remaining'] = goods_info[i].remaining

        print(i)
        print(info)
        result['data'].append(info)
        print(result)

        i += 1
    
    return jsonify(result)
