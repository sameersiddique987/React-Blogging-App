
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyDUsfA0rCIY4p7PljKlBF7XFHu_LTBdT8k",
  authDomain: "blogging-app-react1.firebaseapp.com",
  projectId: "blogging-app-react1",
  storageBucket: "blogging-app-react1.appspot.com",
  messagingSenderId: "604088657880",
  appId: "1:604088657880:web:8d64151be4e0bef43b34ad",
  measurementId: "G-9W8P0NQ9D1"
};


const app = initializeApp(firebaseConfig);
export default app