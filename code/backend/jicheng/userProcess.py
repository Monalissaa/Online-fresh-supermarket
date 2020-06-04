from models import User
from models import Shopping_cart
from flask import jsonify
from exts import db
from exts import ip_address
import os

class UserProcess:

    # ip_address = '127.0.0.1:5000/'

    def __init__(self,method,image,username,password,phone=None,userID=None):
        self.method = method
        self.image = image
        self.username = username
        self.password = password
        self.phone = phone
        self.userID = userID

    def userLogin(self):
        name = self.username
        pw = self.password

        result = User.query.filter_by(username=name).first()
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
    def addUser(self):
        username = self.username
        phone = self.phone
        password = self.password
        image = self.image
        image_filename =  'user'+image.filename
        image_path = 'http://'+ip_address+'img/'+image_filename
        # image = 'user' + image.filename
        newUser = User(
            username=username, phone=phone, password=password, image=image_path
        )
        db.session.add(newUser)
        db.session.commit()
        image.save('./static/img/' + image_filename)
        emptyShoppingCart = Shopping_cart(goods={},userID=newUser.userID)
        db.session.add(emptyShoppingCart)
        db.session.commit()
        result = {}
        result['code'] = 200
        result['message'] = 'new user has created'
        return jsonify(result)
    def updateUser(self):
        userID = self.userID
        phone = self.phone
        username = self.username
        password = self.password
        image = self.image
        image_filename = 'user' + image.filename
        image_path = 'http://' + ip_address + 'img/' + image_filename
        # image.save('./static/img/'+'user'+image.filename)
        # image = 'user'+image.filename

        result = User.query.filter(User.userID == userID).first()

        result.username = username
        result.phone = phone
        result.password = password
        result.image = image_path
        # print(image)

        db.session.commit()

        # 等提交后没问题了再去删除和保存图片
        old_image = result.image
        os.remove('./static/img/' + old_image.rsplit('/', 1)[-1])

        image.save('./static/img/'+ image_filename)

        result = {}
        result['code'] = 200
        return jsonify(result)

    def processing(self):
        if self.method=='GET':
            return self.userLogin()
        elif self.method == 'POST':
            return self.addUser()
        else:
            return self.updateUser()
        # elif self.method=='POST':
        #
        # return(self.username)
