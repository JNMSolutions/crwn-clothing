import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDhldgN6CpNL5ngnT1gSA7EqifdVCTBbzs",
    authDomain: "react-crwn-clothing-db-67f8b.firebaseapp.com",
    projectId: "react-crwn-clothing-db-67f8b",
    storageBucket: "react-crwn-clothing-db-67f8b.appspot.com",
    messagingSenderId: "198226216556",
    appId: "1:198226216556:web:6e098aa16459b7df207a49"
  };
    
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

  export const db = getFirestore();
  
  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {displayName, email, createdAt});
        } catch (error) {
            console.log('error creating user.', error.message)
        }
    }

    return userDocRef;
        
  }