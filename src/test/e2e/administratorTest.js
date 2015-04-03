var api = require('./ApplicationApi');

describe('Application administrator - ', function () {
    var app = new api.app();
    var menu = new api.menu();
    app.go();
    beforeEach(function () {
        app.loginAsAdmin();
    });
    afterEach(function () {
        menu.logoutAction();
    });
    it('should be logged correctly', function () {
        menu.checkIsLoggedMenu();
    });
//
//    var administrationPage = new api.page.administration();
//    it('should view Administration pages', function () {
//        menu.goAdministration();
//        administrationPage.isAppInThisPage();
//    });
});