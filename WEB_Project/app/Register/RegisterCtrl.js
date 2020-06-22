'use strict';

angular.module('Register',['questionList'])
    .config(function ($stateProvider) {
        $stateProvider.state('Register', {
            url:'/Register',
            views:{
                'header':{
                    templateUrl: 'headers/login.html',
                    controller: 'loginCtrl'
                },
                'main':{
                    templateUrl: 'Register/Register.html',
                    controller: 'RegisterCtrl'
                }
            }
        });
    })

.controller('RegisterCtrl', function($scope, List, $state, $http) {
    $scope.info='注册账户';
    $scope.clearUsername=function () {
        $scope.username='';
    };
    $scope.clearPassword=function () {
        $scope.password='';
    };
    $scope.clearphoneID=function () {
        $scope.phoneID='';
    };
    $scope.registerac=function (phoneID,username,password) {
        /*var userInfo={
            phone:phoneID,
            username:username,
            password:password,
            image:headImage
        }*/
        var formData=new FormData(document.getElementById('userInfo'));
        console.log(formData.get('image'));
        $http({
            method: 'POST',
            url: 'http://192.151.243.209/software/user',
            data:formData,
            headers:{
                'Content-Type':undefined
            }
        }).then(function successCallback(response) {
            $scope.info='注册成功';
            $state.go('Login');
            console.log(response);
        }, function errorCallback(response) {
            console.log(response);
        });
        /*List.Register('user',userInfo).then(function (res) {
            $scope.recall="注册成功";
            console.log(res);
        }, function (res) {
            $scope.recall="注册失败";
            console.log(res);
        });*/
    };
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


})
    .directive('ngTestUpload', function() {
        return {
            restrict: 'ACE',
            link: function(scope, element, attr) {
                element.on('change', function() {
                    scope.file = this.files[0];
                });
            },
            scope: {
                file: '=ngTestUpload'
            }
        };
    });
