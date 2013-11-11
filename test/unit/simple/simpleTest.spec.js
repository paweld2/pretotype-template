define(['underscore','chai'], function (_,chai) {
    var expect = chai.expect;
    var should = chai.should;
    describe("A suite", function() {
        it("contains spec with an expectation", function() {
            expect(true).to.equal(true);
        });
        it('works for underscore', function() {
            // just checking that _ works
            expect(_.size([1,2,3])).to.equal(3);
        });
    });
});

