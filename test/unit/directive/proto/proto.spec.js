define(['underscore','angular-mocks','angular','directive/proto/protoDirectives'], function (_, mocks, angular, dirModule) {

    describe('directive: proto directives', function() {
        var element, scope;

        beforeEach(module(dirModule.name));

        beforeEach(inject(function($rootScope, $compile) {
            scope = $rootScope.$new();
            element =
                '<div pro-p>' +
                '<div prop-c option="1"></div>' +
                '<div prop-c option="2"></div>' +
                '<div prop-c option="3"></div>' +
                '</div>';

            scope.size = 100;

            element = $compile(element)(scope);
            scope.$digest();
        }));

        describe('AA', function() {
            it("BB", function() {
                var isolated = element.isolateScope();

            });

        });

        describe('when changing the initial value to a different one', function() {

            beforeEach(function() {
                scope.size = 160;
                scope.$digest();
            });

        });

    });
});

