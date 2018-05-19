var expect  = require('chai').expect;
let TotalsCalculator = require('../calculators/totalsCalculator');
let products = {
    "homi" : 549.99,
    "heai" : 1399.99,
    "cari" : 109.50,
    "peti" : 30.00,
   };

let totalsCalculator = new TotalsCalculator();
describe('Totals calculator', function() {
    it('Should calculate totals correctly', function() {
        let result = totalsCalculator.calculateTotal(['homi', 'cari'] ,products);
        expect( result).to.equal(659.49);
    });

    it('Should apply discounts correctly', function() {
        let result = totalsCalculator.applyDiscounts(300, [{ code: 'DISCOUNT1', amount: 50 }]);
        expect(result).to.equal(250.00);
    })

});