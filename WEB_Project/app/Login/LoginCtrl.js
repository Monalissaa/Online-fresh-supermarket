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
    .controller('LoginCtrl',function ($scope, List, $state) {
        $scope.clearUsername=function () {
            $scope.username='';
        };
        $scope.clearPassword=function () {
            $scope.password='';
        };
        $scope.recall='请登录';
        $scope.login=function(username,password) {
            List.Login('user',username,password).then(function (res) {
                $scope.recall="登录成功";
                console.log(res);
            }, function (res) {
                $scope.recall="登录失败";
                console.log(res);
            });
        };
        $scope.Register=function () {
            $state.go('Register');
        };
    });
