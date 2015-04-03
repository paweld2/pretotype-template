define([
    'underscore',
    'eelnss',
    'utils/Logger',
    'capabilities/auth/authorizationContract'

], function(_, lenses, logger, authorizationContract) {

    var contract = authorizationContract;

    function specificationRegistration(globalState, cookieCLen, api) {
        var sessionCLen = lenses.api.buildContextLen("app.sessions.{:sessionID}.(user,logged)");
        var usersByUIDCLen = lenses.api.buildContextLen("app.users.{:uID}.(email,password,name,isActive,roles)");
        var userDTOCLen = lenses.api.buildContextLen("(uid,email,password,name,isActive,roles)");
        var loginLen = cookieCLen.bindContext(["appSessionKey"]);
        var userLoggedLen = cookieCLen.bindContext(["loggedUser"]);
        var state = globalState;
        state = sessionCLen.lset(undefined, state);
        state = usersByUIDCLen.lset(undefined, state);
        var users = [
            ["u1", "admin@pmsoft.eu", "admin@pmsoft.eu", "administrator", true, ['user', 'admin']],
            ["u2", "normal@pmsoft.eu", "normal@pmsoft.eu", "user", true, ['user']],
            ["u3", "inactive@pmsoft.eu", "inactive@pmsoft.eu", "inactive", true, ['user']]
        ];
        state = usersByUIDCLen.lset(users, state);

        api.registrationApi.whenPOST(contract.methods.login).call(loginCallback);
        api.registrationApi.whenPOST(contract.methods.logout).call(logoutCallback);
        api.registrationApi.whenGET(contract.methods.userInfo).call(userInfoCallback);


        function loginCallback(method, url, data) {
            var userData = angular.fromJson(data);

            var userArray = usersByUIDCLen.find({
                email: userData.email,
                password: userData.password,
                isActive: true
            }).on(state);
            if (_.isEmpty(userArray)) {
                return [403];
            }
            state = loginLen.set(true, state);
            var user = userDTOCLen.lset(userArray, {});
            state = userLoggedLen.set(user, state);
            return [200, user];
        }

        function logoutCallback(method, url, data) {
            loginLen.set(undefined, state);
            userLoggedLen.set(undefined, state);
            return [200];
        }

        function userInfoCallback(method, url, data) {
            if (_.isUndefined(loginLen.get(state))) {
                return [403];
            }
            var user = userLoggedLen.get(state);
            return [200, user];
        }
    }

    return {
        apiContract: contract,
        specificationRegistration: specificationRegistration
    };
});
