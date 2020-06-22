'use strict';

angular.module('Cart',['questionList'])
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
    .controller('CartCtrl',function ($scope, $state, $stateParams, List) {
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
                    console.log('查询购物车成功');
                    $scope.cart_item=res.data;
                }, function (res) {
                    console.log(res);
                });
            }, function (res) {
                console.log(res);
            });
        };
    });
