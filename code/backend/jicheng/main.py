from flask import Flask,render_template,request,send_file,jsonify
import io
from exts import db
import config

from flask_cors import CORS

from test import ForTest
from cartProcess import CartProcess
from addressProcess import AddressProcess
from billProcess import BillProcess
from userProcess import UserProcess
from goodsProcess import GoodsProcess

app = Flask(__name__)
app.config.from_object(config)
db.init_app(app)
CORS(app, supports_credentials = True)



@app.route('/')
def hello_world():
    return 'Hello World!'

@app.route('/img/<pic_name>')
def return_img(pic_name):
    img = './static/img/' + pic_name
    with open(img, 'rb') as f:
        tmp = f.read()
    return send_file(
        io.BytesIO(tmp),
        # mimetype='image/png',
        as_attachment=False,
        attachment_filename=img
    )


@app.route('/test',methods=['GET'])
def forTest():
    print(request.form.to_dict())
    print(request.files.get('image'))
    # test = ForTest()

    # test.processing()
    return 'success'

@app.route('/user', methods=['POST','PUT', 'GET'])
def user():
    formDict = request.form.to_dict()
    image = request.files.get('image',None)
    processing = UserProcess(
        method=request.method, image=image,**formDict
    )
    return processing.processing()

@app.route('/goods', methods = ['GET','POST'])
def goods():
    formDict = request.form.to_dict()
    image = request.files.get('image', None)
    processing = GoodsProcess(
        method=request.method, image=image, **formDict
    )
    # processing = GoodsProcess()
    return processing.processing()
# 创建用户的时候就应该给他创建一个空的购物车
@app.route('/shopping_cart',methods=['GET','POST','DELETE'])
def shopping_cart():
    userID = request.args.get('userID', None)
    goodsID = request.args.get('goodsID', None)
    number = request.args.get('number',None)
    processing = CartProcess(method=request.method,userID=userID,goodsID=goodsID,number=number)
    return processing.processing()

@app.route('/shipping_address',methods=['GET','POST','DELETE'])
def shipping_address():
    userID = request.args.get('userID', None)
    city = request.args.get('city', None)
    area = request.args.get('area', None)
    street = request.args.get('street', None)
    details = request.args.get('details', None)
    shipping_addressID = request.args.get('shipping_addressID',None)

    processing = AddressProcess(
        method=request.method,userID=userID,shipping_addressID=shipping_addressID,
        city=city,area=area,street=street,details=details
    )

    return processing.processing()

@app.route('/shipping_bill',methods=['GET','POST'])
def shipping_bill():
    userID = request.args.get('userID',None)
    shipping_addressID = request.args.get('shipping_addressID',None)

    processing = BillProcess(
        method=request.method,
        userID=userID,
        shipping_addressID=shipping_addressID
    )

    return processing.processing()

if __name__ == '__main__':
    app.run()
