'use strict';
//接口
angular.module('questionList', ['Resources','ngResource'])
    .factory('List', function ($q, $http, ListResources) {
        return {
            Login : function (inter, username,password) {  //获取队列
                var defer = $q.defer();
                ListResources.login({
                    interface : inter,
                    username:username,
                    password:password
                }, function (res, headers) {
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
            Purchase : function (inter, ID, num, user) {  //管理题目
                var defer = $q.defer();
                ListResources.purchase({
                    interface : inter,
                    goodsID : ID,
                    userID  : user,
                    number  : num
                }, function (res, headers) {
                    defer.resolve(res);
                }, function (res, headers) {
                    defer.reject(res);
                });
                return defer.promise;
            },
            Getcart : function (inter, userID) {  //获取队列
                var defer = $q.defer();
                ListResources.getcart({
                    interface : inter,
                    userID:userID
                }, function (res, headers) {
                    defer.resolve(res);
                }, function (res, headers) {
                    defer.reject(res);
                });
                return defer.promise;
            },
            Deleteitem : function (inter, userID, goodsID) {  //获取队列
                var defer = $q.defer();
                ListResources.deleteitem({
                    interface : inter,
                    userID:userID,
                    goodsID:goodsID
                }, function (res, headers) {
                    defer.resolve(res);
                }, function (res, headers) {
                    defer.reject(res);
                });
                return defer.promise;
            },
            Addaddress : function (inter, userID, city, area, street, details) {  //获取队列
                var defer = $q.defer();
                ListResources.purchase({
                    interface : inter,
                    userID:userID,
                    city:city,
                    area:area,
                    street:street,
                    details:details
                }, function (res, headers) {
                    defer.resolve(res);
                }, function (res, headers) {
                    defer.reject(res);
                });
                return defer.promise;
            },
            PurchaseConfirm : function (inter, userID, address) {  //获取队列
                var defer = $q.defer();
                ListResources.purchase({
                    interface : inter,
                    userID:userID,
                    shipping_addressID: address
                }, function (res, headers) {
                    defer.resolve(res);
                }, function (res, headers) {
                    defer.reject(res);
                });
                return defer.promise;
            },
        };
    });
