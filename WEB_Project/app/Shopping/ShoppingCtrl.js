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
            },
            params:{user:{}}
        });
    })
    .controller('ShoppingCtrl',function ($scope, List, $state, $mdSidenav, $http, $stateParams) {
        //获取商品列表
        List.Shopping('goods').then(function (res) {
            $scope.data=res.data;
            console.log(res.data);
        }, function (res) {
            console.log(res);
        });
        //显示用户信息
        var user=$stateParams.user;
        $scope.userID=user.userID;
        $scope.QheadImage=user.image;
        $scope.thumb=user.image;
        $scope.Qusername=user.username;
        $scope.QphoneID=user.phone;
        //如未登录，则跳转到登录界面
        $scope.toLogin=function () {
            $state.go('Login');
        };
        //修改用户信息
        var reader = new FileReader();   //创建一个FileReader接口
        $scope.form = {     //用于绑定提交内容，图片或其他数据
            image:{},
        };
        $scope.img_upload = function(files) {       //单次提交图片的函数
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
        $scope.clearphoneID=function () {
            $scope.phoneID='';
        };
        $scope.clearPassword=function () {
            $scope.password='';
        };

        //提交修改
        $scope.changeInfo=function(){
            var formData=new FormData(document.getElementById('userInfo'));
            formData.append('userID',user.userID);
            $http({
                method: 'PUT',
                url: 'http://192.151.243.209/software/user',
                data:formData,
                headers:{
                    'Content-Type':undefined
                }
            }).then(function successCallback(res) {
                $state.go('Shopping',{user: res.data.data});
            }, function errorCallback(res) {
                console.log(res);
            });
        };

        //动态UI设计
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

        //添加商品
        $scope.addItem=function(){
            document.getElementById("ifAddItem").style.display='block';
        };
        $scope.closeAddItem=function(){
            document.getElementById("ifAddItem").style.display='none';
        };
        var reader2 = new FileReader();   //创建一个FileReader接口
        $scope.form = {     //用于绑定提交内容，图片或其他数据
            image:{},
        };
        var Image;
        $scope.img_upload2 = function(files) {       //单次提交图片的函数
            Image=files[0];
            reader2.readAsDataURL(files[0]);  //FileReader的方法，把图片转成base64
            reader2.onload = function (ev) {
                $scope.$apply(function () {
                    $scope.itemImage=ev.target.result;  //接收base64
                });
            };
        };
        $scope.clearname=function(){
            $scope.name='';
        };
        $scope.clearcategory=function(){
            $scope.category='';
        };
        $scope.clearremaining=function(){
            $scope.remaining=0;
        };
        $scope.clearprice=function(){
            $scope.price=0;
        };
        $scope.submit=function(){
            var formData=new FormData(document.getElementById('ItemInfo'));
            $http({
                method: 'POST',
                url: 'http://192.151.243.209/software/goods',
                data:formData,
                headers:{
                    'Content-Type':undefined
                }
            }).then(function successCallback(response) {
                document.getElementById("ifAddItem").style.display='none';
                List.Shopping('goods').then(function (res) {
                    $scope.data=res.data;
                    console.log(res.data);
                }, function (res) {
                    console.log(res);
                });
            }, function errorCallback(response) {
                console.log(response);
            });
        };
        //购买商品
        $scope.purchase_num=0;
        $scope.numchange=function (plus ,num, max) {
            if(plus&&num<max) $scope.purchase_num++;
            if(!plus&&num>0)  $scope.purchase_num--;
        };
        $scope.purchase=function(goodsID, num, max){
            if(user.userID===undefined) $state.go('Login');
            if(num>max) num=max;
            if(num>0){
                List.Purchase('shopping_cart',goodsID,num,user.userID).then(function (res) {
                    $scope.recall="添加商品成功";
                    console.log(res);
                }, function (res) {
                    $scope.recall="添加商品失败";
                    console.log(res);
                });
            }
        };


        //查看购物车
        $scope.purchaseCart=function () {
            $state.go('Cart',{user:user});
        };
    });
