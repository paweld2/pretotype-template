/* Simple crud capability */

define(
    ['angular', 'underscore',
        'utils/Logger',
        './abstractCrudContract',
        'mixin/promiseTrackerMixin',
        'utils/BackendSpecification'
    ],
    function(angular, _, logger, contract, promiseTrackerMixin, backendSpecBuilder) {
        'use strict';

        var contractBackend = backendSpecBuilder.buildResourceModulesFromContract(contract);

        var moduleName = 'crudCapabilityModule';
        var module = angular.module(moduleName, [contractBackend.name, promiseTrackerMixin.name]);

        var crudModelServiceName = "crudModelService";

        module.factory(crudModelServiceName, [contractBackend.service, function(crudBackend) {

            var metaModelCached;

            // TODO: global error handling and user notification
            var crudApi = {
                getMetaModel: function() {
                    if (metaModelCached) {
                        return metaModelCached;
                    }
                    var l = new crudBackend.metaModel();
                    return crudBackend.metaModel.get(function(data) {
                        metaModelCached = data;
                    });
                },
                loadModelList: function(modelLoadParams) {
                    var loadApi = new crudBackend.modelList();
                    _.extend(loadApi, modelLoadParams);
                    return loadApi.$save({
                        modelId: modelLoadParams.modelId
                    });
                },
                getCrudApiForModel: function(modelName) {
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
