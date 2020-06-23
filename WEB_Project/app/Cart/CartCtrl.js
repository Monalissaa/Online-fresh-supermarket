'use strict';

angular.module('Cart',['questionList','phonecatApp'])
    .config(function ($stateProvider) {
        $stateProvider.state('Cart', {
            url:'/Cart',
            views:{
                'header':{
                    templateUrl: 'headers/purchase_cart.html',
                    controller: 'CartCtrl'
                },
                'main':{
                    templateUrl: 'Cart/Cart.html',
                    controller: 'CartCtrl'
                }
            },
            params:{user:{}}
        });
    })
    .controller('CartCtrl',function ($scope, $state, $stateParams, List, $element) {
        var user=$stateParams.user;
        List.Getcart('shopping_cart',user.userID).then(function (res) {
            console.log('查询购物车成功');
            $scope.cart_item=res.data;
        }, function (res) {
            console.log(res);
        });

        $scope.backTOShopping=function(){
            $state.go('Shopping',{user:user});
        };

        $scope.deleteItem=function (ID) {
            List.Deleteitem('shopping_cart', user.userID, ID).then(function (res) {
                List.Getcart('shopping_cart',user.userID).then(function (res) {
                    console.log('查询购物车');
                    $scope.cart_item=res.data;
                }, function (res) {
                    console.log(res);
                });
            }, function (res) {
                console.log(res);
            });
        };

        //查看收货地址
        function Qaddress(){
            List.Getcart('shipping_address',user.userID).then(function (res) {
                console.log('查询收货地址');
                console.log(res.data);
                $scope.address=res.data;
                if($scope.address.length) $scope.selectedaddress=$scope.address[0].shipping_addressID;
            }, function (res) {
                console.log(res);
            });
        }
        Qaddress();

        //添加收获地址
        $scope.addAddress=function () {
            if(user.userID===undefined) $state.go('Login');
            else
            document.getElementById('addAdress').style.display="block";
        };
        $scope.closeaddAddress=function () {
            document.getElementById('addAdress').style.display="none";
        };
        $scope.clearcity=function () {
            $scope.city='';
        };
        $scope.cleararea=function () {
            $scope.area='';
        };
        $scope.clearstreet=function () {
            $scope.street='';
        };
        $scope.cleardetails=function () {
            $scope.details='';
        };
        $scope.submit=function (city, area, street, details) {
            List.Addaddress('shipping_address',user.userID, city, area, street, details).then(function (res) {
                Qaddress();
                document.getElementById('addAdress').style.display="none";
            }, function (res) {
                console.log(res);
            });
        };

        //选择收获地址并提交订单
        $element.find('input').on('keydown', function(ev) { //搜索分类
            ev.stopPropagation();
        });

        $scope.confirmPurchase=function (address) {
            List.PurchaseConfirm('shipping_bill',user.userID,address).then(function (res) {
                console.log("已下单");
                $state.go("Bill",{user:user});
            }, function (res) {
                console.log(res);
            });
        };

        $scope.GoBill=function () {
            if(user.userID===undefined) $state.go('Login');
            else $state.go("Bill",{user:user});
        };

    });
