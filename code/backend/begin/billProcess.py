from flask import jsonify
from exts import db
from models import Goods
from models import Shopping_cart
from models import Shipping_address
from models import Shopping_bill
from sqlalchemy.orm.attributes import flag_modified


class BillProcess:

    def __init__(self,method,userID,shipping_addressID):
        self.method = method
        self.userID = userID
        self.shipping_addressID = shipping_addressID

    def generateShoppingBill(self):
        currentShoppingCart = Shopping_cart.query.filter_by(
            userID = self.userID
        ).first()
        currentShippingAddress = Shipping_address.query.filter_by(
            shipping_addressID = self.shipping_addressID
        ).first()
        goodsID_list = list(currentShoppingCart.goods.keys())
        goods_list = db.session.query(Goods).filter(
            Goods.goodsID.in_(goodsID_list)
        ).all()
        goods = []
        total_amount = 0
        for item in goods_list:
            good_dict = {}
            good_dict['goodsID'] = item.goodsID
            good_dict['name'] = item.name
            good_dict['price'] = item.price
            good_dict['number'] = currentShoppingCart.goods[str(item.goodsID)]
            total_amount += good_dict['price']*good_dict['number']
            goods.append(good_dict)
        shipping_address = (
            currentShippingAddress.city+currentShippingAddress.area+currentShippingAddress.street
            +currentShippingAddress.details
        )
        shipping_bill = Shopping_bill(
            goods=currentShoppingCart.goods,
            total_amount=total_amount,
            userID=self.userID,
            shipping_addressID=self.shipping_addressID
        )
        db.session.add(shipping_bill)
        db.session.commit()
        data = {
            'goods':goods,
            'total_amount':total_amount,
            'shipping_address':shipping_address,
            'shipping_billID':shipping_bill.shopping_billID
        }
        result = {'code':200,'data':data}

        # 产生购物账单后，应把购物车中清楚
        currentShoppingCart.goods = {}
        # 关于腌制属性必须这么做
        flag_modified(currentShoppingCart, "goods")
        db.session.merge(currentShoppingCart)
        db.session.flush()
        db.session.commit()
        return jsonify(result)

    def getShippingBill(self):
        allShippingBill = Shopping_bill.query.filter_by(
            userID=self.userID
        ).all()
        data = []
        for bill in allShippingBill:
            bill_dict = {}
            bill_dict['shipping_billID'] = bill.shopping_billID

            goods = []
            goodsID_list = list(bill.goods.keys())
            goods_list = db.session.query(Goods).filter(
                Goods.goodsID.in_(goodsID_list)
            ).all()
            for item in goods_list:
                good_dict = {}
                good_dict['goodsID'] = item.goodsID
                good_dict['name'] = item.name
                good_dict['price'] = item.price
                good_dict['number'] = bill.goods[str(item.goodsID)]
                goods.append(good_dict)

            bill_dict['goods'] = goods
            bill_dict['total_amount'] = bill.total_amount

            billShippingAddress = Shipping_address.query.filter_by(
                shipping_addressID=bill.shipping_addressID
            ).first()
            shipping_address = (
                billShippingAddress.city + billShippingAddress.area + billShippingAddress.street
                + billShippingAddress.details
            )

            bill_dict['shipping_address'] = shipping_address

            data.append(bill_dict)

        result = {'code':200,'data':data}
        return jsonify(result)

    def processing(self):
        if self.method=='GET':
            return self.getShippingBill()
        else:
            return self.generateShoppingBill()