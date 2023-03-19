// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
    getAuth,
    initializeAuth,
    browserSessionPersistence,
    browserPopupRedirectResolver,
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC-9CgaiVbxNUd9foszKKRkRk4OH21bnF8",
    authDomain: "atomic-68635.firebaseapp.com",
    projectId: "atomic-68635",
    storageBucket: "atomic-68635.appspot.com",
    messagingSenderId: "1095522790795",
    appId: "1:1095522790795:web:8a6d21593e83201ff6d38e",
    measurementId: "G-D47XW8YY7G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
const auth = initializeAuth(app, {
    persistence: browserSessionPersistence,
    popupRedirectResolver: browserPopupRedirectResolver,
});
export { app, analytics, auth };
