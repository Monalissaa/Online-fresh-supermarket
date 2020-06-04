from models import Goods
from flask import jsonify
from collections import defaultdict
from exts import db,ip_address

class GoodsProcess:
    # ip_address
    def __init__(self,method,image=None,**formDict):
        self.method = method
        self.image = image
        self.formDict = formDict

    def addGoods(self):
        # image = self.image
        image_filename = 'user' + self.image.filename
        image_path = 'http://' + ip_address + 'img/' + image_filename

        newGood = Goods(
            category=self.formDict.get('category'),
            name=self.formDict.get('name'),
            word_description=self.formDict.get('word_description'),
            image=image_path,
            price=self.formDict.get('price'),
            remaining=self.formDict.get('remaining')
        )
        db.session.add(newGood)
        db.session.commit()
        # 提交后没问题再进行保存图片
        self.image.save('./static/img/' + image_filename)
        result = {'code':200}
        return jsonify(result)

    def getProductList(self):
        goods_info = Goods.query.all()

        result = defaultdict(list)
        result['code'] = 200
        num = Goods.query.count()

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

            result['data'].append(info)
            # print(result)

            i += 1

        return jsonify(result)

    def processing(self):
        if self.method=='GET':
            return self.getProductList()
        else:
            return self.addGoods()