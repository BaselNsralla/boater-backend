const firebase = require('firebase')
const config = {
    apiKey: "AIzaSyAT7CtVhcW4mHM_XMr3yxE5aqMby0QON0Y",
    authDomain: "boater-app.firebaseapp.com",
    databaseURL: "https://boater-app.firebaseio.com",
  };
//    storageBucket: "<BUCKET>.appspot.com",
//    messagingSenderId: "<SENDER_ID>",
 const store = firebase.initializeApp(config).database();

module.exports = store
