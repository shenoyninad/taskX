import React, { useContext } from 'react'
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom'
import { sendPasswordResetEmail, sendEmailVerification, updateProfile , signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword , signOut, onAuthStateChanged} from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, database } from '../firebase'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

AuthProvider.propTypes = {
  children: PropTypes.any,
};
export  function AuthProvider( {children}) {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = React.useState();
  React.useEffect(() => {


    //  connectAuthEmulator(auth, "http://localhost:9099");
    onAuthStateChanged (auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          setCurrentUser(user);
          //  navigate('/dashboard', { replace: true });  
          // ...
        } else {
          setCurrentUser(null);
          // navigate('/login', { replace: true }); 
        }
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
   
   const signup = async (username, email, password) => {
      try {
           const userCredential = await createUserWithEmailAndPassword(auth, email, password);
           const { user } = userCredential;
           await updateProfile(user, {
               displayName : username
           })
           console.log(user, user.uid);
           await sendEmailVerification(user);
           //   connectDatabaseEmulator(database, "localhost", 9000);
           set(ref (database, `users/${user.uid}`), {
               username,
           });
           return(1);
           // Signed in 
       } catch (error) {
           // const errorCode = error.code;
           const errorMessage = error.message; 
           console.log(errorMessage);
           return(0);
       }
  }
  const login = async (email, password) => {
    try {
         const userCredential = await signInWithEmailAndPassword(auth, email, password);
         // Signed in 
         localStorage.setItem("loggedIn", true);
         console.log(userCredential.user);
         return(1)
     } catch (error) {
         // const errorCode = error.code;
         const errorMessage = error.message;
         alert(errorMessage)
         return(0);
         // alert(errorMessage);
     }
    }
    const loginWithGoogle = async () => {

        const provider = new GoogleAuthProvider();
      try {
     const result =  await  signInWithPopup(auth, provider)
    // This gives you a Google Access Token. You can use it to access the Google API.
    // const credential = GoogleAuthProvider.credentialFromResult(result);
    //  const token = credential.accessToken;
    // The signed-in user info.
    const { user } = result;
    set(ref (database, `users/${user.uid}`), {
      username : user.displayName,
  });
    console.log(user);
    return(1);
    // ...
  }
  catch(error)  {
    // Handle Errors here.
    //  const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const { email } = error;
    // The AuthCredential type that was used.
    //  const credential = GoogleAuthProvider.credentialFromError(error);
    console.log(errorMessage, email);
    return(0);
    // ...
  };
        }
  const logout = async () => {
    try {
        console.log("Here!")
         await signOut(auth);
         localStorage.setItem("loggedIn", false);
         return(1);
     } catch (error) {
        //  const errorCode = error.code;
        //  const errorMessage = error.message;
         return(0);
         // alert(errorMessage);
     }
    }
  const forgotpassword = async (email) => {
      try {
        await sendPasswordResetEmail(auth, email)
        return(1);
      }
      catch (err) {
        return(0);

      }
      
  }
  const value = {
      currentUser,
      signup,
      login,
      logout,
      loginWithGoogle,
      forgotpassword,
  }
  return (
    <AuthContext.Provider value = {value}>
        {children}
    </AuthContext.Provider>
  )
}
