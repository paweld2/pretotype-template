/* Simple crud capability */

define(
    ['angular', 'underscore',
        'utils/Logger',
        './abstractCrudContract',
        'mixin/promiseTrackerMixin'
    ],
    function (angular, _, logger, contract, promiseTrackerMixin) {
        'use strict';

        var moduleName = 'crudCapabilityModule';
        var module = angular.module(moduleName, [contract.name, promiseTrackerMixin.name]);

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
