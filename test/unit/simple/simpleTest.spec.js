define(['underscore'], function (_) {
    describe("A suite", function() {
        it("contains spec with an expectation", function() {
            expect(true).toEqual(true);
        });
        it('works for underscore', function() {
            // just checking that _ works
            expect(_.size([1,2,3])).toEqual(3);
        });
    });
});

