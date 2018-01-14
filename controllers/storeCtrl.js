const api = require('../db/api')
const config = require('../config.js')
const helpers = require('../helpers.js')
const xtend = require('xtend')
let inum = config.currentStoreItems
const buyItem = async (store_id, item_id, buyer_id) => {
    let listItem = await api.getData(`/stores/${store_id}/${item_id}`)
    let resources = await api.getData(`/users/${buyer_id}/resources`)
    const {item, costItem, amount, costAmount} = listItem
    if (!helpers.validateStoreItem(listItem.item)) return false
    if (!helpers.validateStoreItem(listItem.costItem)) return false
    if (!helpers.validateTransaction(resources[costItem], costAmount)) return false
    const duplicate = xtend(resources, {[item]: amount})
    const finalBuyerResources = xtend(duplicate, {[costItem]: resources[costItem] - costAmount})
    let results = await api.setData(`/users/${buyer_id}/resources`, finalBuyerResources)
    return results
}





const ctrl = {buyItem}
module.exports = ctrl