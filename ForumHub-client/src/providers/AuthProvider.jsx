import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { app } from '../firebase/firebase.config';
import useAxiousPublic from '../hooks/useAxiousPublic';

export const AuthContext = createContext(null);

const auth = getAuth(app);
const provider = new GoogleAuthProvider(); // Google Auth Provider

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiousPublic();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // Google Sign-In Function
  const signInWithGoogle = () => {
    return signInWithPopup(auth, provider);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // console.log('user', currentUser);
      if (currentUser) {
        // asign get token and store client
        const userInfo = { email: currentUser.email };
        axiosPublic.post('/jwt', userInfo)
          .then(res => {
            if (res.data.token) {
              localStorage.setItem('access-token', res.data.token);
          }
        })
      }
      else {
        // TODO:remove token (if token in the client side)
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [axiosPublic]);

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    logOut,
    signInWithGoogle, 
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
