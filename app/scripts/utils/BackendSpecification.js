define(['underscore', 'appConfig', 'angular-resource'], function (_, config, resource) {
        var serverBaseAddress = config.serverBase || "";

        function createBackendUrl(path) {
            return serverBaseAddress + path;
        }

        function buildBackendResources($resource, spec) {
            return _.chain(spec.methods).pairs().map(function (par) {
                return [par[0], $resource(createBackendUrl(spec.base + par[1]))];
            }).object().value();
        }


        function buildResourceModulesFromContract(apiContract) {
            var moduleName = apiContract.id + 'BackendModule';
            var module = angular.module(moduleName, ['ngResource']);
            var serviceName = apiContract.id + 'Service';

            module.factory(serviceName, ['$resource', function ($resource) {
                return buildBackendResources($resource, apiContract);
            }]);
            return {
                m: module,
                service: serviceName,
                specification: apiContract,
                name: moduleName
            };
        }

        return {
            buildResourceModulesFromContract: buildResourceModulesFromContract,
            createBackendUrl: createBackendUrl
        };
    }
);