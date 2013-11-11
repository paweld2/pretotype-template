const appRootPath = 'http://localhost:8001/';
var ApplicationApi = function() {
    this.state1ListLink = element(by.css('[ui-sref="state1.list"]'));
    this.state2ListLink = element(by.css('[ui-sref="state2.list"]'));

    this.get = function() {
        browser.get(appRootPath);
    };

    this.checkState = function(expected) {
        expect(browser.driver.getCurrentUrl()).toBe(appRootPath + "#/" + expected);
    };


    this.checkState1 = function() {
        this.checkState('state1');
    };
    this.checkState1List = function() {
        this.checkState('state1/list');
    };
    this.goState1 = function() {
        var state1Link = element(by.css('[ui-sref="state1"]'));
        state1Link.click();
    };
    this.checkState2 = function() {
        this.checkState('state2');
    };
    this.checkState2List = function() {
        this.checkState('state2/list');
    };
    this.goState2 = function() {
        var state2Link = element(by.css('[ui-sref="state2"]'));
        state2Link.click();
    };

};

module.exports = ApplicationApi;