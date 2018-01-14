const config = require('./config.js')
const validateStoreItem = function(name) {
    return config.STORE_ITEMS.includes(name.toLowerCase())
}

const validateTransaction = function(value, cost) {
    if (value > cost) return true
    return false
}

module.exports = {
    validateStoreItem,
    validateTransaction
}