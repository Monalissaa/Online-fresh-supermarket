'use strict';

angular.module('Shopping',['questionList'])
    .config(function ($stateProvider) {
        $stateProvider.state('Shopping', {
            url:'/Shopping',
            views:{
                'header':{
                    templateUrl: 'headers/topBar.html',
                    controller: 'ShoppingCtrl'
                },
                'main':{
                    templateUrl: 'Shopping/Shopping.html',
                    controller: 'ShoppingCtrl'
                }
            }
        });
    })
    .controller('ShoppingCtrl',function ($scope, List, $mdSidenav, $http) {
        List.Shopping('goods').then(function (res) {
            console.log('获取商品列表');
            $scope.data=res.data;
        }, function (res) {
            console.log(res);
        });

        //修改用户信息
        var reader = new FileReader();   //创建一个FileReader接口
        $scope.form = {     //用于绑定提交内容，图片或其他数据
            image:{},
        };
        //用于存放图片的base64
        var headImage;
        $scope.img_upload = function(files) {       //单次提交图片的函数
            headImage=files[0];
            reader.readAsDataURL(files[0]);  //FileReader的方法，把图片转成base64
            reader.onload = function (ev) {
                $scope.$apply(function () {
                    $scope.thumb=ev.target.result;  //接收base64
                });
            };
        };
        $scope.clearUsername=function () {
            $scope.username='';
        };
        $scope.clearPassword=function () {
            $scope.password='';
        };
        $scope.clearphoneID=function () {
            $scope.phoneID='';
        };
        $scope.selectedItem=function(key){
            $scope.selected=$scope.data[key];
            if (!$mdSidenav('left').isOpen()) buildToggler('left');
        };
        $scope.setting=function(){
            if (!$mdSidenav('right').isOpen()) buildToggler('right');
        };
        $scope.toggleLeft=function (nav) {
            buildToggler(nav);
        };
        function buildToggler(componentId) {
            $mdSidenav(componentId).toggle();
        }
    });
