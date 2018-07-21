importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');


firebase.initializeApp({
  apiKey: "AIzaSyAZZdP5Vd5U8BO7_RNNuD6Zt2AjgLCBzUQ",
  authDomain: "reminder619.firebaseapp.com",
  databaseURL: "https://reminder619.firebaseio.com",
  projectId: "reminder619",
  storageBucket: "reminder619.appspot.com",
  messagingSenderId: "836691507074"});

const messaging = firebase.messaging();

/*
export const firebaseConfig = {
  'messagingSenderId': '836691507074'
};
*/
