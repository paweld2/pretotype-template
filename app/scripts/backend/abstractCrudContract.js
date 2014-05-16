define([
        'angular',
        'utils/BackendSpecification'
    ],
    function (angular, backendSpecBuilder) {
        var crudApiContract = {
            id: 'simpleCrud',
            base: '/backend/crud/',
            methods: {
                metaModel: 'metaModel.json',
                modelApi: 'modelApi/:modelId/api.json',
                modelList: 'modelApi/:modelId/modelList.json',
                loadListData: 'loadListData.json'
            }
        };


        return backendSpecBuilder.buildResourceModulesFromContract(crudApiContract);
    });
