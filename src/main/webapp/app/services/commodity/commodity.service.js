(function() {
    'use strict';

    angular
        .module('cargotrackerApp')
        .factory('Commodity', Commodity);

    Commodity.$inject = ['$resource'];

    function Commodity ($resource) {
        var resourceUrl =  'api/commodity/';

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




