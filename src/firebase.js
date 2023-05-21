import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAWlLheuaNEBC0aeaQNrTnVMA0kzaZBPT8",
    authDomain: "doc-5bb68.firebaseapp.com",
    projectId: "doc-5bb68",
    storageBucket: "doc-5bb68.appspot.com",
    messagingSenderId: "682889356270",
    appId: "1:682889356270:web:b4254cfc453256254ce4ff"
};

if (!getApps().length) {
    initializeApp(firebaseConfig);
}


const app = initializeApp(firebaseConfig);

const db = getFirestore(app)
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);

export { db, auth, provider, storage }