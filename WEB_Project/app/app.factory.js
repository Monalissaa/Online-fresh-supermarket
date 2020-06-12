'use strict';
//接口
angular.module('questionList', ['Resources','ngResource'])
    .factory('List', function ($q, $http, ListResources) {
        return {
            Login : function (inter, user ,pass) {  //获取队列
                var defer = $q.defer();
                ListResources.get({
                    interface : inter,
                    username : user,
                    password : pass
                }, function (res, headers) {
                    defer.resolve(res);
                }, function (res, headers) {
                    defer.reject(res);
                });
                return defer.promise;
            },
            CancelQ: function (inter, timu_ids) {      //取消题目
                var defer = $q.defer();
                ListResources.delete({interface : inter}, timu_ids, function (res, headers) {
                    defer.resolve(res);
                }, function () {
                    defer.resolve(res);
                });
                return defer.promise;
            },
            UpdateQ: function (inter, timu_ids) {      //确认题目
                var defer = $q.defer();
                ListResources.put({interface : inter}, timu_ids, function (res, headers) {
                    defer.resolve(res);
                }, function () {
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
