import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'



const firebaseConfig = {
  apiKey: "AIzaSyDJQbOcr-JkotarOYTNParyDav7If1nG2w",
  authDomain: "my-blog-website-9c0a1.firebaseapp.com",
  projectId: "my-blog-website-9c0a1",
  storageBucket: "my-blog-website-9c0a1.appspot.com",
  messagingSenderId: "499679488254",
  appId: "1:499679488254:web:9c78e119b243de6ace9daf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()