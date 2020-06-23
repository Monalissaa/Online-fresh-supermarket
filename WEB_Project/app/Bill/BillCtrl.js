'use strict';

angular.module('Bill',['questionList'])
    .config(function ($stateProvider) {
        $stateProvider.state('Bill', {
            url:'/Bill',
            views:{
                'header':{
                    templateUrl: 'headers/purchase_bill.html',
                    controller: 'BillCtrl'
                },
                'main':{
                    templateUrl: 'Bill/Bill.html',
                    controller: 'BillCtrl'
                }
            },
            params:{user:{}}
        });
    })
    .controller('BillCtrl',function ($scope, $state, $stateParams,List) {
        var user=$stateParams.user;
        $scope.head=user.image;
        function GetBill(){
            List.Getcart('shipping_bill',user.userID).then(function (res) {
                console.log("查询历史账单");
                $scope.bills=res.data;
            }, function (res) {
                console.log(res);
            });
        }
        GetBill();

        $scope.clearInput=function(){
            $scope.query='';
        };

        $scope.Detail=function(key){
            $scope.goods=$scope.bills[key].goods;
        };

        $scope.backTOCart=function () {
            $state.go('Cart',{user: user});
        };
    });
