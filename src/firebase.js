import firebase from 'firebase/app';
import 'firebase/messaging';


const app = firebase.initializeApp({
    apiKey: "AIzaSyBZbUv9ODxBBnqfmX-mfgfpXLumkrbIcRE",
    authDomain: "order-server-hq.firebaseapp.com",
    projectId: "order-server-hq",
    storageBucket: "order-server-hq.appspot.com",
    messagingSenderId: "447391958873",
    appId: "1:447391958873:web:7b51db2ed1678a76a9ae48",
    measurementId: "G-P03CP6L6HB"
});

const KEY = 'BF_dD4QexT-eNZBwS5JnYG3v7u8XlrH6IBn3nOZRE66TTRSbKhXu65zwQgL7sW3OTrdku7z8hRIRV_GimSnE8Vk'

export const getToken = () => app.messaging().getToken({ vapidKey: KEY })

export const onMessage = () => new Promise((resolve, reject) => {
    app.messaging().onMessage(resolve, reject)
});