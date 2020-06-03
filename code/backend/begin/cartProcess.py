from flask import jsonify
from exts import db
from models import User
from models import Goods
from models import Shopping_cart
from sqlalchemy.orm.attributes import flag_modified

class CartProcess:


    def __init__(self,method,userID,goodsID,number):
        self.method = method
        self.userID = userID
        self.goodsID = goodsID
        self.number = number

    def checkShoppingCart(self):
        currentShoppingCart = Shopping_cart.query.filter_by(userID=self.userID).first()
        if currentShoppingCart==None:
            result = {'message':'No items in your shopping cart.'}
            return jsonify(result)
        data = []
        goods = currentShoppingCart.goods
        goodsID_list = list(goods.keys())
        # print(type(goods.keys()))
        # number_list = [x.value[0] for x in goods]
        goods_list = db.session.query(Goods).filter(Goods.goodsID.in_(goodsID_list)).all()
        for good in goods_list:
            good_dict = {}
            good_dict['goodsID'] = good.goodsID
            # print(type(good.goodsID))
            # 由于本来是int，所以要将int转换成str
            good_dict['number'] = goods[str(good.goodsID)]
            good_dict['category'] = good.category
            good_dict['word_description'] = good.word_description
            good_dict['image'] = good.image
            good_dict['price'] = good.price
            good_dict['total_amount'] = good_dict['price']*good_dict['number']
            data.append(good_dict)

        code = 200
        result = {'code':code,'data':data}
        return jsonify(result)

    def addProductToCart(self):
        currentShoppingCart = Shopping_cart.query.filter_by(
            userID=self.userID
        ).first()

        # 字符串变成数字
        self.number = int(self.number)

        tmp_goods = currentShoppingCart.goods
        if tmp_goods.get(self.goodsID) == None:
            tmp_goods[self.goodsID] = self.number
        else:
            tmp_goods[self.goodsID] += self.number
        currentShoppingCart.goods = tmp_goods
        # 关于腌制属性必须这么做
        flag_modified(currentShoppingCart,"goods")
        db.session.merge(currentShoppingCart)

        currentGood = Goods.query.filter_by(goodsID = self.goodsID).first()
        currentGood.remaining -= self.number
        db.session.flush()
        db.session.commit()
        code = 200
        result = {'code':code}
        return jsonify(result)

    def deleteItemInShoppingCart(self):
        currentShoppingCart = Shopping_cart.query.filter_by(
            userID=self.userID
        ).first()
        if currentShoppingCart == None:
            result = {'message':'This product is not in the shopping cart.'}
            return jsonify(result)

        tmp_goods = currentShoppingCart.goods
        if self.goodsID not in tmp_goods.keys():
            result = {'message': 'This product is not in the shopping cart.'}
            return jsonify(result)

        tmp_goods.pop(self.goodsID)
        currentShoppingCart.goods = tmp_goods
        flag_modified(currentShoppingCart, "goods")
        db.session.merge(currentShoppingCart)
        db.session.commit()
        code = 200
        result = {'code': code}
        return jsonify(result)

    def processing(self):
        if self.method == 'GET':
            return self.checkShoppingCart()
        elif self.method == 'POST':
            return self.addProductToCart()
        else:
            return self.deleteItemInShoppingCart()


