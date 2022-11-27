import React, { createContext, useEffect, useState } from "react";
import app from "../Firebase/Firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

export const AuthContex = createContext();
const GobalAuthProvaider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loader, setLoader] = useState(true);
  const [addCart, setAddCart] = useState(false);

  const auth = getAuth(app);
  // create user function
  const createUser = (email, password) => {
    setLoader(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // update user profile
  const updateUser = (name) => {
    return updateProfile(auth.currentUser, { displayName: name });
  };

  // user log Out function
  const logOut = () => {
    setLoader(true);
    return signOut(auth)
      .then(() => {
        // user sign out
        localStorage.removeItem("token");
        setUser({});
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // user sign in function
  const login = (email, password) => {
    setLoader(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = (provider) => {
    setLoader(true);
    return signInWithPopup(auth, provider);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      }
      setLoader(false);
    });

    return () => unSubscribe();
  }, [user]);

  const authInfo = {
    setAddCart,
    addCart,
    user,
    logOut,
    loader,
    createUser,
    updateUser,
    login,
    googleSignIn,
  };
  return <AuthContex.Provider value={authInfo}>{children}</AuthContex.Provider>;
};

export default GobalAuthProvaider;
