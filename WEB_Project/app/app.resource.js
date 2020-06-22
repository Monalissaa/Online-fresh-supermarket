'use strict';
//创建资源服务
angular.
module('Resources',[
    'ngResource',
    'helper'
])
    .factory('ListResources', function($resource, AppConstants) {
        return $resource(AppConstants.URL_BASE+'/:interface', {}, {
            //自定义config
            login:{
                method:'GET',
                hasBody:false,
            },
            register:{
                method:'POST',
                hasBody:true,
                headers:{
                    'Content-Type':'multipart/form-data;charset=UTF-8',
                }
            },
            delete:{
                method:'DELETE',
                hasBody:true,
                headers:{
                    'Content-Type':'application/json;charset=UTF-8'
                }
            },
            put:{
                method:'PUT',
                hasBody:true,
                headers:{
                    'Content-Type':'application/json;charset=UTF-8'
                }
            },
        });
    });

