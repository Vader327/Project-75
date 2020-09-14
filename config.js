import * as firebase from 'firebase';
require('@firebase/firestore');

var firebaseConfig = {
    apiKey: "AIzaSyBdiIp4QsmbbthfluGMO7gTzy7uF6OtDV0",
    authDomain: "story-hub-d8448.firebaseapp.com",
    databaseURL: "https://story-hub-d8448.firebaseio.com",
    projectId: "story-hub-d8448",
    storageBucket: "story-hub-d8448.appspot.com",
    messagingSenderId: "1033670351918",
    appId: "1:1033670351918:web:58b3bfb2b30246634393bf"
};

firebase.initializeApp(firebaseConfig);

export default firebase.firestore();