define([
    'underscore',
    'eelnss',
    'utils/Logger',
    'capabilities/users/usersContract'

], function(_, lenses, logger, usersContract) {

    var contract = usersContract;

    function specificationRegistration(globalState, cookieCLen, api) {

        var usersByUIDCLen = lenses.api.buildContextLen("app.users.{:uID}.(email,password,name,isActive,isAdmin)");
        var userListView = lenses.api.buildContextLen("app.users.{:uID}.(email,name)");
        var state = globalState;
        var users = [
            ["u1", "admin@pmsoft.eu", "admin@pmsoft.eu", "administrator", true, true],
            ["u2", "normal@pmsoft.eu", "normal@pmsoft.eu", "user", true, false],
            ["u3", "inactive@pmsoft.eu", "inactive@pmsoft.eu", "inactive", false, false]
        ];
        state = usersByUIDCLen.lset(users, state);

        api.registrationApi.whenGET(contract.methods.userList).call(userListCallback);

        function userListCallback(method, url, data) {
            var users = userListView.lget(state);
            return [200, users];
        }
    }

    return {
        apiContract: contract,
        specificationRegistration: specificationRegistration
    };
});
