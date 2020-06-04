from models import Shopping_cart
from models import User
from models import Goods
from models import Shipping_address
from models import Shopping_bill
from exts import db


class ForTest:

    def __init__(self):
        self.a = []
        self.b = {'1':'2'}
        self.c = {'2':'5'}
        self.a.append(self.b)
        self.a.append(self.c)

    def processing(self):
        print('111')
        # 测试能不能JSON数组中有JSON元素
        # userTest = User(username='123',password='123',phone='123',image='222')
        # userList = db.session.query(User.userID).filter_by().all()
        # userList = [id[0] for id in userList]
        # if len(userList)==0 or userTest.userID not in userList:
        #     db.session.add(userTest)
        #     db.session.commit()
        # goodsTest = self.a
        # jsonTest = Shopping_cart(userID=userTest.userID,goods=goodsTest)
        # print(jsonTest.userID)
        # db.session.add(jsonTest)
        # db.session.commit()

        # goodsTest1 = Goods(
        #     category='水果', name='火龙果', word_description='这是一个火龙果',
        #     price=11.5,remaining=5,image='huolongguo.png'
        # )
        # goodsTest2 = Goods(
        #     category='水果', name='苹果', word_description='这也是一个火龙果',
        #     price=12, remaining=6,image='pingguo.png'
        # )
        #
        # db.session.add(goodsTest1)
        # db.session.add(goodsTest2)
        # db.session.commit()
        # shoppingCartTest = Shopping_cart(goods={},userID=3)
        # db.session.add(shoppingCartTest)
        # db.session.commit()


