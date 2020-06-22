'use strict';
//接口
angular.module('questionList', ['Resources','ngResource'])
    .factory('List', function ($q, $http, ListResources) {
        return {
            Login : function (inter, userInfo) {  //获取队列
                var defer = $q.defer();
                ListResources.login({interface : inter,}, userInfo, function (res, headers) {
                    defer.resolve(res);
                }, function (res, headers) {
                    defer.reject(res);
                });
                return defer.promise;
            },
            Register: function (inter, userInfo) {      //取消题目
                var defer = $q.defer();
                ListResources.registers({interface : inter}, userInfo,
                    function (res, headers) {
                    defer.resolve(res);
                }, function (res) {
                    defer.reject(res);
                });
                return defer.promise;
            },
            Shopping: function (inter) {      //确认题目
                var defer = $q.defer();
                ListResources.shopping({interface : inter}, function (res, headers) {
                    defer.resolve(res);
                }, function (res) {
                    defer.resolve(res);
                });
                return defer.promise;
            },
            ManageList : function (inter, cate, key) {  //管理题目
                var defer = $q.defer();
                ListResources.get({
                    interface : inter,
                    keywords : key,
                    category : cate
                }, function (res, headers) {
                    defer.resolve(res);
                }, function (res, headers) {
                    defer.reject(res);
                });
                return defer.promise;
            }

        }
    });
