(function() {
    'use strict';

    angular
        .module('cargotrackerApp')
        .factory('Data', Data);

    Data.$inject = ['$resource'];

    function Data ($resource) {
        var resourceUrl =  'api/data';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
            ,
            'get': {
                method: 'GET',isArray: true,
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' },

            'getAll':{
                method: 'GET', isArray: true

            }

        });
    }
})();




