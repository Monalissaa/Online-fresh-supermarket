from flask import jsonify
from exts import db

from models import Shipping_address


class AddressProcess:

    def __init__(self,method,userID,shipping_addressID,city,area,street,details):
        self.method = method
        self.userID = userID
        self.shipping_addressID = shipping_addressID
        self.city = city
        self.area = area
        self.street = street
        self.details = details

    def addShippingAddress(self):
        newShippingAddress = Shipping_address(
            city=self.city,area=self.area,street=self.street,
            details=self.details,userID=self.userID
        )
        db.session.add(newShippingAddress)
        db.session.commit()
        result = {'code':200}
        return jsonify(result)

    def viewShippingAddress(self):
        allShippingAddress = Shipping_address.query.filter_by(
            userID=self.userID
        ).all()
        data = []
        for shippingAddress in allShippingAddress:
            dict_address = {}
            dict_address['shipping_addressID'] = shippingAddress.shipping_addressID
            dict_address['city'] = shippingAddress.city
            dict_address['area'] = shippingAddress.area
            dict_address['street'] = shippingAddress.street
            dict_address['details'] = shippingAddress.details
            data.append(dict_address)

        result = {'code':200,'data':data}
        return jsonify(result)

    def deleteShippingAddress(self):
        currentShippingAddress = Shipping_address.query.filter_by(
            shipping_addressID = self.shipping_addressID
        ).first()
        db.session.delete(currentShippingAddress)
        db.session.commit()
        result = {'code':200}
        return jsonify(result)

    def processing(self):
        if self.method == 'GET':
            return self.viewShippingAddress()
        elif self.method == 'POST':
            return self.addShippingAddress()
        else:
            return self.deleteShippingAddress()