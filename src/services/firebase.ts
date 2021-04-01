import firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_DB_API_KEY,
    authDomain: process.env.REACT_APP_DB_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_DB_PROJECT_ID,
    storageBucket: process.env.REACT_APP_DB_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_DB_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_DB_APP_ID
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Utils
export const db = firebase.firestore()
export const auth = firebase.auth()
export const currentUser = auth.currentUser

//Firebase collections
export const usersCollection = db.collection('Users')
export const storage = firebase.storage()

//Providers
export const provider = new firebase.auth.GoogleAuthProvider();
