import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// fire base store
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyBGbZ7udsco7wzwJA4HKQ393-cUOB0vvnU",
  authDomain: "super-mall-app-f5fc8.firebaseapp.com",
  databaseURL:
    "https://super-mall-app-f5fc8-default-rtdb.firebaseio.com/",
  projectId: "super-mall-app-f5fc8",
  storageBucket: "super-mall-app-f5fc8.firebasestorage.app",
  messagingSenderId: "96683521592",
  appId: "1:96683521592:web:6495e46fb927b60ea158cd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const googleProvider = new GoogleAuthProvider(app);
export const auth = getAuth(app);

// fire store
export const db = getFirestore(app);
export default app;
export const database = getDatabase(app);

