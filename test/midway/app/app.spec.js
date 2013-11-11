define(['AppInjector','angular','chai'], function (app,angular,chai) {
    app.initialize();
    var expect = chai.expect;
    var should = chai.should;
    describe("Application", function () {
        beforeEach(function () {

        });

        it("should be registered in angular", function () {
            var module = angular.module("myApp");
            expect(module).not.to.equal(null);
        });
    });
});