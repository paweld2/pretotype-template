define([],
    function() {
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

        return crudApiContract;
    });
