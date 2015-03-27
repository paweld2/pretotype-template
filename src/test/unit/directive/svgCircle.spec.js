define(['underscore','angular-mocks','angular','directive/svg/svgCircle'], function (_, mocks, angular, dirModule) {

    describe('directive: svg-circle', function() {
        var element, scope;

        beforeEach(module(dirModule.name));

        beforeEach(inject(function($rootScope, $compile) {
            scope = $rootScope.$new();

            element =
                '<svg-circle size="{{size}}" stroke="black" fill="blue"></svg-circle>';

            scope.size = 100;

            element = $compile(element)(scope);
            scope.$digest();
        }));

        describe('with the first given value', function() {
            it("should compute the size to create other values", function() {
                var isolated = element.isolateScope();
                expect(isolated.values.canvas).toBe(250);
                expect(isolated.values.center).toBe(125);
                expect(isolated.values.radius).toBe(100);
            });

            it("should contain a svg tag with proper size", function() {
                expect(element.attr('height')).toBe('250');
                expect(element.attr('width')).toBe('250');
            });

            it("should contain a circle with proper attributes", function() {
                expect(element.find('circle').attr('cx')).toBe('125');
                expect(element.find('circle').attr('cy')).toBe('125');
                expect(element.find('circle').attr('r')).toBe('100');
                expect(element.find('circle').attr('stroke')).toBe('black');
                expect(element.find('circle').attr('fill')).toBe('blue');
            });
        });

        describe('when changing the initial value to a different one', function() {

            beforeEach(function() {
                scope.size = 160;
                scope.$digest();
            });

            it("should compute the size to create other values", function() {
                var isolated = element.isolateScope();
                expect(isolated.values.canvas).toBe(400);
                expect(isolated.values.center).toBe(200);
                expect(isolated.values.radius).toBe(160);
            });

            it("should contain a svg tag with proper size", function() {
                expect(element.attr('height')).toBe('400');
                expect(element.attr('width')).toBe('400');
            });

            it("should contain a circle with proper attributes", function() {
                expect(element.find('circle').attr('cx')).toBe('200');
                expect(element.find('circle').attr('cy')).toBe('200');
                expect(element.find('circle').attr('r')).toBe('160');
                expect(element.find('circle').attr('stroke')).toBe('black');
                expect(element.find('circle').attr('fill')).toBe('blue');
            });
        });

    });
});

