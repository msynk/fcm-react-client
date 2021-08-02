// Scripts for firebase and firebase messaging
importScripts('firebase-app.js');
importScripts('firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
firebase.initializeApp({
  apiKey: "AIzaSyBZbUv9ODxBBnqfmX-mfgfpXLumkrbIcRE",
  authDomain: "order-server-hq.firebaseapp.com",
  projectId: "order-server-hq",
  storageBucket: "order-server-hq.appspot.com",
  messagingSenderId: "447391958873",
  appId: "1:447391958873:web:7b51db2ed1678a76a9ae48",
  measurementId: "G-P03CP6L6HB"
});

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
