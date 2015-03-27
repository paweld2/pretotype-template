/* Simple crud capability */

define(
    ['angular', 'underscore',
        'utils/Logger',
        'backend/abstractCrudContract',
        'backend/crud/crudSpecification',
        'mixin/promiseTrackerMixin',
        'utils/MockInfrastructure'
    ],
    function (angular, _, logger, contract, specification, promiseTrackerMixin, mockInfrastructure) {
        'use strict';

        mockInfrastructure.registerSpecification(contract, specification);

        var moduleName = 'crudCapabilityModule';
        var module = angular.module(moduleName, [contract.name, promiseTrackerMixin.name, mockInfrastructure.name]);

        var crudModelServiceName = "crudModelService";

        module.factory(crudModelServiceName, [contract.service , function (crudBackend) {

            var metaModelCached;

            // TODO: global error handling and user notification
            var crudApi = {
                getMetaModel: function () {
                    if (metaModelCached) {
                        return metaModelCached;
                    }
                    var l = new crudBackend.metaModel();
                    return crudBackend.metaModel.get(function (data) {
                        metaModelCached = data;
                    });
                },
                loadModelList: function (modelLoadParams) {
                    var loadApi = new crudBackend.modelList();
                    _.extend(loadApi, modelLoadParams);
                    return loadApi.$save({modelId: modelLoadParams.modelId});
                },
                getCrudApiForModel: function (modelName) {
                    return crudBackend.modelApi.get({
                        modelId: modelName
                    });
                }
            };

            return crudApi;
        }]);
        return {
            m: module,
            name: moduleName,
            crudService: crudModelServiceName
        };
    });
