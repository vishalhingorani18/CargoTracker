(function() {
    'use strict';

    angular
        .module('cargotrackerApp')
        .factory('Port', Port);

    Port.$inject = ['$resource'];

    function Port ($resource) {
        var resourceUrl =  'api/port/';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET',isArray: true},
            'get': {
                method: 'GET',isArray: true,
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();




