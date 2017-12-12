const store = require('./firebase')

const getData = (dataPath) => {
   return store.ref(dataPath).once('value').then(data => {
        const data = data.val()
        return data
    }).catch(err => {
        console.log('failed to fetch data')
    })
} 

module.exports = {
    getData
}