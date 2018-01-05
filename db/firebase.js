
 const firebase = require('firebase')
 var firebase_admin = require("firebase-admin")
 var cert = require('../firebase_cert.json')
const noop = () => {}
const api = {store: noop}

 const config = {
     apiKey: "AIzaSyAT7CtVhcW4mHM_XMr3yxE5aqMby0QON0Y",
     authDomain: "boater-app.firebaseapp.com",
     databaseURL: "https://boater-app.firebaseio.com",
  };
  
function Firebase (cb) {
  firebase_admin.initializeApp({
    credential: firebase_admin.credential.cert(cert),
    databaseURL: "https://boater-app.firebaseio.com"
  });
  
  firebase_admin.auth().createCustomToken(String(Date.now()))
  .then((customToken) => {
     firebase.initializeApp(config)
     firebase.auth().signInWithCustomToken(customToken)
     firebase.auth().onAuthStateChanged(function(user) {
       console.log(user)
       cb(firebase.database())
     })
  })
  .catch((error) => {
    console.log("Error creating custom token:", error);
  });

}
  module.exports = Firebase  



  //onAuthStateChanged