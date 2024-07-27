import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyA1nC9zieITJZKincTeCQELGLALJbPuRjA",
    authDomain: "imagesapi-633c9.firebaseapp.com",
    projectId: "imagesapi-633c9",
    storageBucket: "imagesapi-633c9.appspot.com",
    messagingSenderId: "963637517523",
    appId: "1:963637517523:web:ad01ef35c7a359741c8826"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
