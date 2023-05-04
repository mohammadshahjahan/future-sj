import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDINGN_9VTSm_pOvE8TUUE1ID8DkrOcUU8",
  authDomain: "future-sj-db.firebaseapp.com",
  projectId: "future-sj-db",
  storageBucket: "future-sj-db.appspot.com",
  messagingSenderId: "290853169727",
  appId: "1:290853169727:web:d430a4dd57f2caca3be68a",
};

const firebaseapp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocref = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocref);
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocref, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error creating this user ", error.message);
    }
  }
  return userDocref;
};
