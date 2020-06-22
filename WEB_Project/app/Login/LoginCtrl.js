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
    .controller('LoginCtrl',function ($scope, List, $state, $http) {
        $scope.clearUsername=function () {
            $scope.username='';
        };
        $scope.clearPassword=function () {
            $scope.password='';
        };
        $scope.recall='请登录';
        $scope.login=function(username,password) {
            /*var formData=new FormData();
            formData.append('username',username);
            formData.append('password',password);*/
            /*$http({
                method: 'GET',
                url: 'http://192.151.243.209/software/user',
                data:formData,
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            }).then(function successCallback(response) {
                $scope.info='登录成功';
                console.log(response);
            }, function errorCallback(response) {
                console.log(response);
            });*/
            List.Login('user',username,password).then(function (res) {
                $scope.recall="登录成功";
                $state.go('Shopping',{user: res.data});
            }, function (res) {
                $scope.recall="登录失败";
                console.log(res);
            });
        };
        $scope.Register=function () {
            $state.go('Register');
        };
    });
