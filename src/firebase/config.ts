
import { initializeApp } from "firebase/app";
import {  getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"

import {getStorage} from  "firebase/storage";



     const firebaseConfig = {
    apiKey: "AIzaSyCRBkGLmpzEwXVYxoP5DxnwoT2Ay-pIaAw",
    authDomain: "my-code-1d51f.firebaseapp.com",
    projectId: "my-code-1d51f",
    storageBucket: "my-code-1d51f.appspot.com",
    messagingSenderId: "94737052444",
    appId: "1:94737052444:web:e22d7a8316ff1dfcc980d9"
     }
  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const db = getFirestore(app);
  export const storage = getStorage (app)
  


