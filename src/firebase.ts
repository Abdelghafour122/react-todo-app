// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_REACT_APP_FB_API_KEY,
  authDomain: process.env.REACT_APP_REACT_APP_FB_AUTHDOMAIN,
  projectId: process.env.REACT_APP_REACT_APP_FB_PROJECTID,
  storageBucket: process.env.REACT_APP_REACT_APP_FB_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_REACT_APP_FB_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_REACT_APP_FB_APPID,
  //   apiKey: "AIzaSyC4Y1e63N7HwYEqvHU5V9MCd-w6EMls8jg",
  //   authDomain: "todo-app-695d0.firebaseapp.com",
  //   projectId: "todo-app-695d0",
  //   storageBucket: "todo-app-695d0.appspot.com",
  //   messagingSenderId: "1078684406745",
  //   appId: "1:1078684406745:web:8db7f98a9acf73d48b3fc8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const googleAuth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(googleAuth, googleProvider)
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
};
