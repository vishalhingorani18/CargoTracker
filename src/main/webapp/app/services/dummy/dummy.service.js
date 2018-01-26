(function() {
    'use strict';

    angular
        .module('cargotrackerApp')
        .factory('Dummy', Dummy);

    Dummy.$inject = ['$resource'];

    function Dummy ($resource) {
        var resourceUrl =  'app/data/commodities.json';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
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




