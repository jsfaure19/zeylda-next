// Import the functions you need from the SDKs you need
import Firebase from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import 'Firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfJuKia6kKdn7iVP3BkIERqBRVBmK_q4g",
  authDomain: "zeyldastream-3438e.firebaseapp.com",
  projectId: "zeyldastream-3438e",
  storageBucket: "zeyldastream-3438e.appspot.com",
  messagingSenderId: "916324846443",
  appId: "1:916324846443:web:46fb5f878e27f47ce5da2e",
  measurementId: "G-YZ3P685WJ1"
};

// Initialize Firebase
const app = Firebase.initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default Firebase;