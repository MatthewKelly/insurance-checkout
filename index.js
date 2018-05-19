const readline = require('readline-sync');
const products = require('./config/products');
const PricingEngine = require('./calculators/pricingEngine');
const TotalsCalculator = require('./calculators/totalsCalculator');
const pricingRules = require('./config/pricingRules');

let totalsCalculator = new TotalsCalculator();
let pricingEngine = new PricingEngine(products);


const items = [];
let repeat = true;

// scan products
console.log('Welcome');
console.log('When ready to checkout out, leave item code blank');
while (repeat == true) {
    var itemCode = readline.question("Enter item code:");
    if (!itemCode) {
        repeat = false;
    } else {
        if (products[itemCode] !== undefined) {
            items.push(itemCode);
        }
    }
}
console.log(`Products on checkout = ${items}`);

// get initial total
let total = totalsCalculator.calculateTotal(items, products);
console.log(`Total before discounts = $${total.toFixed(2)}` );

// add discounts
let discounts = pricingEngine.calculateDiscounts(items, pricingRules);

// apply discounts
total = totalsCalculator.applyDiscounts(total, discounts);
console.log(`Total after discounts = $${total.toFixed(2)}`);