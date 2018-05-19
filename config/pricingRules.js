module.exports = [
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
]