define([
    'underscore',
    'eelnss',
    'utils/Logger',
    'capabilities/crud/abstractCrudContract'

], function(_, lenses, logger, abstractCrudContract) {

    var contract = abstractCrudContract;

    function specificationRegistration(globalState, cookieCLen, api) {

        var state = globalState;
        var metaModelRef = lenses.api.buildContextLen("crud.metaModel").bindContext([]);
        var metaModelByID = lenses.api.buildContextLen("crud.metaModel.{:modelID}");
        var metaModelMap = lenses.api.buildContextLen("crud.metaModel.{:modelID}.(modelName,map.clenLoad)");

        var studentLoadDefinition = "data.student.{:idStudent}.(lastName,firstName,schoolClass)";
        var metaModelData = [
            ["student", "student", studentLoadDefinition]
        ];
        state = metaModelMap.lset(metaModelData, state);


        var studentLoad = lenses.api.buildContextLen(studentLoadDefinition);
        studentLoad.lset([
            ["st1", "name1", "ffff", "0A"]
        ], state);

        api.registrationApi.whenGET(contract.methods.metaModel).call(metaModelCallback);
        api.registrationApi.whenGET(contract.methods.modelApi).call(modelInformationCallback);
        api.registrationApi.whenPOST(contract.methods.modelList).call(modelListCallback);
        api.registrationApi.whenGET(contract.methods.loadListData).call(loadListDataCallback);

        function metaModelCallback(method, url, data) {
            return [200, metaModelRef.get(state)];
        }

        var modelInfoRegexp = api.methodRegexp(contract.methods.modelApi);

        function modelInformationCallback(method, url, data) {
            var paramsMatch = modelInfoRegexp.exec(url);

            return [200, {
                modelId: paramsMatch[1]
            }];

        }

        var modelListRegexp = api.methodRegexp(contract.methods.modelList);

        function modelListCallback(method, url, data) {
            var paramsMatch = modelListRegexp.exec(url);
            var modelId = paramsMatch[1];
            var model = metaModelByID.cget([modelId], state);
            var clen = cachedCLen(model.map.clenLoad);

            var results = {
                nrOfResults: 100,
                results: clen.lget(state)
            };

            return [200, results];

        }

        function loadListDataCallback(method, url, data) {

        }

        var compiledCLen = {};

        function cachedCLen(clenDef) {
            if (_.has(compiledCLen, clenDef)) {
                return compiledCLen[clenDef];
            }
            compiledCLen[clenDef] = lenses.api.buildContextLen(clenDef);
            return compiledCLen[clenDef];
        }

    }

    return {
        apiContract: contract,
        specificationRegistration: specificationRegistration
    };
});
