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
//
//    describe('For a logged used - ', function() {
//        var menu = new api.menu();
//        beforeEach(function() {
//            menu.checkIsNotLoggedMenu();
//        });
//
//
//    });
//
//    it('should jump to from / to login', function() {
//        var app = new ApplicationApi();
//        app.get();
//        app.checkLoginState();
//    });
//    it('should jump to from state1 and state2 using links on page', function() {
//        var app = new ApplicationApi();
//
//        app.get();
//        app.goState1();
//        app.checkState1();
//        app.goState2();
//        app.checkState2();
//        app.goState1();
//        app.checkState1();
//    });
//    it('should jump from state1 to state1.list', function() {
//        var app = new ApplicationApi();
//        app.get();
//        app.goState1();
//        app.checkState1();
//        app.state1ListLink.click();
//        app.checkState1List();
//    });
//    it('should jump from state2 to state2.list', function() {
//        var app = new ApplicationApi();
//        app.get();
//        app.goState2();
//        app.checkState2();
//        app.state2ListLink.click();
//        app.checkState2List();
//    });
});