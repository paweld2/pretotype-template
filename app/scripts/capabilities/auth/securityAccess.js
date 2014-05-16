define(['underscore'], function (_) {
    'use strict';
    // inspired on http://frederiknakstad.com/2013/01/21/authentication-in-single-page-applications-with-angular-js/
    var userRoles = {
        public: 1, // 001
        user: 2, // 010
        admin: 4,  // 100
        superAdmin: 8  // 1000
    };
    var accessLevels = {
        public: userRoles.public | userRoles.user | userRoles.admin | userRoles.superAdmin, // 1111
        anon: userRoles.public,  // 001
        anyUser: userRoles.user | userRoles.admin | userRoles.superAdmin, // 1110
        onlyAdmins: userRoles.admin | userRoles.superAdmin,    // 1100
        onlySuperAdmin: userRoles.superAdmin    // 1000
    };
    var buildUserRole = function (userAuthorization) {
        var userAuth = userAuthorization || {};
        if (userAuth.isAdmin) return userRoles.superAdmin;
        if (userAuth.isCoordinator) return userRoles.admin;
        if (userAuth.isActive) {
            return userRoles.user;
        } else {
            return userRoles.public;
        }
    };

    return {
        userRoles: userRoles,
        accessLevels: accessLevels,
        buildUserRole: buildUserRole
    };
});
