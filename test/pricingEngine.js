var expect  = require('chai').expect;
let PricingEngine = require('../pricingEngine');
let pricingRules = [
    {
        type: 'bulkDiscount',
        code: 'BULKDISCOUNTHOMI',
        data : {
            product: 'homi',
            reducedPrice: 499.99,
            minimumAmount: 4
        }
    }, 
    { 
        type: 'bundle',
        code: 'FREEPETIWITHHEAL',
        data: {
            product: 'heai',
            freeProduct: 'peti'
            
        }
    },
    {
        type: 'priceOf',
        code: 'CARIBUY3FOR2',
        data : {
            product: 'cari',
            buy : 3,
            pay: 2
        }
    }
];
describe('Pricing engine', function() {
    it('Should calculate 3 for 2 deals correctly', function() {
        let pricingEngine = new PricingEngine();
        let discount = pricingEngine.calculateDiscounts(['cari', 'cari', 'cari', 'peti'], pricingRules);
        expect( discount[0].code).to.equal('CARIBUY3FOR2');
        expect( discount[0].amount).to.equal(109.5);
    });

    it('Should calculate bulk discounts correctly', function() {
        let pricingEngine = new PricingEngine();
        let discount = pricingEngine.calculateDiscounts(['cari', 'homi', 'homi', 'cari', 'homi', 'homi', 'homi'], pricingRules);
        expect( discount[0].code).to.equal('BULKDISCOUNTHOMI');
        expect( discount[0].amount).to.equal(250);
    });

    it('Should calculate bundle discounts correctly', function() {
        let pricingEngine = new PricingEngine();
        let discount = pricingEngine.calculateDiscounts(['heai', 'peti', 'homi'], pricingRules);
        expect( discount[0].code).to.equal('FREEPETIWITHHEAL');
        expect( discount[0].amount).to.equal(30);
    });
});