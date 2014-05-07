var ApplicationApi = require('./ApplicationApi');


describe('open application', function() {

    it('should jump to from / to state1', function() {
        var app = new ApplicationApi();
        app.get();
        app.checkState1();
    });
    it('should jump to from state1 and state2 using links on page', function() {
        var app = new ApplicationApi();

        app.get();
        app.goState1();
        app.checkState1();
        app.goState2();
        app.checkState2();
        app.goState1();
        app.checkState1();
    });
    it('should jump from state1 to state1.list', function() {
        var app = new ApplicationApi();
        app.get();
        app.goState1();
        app.checkState1();
        app.state1ListLink.click();
        app.checkState1List();
    });
    it('should jump from state2 to state2.list', function() {
        var app = new ApplicationApi();
        app.get();
        app.goState2();
        app.checkState2();
        app.state2ListLink.click();
        app.checkState2List();
    });
});