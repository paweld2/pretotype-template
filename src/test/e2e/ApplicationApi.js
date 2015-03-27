const appRootPath = 'http://localhost:8001/';
var _ = require('underscore');
var _s = require('underscore.string');

var filterAngularProperties = function (objValue) {
    return _.chain(objValue).pairs()
        .filter(function (pair) {
            return !_s.startsWith(pair[0], '$');
        })
        .object()
        .value();
};

var _findStateLink = function (state) {
    return function () {
        return element(by.css('[ui-sref="' + state + '"]'));
    };
};
var _findCss = function (css) {
    return function () {
        return element(by.css(css));
    };
};
var _findID = function (idref) {
    return function () {
        return element(by.id(idref));
    };
};
var _findModel = function (model) {
    return function () {
        return element(by.model(model));
    };
};
var _findRepeaterRaw = function (repeat) {
    return function () {
        return element.all(by.repeater(repeat));
    };
};

var verifyThatElementExists = function (elementExtractor) {
    expect(elementExtractor().isPresent()).toBe(true);
};

var MenuApi = function () {
    var loginLink = _findStateLink('login');
    var initLink = _findStateLink('root.app');
    var administrationLink = _findStateLink('root.administration.menu');
    var logoutLink = _findCss('[ng-click="logout()"]');

    this.goLogin = function () {
        loginLink().click();
    };
    this.goInit = function () {
        initLink().click();
    };
    this.goAdministration = function () {
        administrationLink().click();
    };
    this.logoutAction = function () {
        logoutLink().click();
    };
    var checkLoginStatus = function (isUserLogged) {
        return function () {
            expect(loginLink().isPresent()).toBe(!isUserLogged);
            expect(initLink().isPresent()).toBe(true);
            expect(logoutLink().isPresent()).toBe(isUserLogged);
        };
    };
    this.checkIsNotLoggedMenu = checkLoginStatus(false);
    this.checkIsLoggedMenu = checkLoginStatus(true);
    this.checkLoggedAsAdmin = function () {
        expect(administrationLink().isPresent()).toBe(true);
    };

};

var LoginPage = function () {
    var passwordField = _findModel('data.password');
    var emailField = _findModel('data.email');
    var submitButton = _findCss('form[name="loginForm"] button');
    this.actionLoginUserAccount = function (email, password) {
        emailField().sendKeys(email);
        passwordField().sendKeys(password);
        submitButton().click();
    };
    this.isAppInThisPage = function () {
        api = new ApplicationApi();
        verifyThatElementExists(passwordField);
        verifyThatElementExists(emailField);
        api.checkCurrentStateName("login");
    };
};

var AdministrationPage = function () {
    this.isAppInThisPage = function () {
        api = new ApplicationApi();
        api.checkCurrentStateName("root.administration.menu");
    };
}

var ApplicationApi = function () {

    var html = function () {
        return element(by.css('html'));
    };
    this.goToUrl = function (routingPath) {
        browser.get(appRootPath + "#/" + routingPath);
    };
    this.go = function () {
        this.goToUrl("");
    };

    this.checkState = function (expected) {
        expect(browser.driver.getCurrentUrl()).toBe(appRootPath + "#/" + expected);
    };
    this.checkCurrentStateName = function (name) {
        var stateName = html().evaluate("$state.current.name");
        expect(stateName).toBe(name);
    };

    this.checkInitState = function () {
        this.checkCurrentStateName('root.app');
    };

    this.loginAsAdmin = function () {
        this.loginAction('admin@pmsoft.eu', 'admin@pmsoft.eu');
    };
    this.loginAction = function (email, password) {
        var loginPage = new LoginPage();
        var menu = new MenuApi();
        menu.checkIsNotLoggedMenu();
        menu.goLogin();
        loginPage.isAppInThisPage();
        loginPage.actionLoginUserAccount(email, password);
        this.checkInitState();
        menu.checkIsLoggedMenu();
    };

};

module.exports = {
    app: ApplicationApi,
    menu: MenuApi,
    page: {
        login: LoginPage,
        administration: AdministrationPage
    }
};