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
            },
            registers:{
                method:'POST',
                hasBody:true,
                headers:{
                    'Content-Type':'multipart/form-data;charset=UTF-8',
                }
            },
            shopping:{
                method:'GET'
            },
            purchase:{
                method:'POST',
                hasBody:false
            },
            getcart:{
                method:'GET'
            },
            deleteitem:{
                method:'DELETE',
                hasBody:false
            }
        });
    });

