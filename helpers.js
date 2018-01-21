const config = require('./config.js')
const uuidv1 = require('uuid/v1');

const validateStoreItem = function(name) {
    return config.STORE_ITEMS.includes(name.toLowerCase())
}

const validateTransaction = function(value, cost) {
    if (parseInt(value) > parseInt(cost)) return true
    return false
}

const generateId = function () {
    return uuidv1()
}
module.exports = {
    validateStoreItem,
    generateId,
    validateTransaction
}