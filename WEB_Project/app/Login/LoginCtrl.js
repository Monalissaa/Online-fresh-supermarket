'use strict';

angular.module('Login',['questionList'])
    .config(function ($stateProvider) {
        $stateProvider.state('Login', {
            url:'/Login',
            views:{
                'header':{
                    templateUrl: 'headers/login.html',
                    controller: 'loginCtrl'
                },
                'main':{
                    templateUrl: 'Login/Login.html',
                    controller: 'LoginCtrl'
                }
            }
        });
    })
    .controller('LoginCtrl',function ($scope,List) {
        $scope.clearUsername=function () {
            $scope.username='';
        };
        $scope.clearPassword=function () {
            $scope.password='';
        };
        $scope.login=function(username,password) {
            List.Login('user',username,password).then(function (res) {
                console.log("登录成功");
                console.log(res);
            }, function (res) {
                console.log("登录失败。");
                console.log(res);
            });
        };
    });
