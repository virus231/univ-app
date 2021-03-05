import firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAkK9jSpy3Fh6yieUxMJRbzPAB6Y_2HSIg",
    authDomain: "univ-26d5c.firebaseapp.com",
    projectId: "univ-26d5c",
    storageBucket: "univ-26d5c.appspot.com",
    messagingSenderId: "993545720969",
    appId: "1:993545720969:web:68b553ff0cba10d9a46258"
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
