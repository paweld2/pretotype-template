define(['underscore', 'appConfig'], function (_, config) {
        var serverBaseAddress = config.serverBase || "";
        var createBackendUrl = function (path) {
            return serverBaseAddress + path;
        };
        var createBackendFromSpec = function ($resource, spec) {
            return _.chain(spec.methods).pairs().map(function (par) {
                return [par[0], $resource(createBackendUrl(spec.base + par[1]))];
            }).object().value();
        };
        return {
            buildBackend: createBackendFromSpec,
            createBackendUrl: createBackendUrl
        };
    }
);