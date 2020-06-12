'use strict';

angular.module('helper', [])
    .factory('AppConstants', function () {
        var self = {};
        var host = '192.151.243.209/software';
        var base = 'http://' + host;
        self.URL_BASE = base;

        return self;
    });
