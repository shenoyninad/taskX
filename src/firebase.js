import { initializeApp } from "firebase/app";
import { getAuth } from  "firebase/auth"
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkjmZejHwOa89g01_SZO1nO4Cncfp4lRc",
  authDomain: "taskx-sandbox.firebaseapp.com",
  projectId: "taskx-sandbox",
  databaseURL : "https://taskx-sandbox-default-rtdb.asia-southeast1.firebasedatabase.app/",
  storageBucket: "taskx-sandbox.appspot.com",
  messagingSenderId: "581431331692",
  appId: "1:581431331692:web:84496fd268b5c9ce1e0149",

}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const database = getDatabase();
export default app;