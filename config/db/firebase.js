const firebase = require('firebase/app');
const { getFirestore } = require('firebase/firestore');
// const realtimefirebase = require('firebase/database')
require('firebase/firestore')
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyCDTBHuvyTf5zbcElfNihXh3Z8sDfL14yg",
//     authDomain: "esp8266-6eaac.firebaseapp.com",
//     databaseURL: "https://esp8266-6eaac-default-rtdb.firebaseio.com",
//     projectId: "esp8266-6eaac",
//     storageBucket: "esp8266-6eaac.appspot.com",
//     messagingSenderId: "958452209356",
//     appId: "1:958452209356:web:173a4a760b53d3c150d469",
//     measurementId: "G-25GHZ6JD9D"
// };

const firebaseConfig = {
    apiKey: "AIzaSyCp240ZYXW5gEKubxadUR8_P4faXlIXpEU",
    authDomain: "iot-project-5fae3.firebaseapp.com",
    databaseURL: "https://iot-project-5fae3-default-rtdb.firebaseio.com",
    projectId: "iot-project-5fae3",
    storageBucket: "iot-project-5fae3.appspot.com",
    messagingSenderId: "82346413203",
    appId: "1:82346413203:web:120cbefeaf27b176581166"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// const database = realtimefirebase.getDatabase()
const database = getFirestore()

module.exports = {
    database,
    // realtimefirebase
}