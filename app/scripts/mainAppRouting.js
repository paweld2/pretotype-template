define(
    [
        'utils/routingLoader',
        'capView/capViewRootLayout',
        'capView/auth/capViewAuth',
        'capView/crudTest/capViewCrudTest',
        'capView/administration/capViewAdministration',
        'capView/cookie/capViewCookies',
        'capView/stateTest/capViewStateTest'
    ], function (routingLoader) {
        var capViewList = Array.prototype.slice.call(arguments, 1);
        return routingLoader.capabilitiesViewLoader(capViewList);
    });
