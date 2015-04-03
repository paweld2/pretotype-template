var api = require('./ApplicationApi');

describe('Application routing - ', function () {
    var app = new api.app();
    var menu = new api.menu();
    it('should jump to from / on start', function () {
        app.go();
        app.checkInitState();
    });
    it('should redirect to root view, when using a not existing route', function () {
        app.goToUrl("notExisting/Routing/Endpoint");
        app.checkInitState();
    });

    it('should login correctly', function () {
        var loginPage = new api.page.login();
        app.go();
        app.checkInitState();
        menu.checkIsNotLoggedMenu();
        menu.goLogin();
        loginPage.isAppInThisPage();
        loginPage.actionLoginUserAccount('admin@pmsoft.eu', 'admin@pmsoft.eu');
        app.checkInitState();
        menu.checkIsLoggedMenu();
        menu.logoutAction();
        menu.checkIsNotLoggedMenu();
    });

});