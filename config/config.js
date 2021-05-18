import firebase from "firebase/app";
import "firebase/firestore"
import "firebase/storage";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGINGSENDERID,
    appId: process.env.APPID,
    measurementId: process.env.MEASUREMENTID,
    databaseURL: process.env.DATABASEURL,
};

if (!firebase.apps.length) {
    try {
        firebase.initializeApp(firebaseConfig);
        // firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
    } catch (err) {
        if (!/already exists/.test(err.message)) {
            console.error('Firebase initialization error', err.stack);
        }
    }
}


const db = firebase.firestore();

const storage = firebase.storage();  //firebase storage to save files. In our case, Images.

export { storage, db, firebase as default };