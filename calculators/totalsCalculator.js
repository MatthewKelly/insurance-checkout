module.exports = class totalsCalculator {
    calculateTotal(items, products) {
        let total = 0;
        for (let item of items) {
            total = total + products[item]; 
        }
        return total;
    }

    applyDiscounts(total, discounts ) {
        for (let discount of discounts) {
            console.log(`${discount.code} applied for discount of $${discount.amount.toFixed(2)}`);
            total = total - discount.amount;
        }
        return total;
    }
}