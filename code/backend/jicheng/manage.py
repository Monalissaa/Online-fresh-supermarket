from flask_script import Manager
from main import app
from flask_migrate import Migrate, MigrateCommand
from exts import db
# from models import User
# from models import Shipping_address
# from models import Shopping_cart
# from models import Shopping_bill
# from models import Goods

# 模型 -> 迁移文件 -> 表
# init
# migrate
# upgrade

manager = Manager(app)

# 1. 要使用flask_migrate，必需绑定app和db
migrate = Migrate(app, db)

# 2. 把MigrateCommand命令添加到manager中
manager.add_command('db', MigrateCommand)

if __name__ == '__main__':
    manager.run()

