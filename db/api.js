const store = require('./firebase')
var EventEmitter = require('events').EventEmitter;
const util = require('util')
const Firebase = require('./firebase')
function API (){
    this.authenticated = false
    Firebase((database)=>{
        this.store = database
        this.emit('authenticated')
    })
    this.on('authenticated', () => this.authenticated = true)
}
util.inherits(API, EventEmitter);
API.prototype.getData = function(dataPath) {
    if(this.authenticated) {
        return this.store.ref(dataPath).once('value').then(data => {
            const results = data.val()
            console.log(results)
            return results
        }).catch(err => {
            console.log('failed to fetch data',err)
        })
    } else {
        this.on('authenticated', this.getData(dataPath))
    }
}

API.prototype.setData = function(dataPath, dataObj) {
    return this.store.ref(dataPath).set(dataObj)
    .then(()=> true)
    .catch(err => false) 
}
const api = new API()
module.exports = api