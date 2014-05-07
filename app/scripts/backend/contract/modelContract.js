define(['angular', 'angular-mocks', 'utils/BackendSpecification'], function (angular, resources, BackendSpecification) {
    var moduleName = 'modelContract';
    var module = angular.module(moduleName, []);

    var authBackendSpecification = {
        base: '/backend/model/',
        methods: {
            login: 'login.json',
            logout: 'logout.json'
        }
    };
    var modelBackendName = "modelBackendApi";
    module.factory(modelBackendName, ['$resource', function ($resource) {
        return backSpec.buildBackend($resource, authBackendSpecification);
    }]);

    return {
        m: module,
        name: moduleName,
        modelApi: modelBackendName
    };
});
