
module.exports = class PricingEngine {

    constructor(productPricing) {
        this.productPricing = productPricing;
    }

    calculateDiscounts(products, pricingRules) {
        let discounts = [];
        for (let pricingRule of pricingRules) {
            switch (pricingRule.type) {
                case 'bulkDiscount' : {
                    this.addDiscount(discounts, this.bulkDiscountHandler(products, pricingRule));
                }
                case 'bundle' : {
                    this.addDiscount(discounts, this.bundleHandler(products, pricingRule));
                }
                case 'priceOf' : {
                    this.addDiscount(discounts, this.priceOfHandler(products, pricingRule));
                }
            }
        }
        return discounts;
    }

    addDiscount(discounts, discount) {
        if (discount && discount.amount && discount.code) {
            discounts.push(discount);
        }
    }

    bulkDiscountHandler(products, pricingRule) {
        let minimum = pricingRule.data.minimumAmount;
        let productOnSale = pricingRule.data.product;
        let matchingProducts = products.filter((product) => { return product === productOnSale;});
        if (minimum && matchingProducts.length &&  matchingProducts.length > minimum ) {
            let discountAmount = (this.productPricing[productOnSale] - pricingRule.data.reducedPrice) * matchingProducts.length;
            return { code: pricingRule.code, amount: discountAmount};
        }
    }

    bundleHandler(products, pricingRule) {
        let freebie = pricingRule.data.freeProduct;
        let productOnSale = pricingRule.data.product;
        let matchingProducts = products.filter((product) => {return productOnSale === product});
        if (matchingProducts.length > 0 ) {
            return { code: pricingRule.code, amount: this.productPricing[freebie] * matchingProducts.length};
        } 
    }

    priceOfHandler(products, pricingRule) {
        let minimum = pricingRule.data.buy;
        let amountFree = minimum - pricingRule.data.pay;
        let productOnSale = pricingRule.data.product;
        let matchingProducts = products.filter((product) => { return productOnSale === product});
        let noOfFreebies = Math.floor(matchingProducts.length / minimum);
        if (noOfFreebies >= 1) {
            let discount = this.productPricing[productOnSale] * amountFree;
            return { code: pricingRule.code, amount: this.productPricing[productOnSale] * amountFree};
        }
    }


};
