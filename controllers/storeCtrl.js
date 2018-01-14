const api = require('../db/api')
const helpers = require('../helpers.js')
const xtend = require('xtend')

const buyItem = async (store_id, item_id, buyer_id, seller_id) => {
    const storeItemPath = `/stores/${store_id}/${item_id}`
    let listItem = await api.getData(storeItemPath)
    let buyerResources = await api.getData(`/users/${buyer_id}/resources`)
    let sellerResources = await api.getData(`/users/${seller_id}/resources`)
    const {item, costItem, amount, costAmount} = listItem
    
    if ( !helpers.validateStoreItem(listItem.item) ) return false
    if ( !helpers.validateStoreItem(listItem.costItem) ) return false
    if ( !helpers.validateTransaction(buyerResources[costItem], costAmount) ) return false
    
    const duplicate = xtend(buyerResources, {[item]: Number(buyerResources[item]) + Number(amount)})
    const finalBuyerResources = xtend(duplicate, {[costItem]: Number(buyerResources[costItem]) - Number(costAmount)})
    const finalSellerResources = xtend(sellerResources, {[costItem]: Number(sellerResources[costItem]) + Number(costAmount)})
    
    if( !await api.setData(`/users/${seller_id}/resources`, finalSellerResources) ) return false
    if( !await api.setData(`/users/${buyer_id}/resources`, finalBuyerResources) ) return false
    if( !await api.removeData(storeItemPath) ) return false
    
    return true
}





const ctrl = {buyItem}
module.exports = ctrl