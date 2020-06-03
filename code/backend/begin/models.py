from exts import db

class User(db.Model):
    __tablename__ = 'user'
    userID = db.Column(db.Integer,primary_key=True,nullable=False,autoincrement=True)
    username = db.Column(db.String(20),nullable=False)
    password = db.Column(db.String(20),nullable=False)
    phone = db.Column(db.String(10),nullable=False)
    image = db.Column(db.String(20),nullable=True)

class Shipping_address(db.Model):
    __tablename__ = 'shipping_address'
    shipping_addressID = db.Column(db.Integer,primary_key=True,nullable=False,autoincrement=True)
    city = db.Column(db.String(10),nullable=False)
    area = db.Column(db.String(10),nullable=False)
    street = db.Column(db.String(10),nullable=False)
    details = db.Column(db.String(50),nullable=False)
    userID = db.Column(db.Integer,
                        db.ForeignKey('user.userID',ondelete="CASCADE"),
                        nullable=False)
    user = db.relationship('User',
                                   backref=db.backref('shipping_addresses', cascade="all, delete-orphan"))

class Goods(db.Model):
    __tablename__ = 'goods'
    goodsID = db.Column(db.Integer,primary_key=True,nullable=False,autoincrement=True)
    category = db.Column(db.String(10),nullable=False)
    name = db.Column(db.String(30),nullable=False)
    word_description = db.Column(db.TEXT,nullable=True)
    price = db.Column(db.Float,nullable=False)
    image = db.Column(db.String(20),nullable=True)
    remaining = db.Column(db.Integer,nullable=False)

class Shopping_cart(db.Model):
    __tablename__ = 'shopping_cart'
    shopping_cartID = db.Column(db.Integer,primary_key=True,nullable=False,autoincrement=True)
    goods = db.Column(db.JSON,nullable=False)
    userID = db.Column(db.Integer,
                       db.ForeignKey('user.userID', ondelete="CASCADE"),
                       nullable=False)
    user = db.relationship('User',
                                   backref=db.backref('shopping_carts', cascade="all, delete-orphan"))

class Shopping_bill(db.Model):
    __tablename__ = 'shopping_bill'
    shopping_billID = db.Column(db.Integer,primary_key=True,nullable=False,autoincrement=True)
    goods = db.Column(db.JSON,nullable=False)
    total_amount = db.Column(db.Float,nullable=False)
    shipping_addressID = db.Column(db.Integer,
                       db.ForeignKey('shipping_address.shipping_addressID'),
                       nullable=False)
    userID = db.Column(db.Integer,
                       db.ForeignKey('user.userID', ondelete="CASCADE"),
                       nullable=False)
    user = db.relationship('User',
                                   backref=db.backref('shopping_bills', cascade="all, delete-orphan"))
