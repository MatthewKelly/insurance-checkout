const readline = require('readline-sync');
const products = require('./products');
const PricingEngine = require('./pricingEngine');
const pricingRules = require('./pricingRules');
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

// get total without balances
let total = 0;
for (let item of items) {
    total = total + products[item]; 
}
console.log(`Total before discounts = $${total.toFixed(2)}` );

// add discounts
let pricingEngine = new PricingEngine();
let discounts = pricingEngine.calculateDiscounts(items, pricingRules);
for (let discount of discounts) {
    console.log(`${discount.code} applied for discount of $${discount.amount.toFixed(2)}`);
    total = total - discount.amount;
}
console.log(`Total after discounts = $${total.toFixed(2)}`);