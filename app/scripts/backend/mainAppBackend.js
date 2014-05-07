define(['angular', 'has', 'appConfig',
    'backend/contract/modelContract',
    'backend/mock/initMock'], function (angular, has, appConfig, modelModule, mocks) {
    var moduleName = 'mainAppBackend';
    var module = angular.module(moduleName, [modelModule.name, mocks.name]);

    return {
        m: module,
        name: moduleName,
        api: {
            model: modelModule.name
        }
    };
});
