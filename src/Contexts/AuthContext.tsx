import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { globalAuth } from "../firebase";
import { AuthContextType } from "../Utils/types";

type AuthProviderProps = {
  children: ReactNode;
};

const AuthenticationContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export function useAuthentication() {
  return useContext(AuthenticationContext);
}

export default function AuthContext({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>();
  const [loading, setLoading] = useState(true);

  const EMAIL_REGEX = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const userSignUp = (email: string, password: string) => {
    return createUserWithEmailAndPassword(globalAuth, email, password);
  };

  const userSignIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(globalAuth, email, password);
  };

  const resetPassword = (email: string) => {
    return sendPasswordResetEmail(globalAuth, email);
  };

  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    return signInWithPopup(globalAuth, googleProvider);
  };

  const userSignOut = () => {
    return signOut(globalAuth);
  };

  useEffect(() => {
    const unlog = globalAuth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unlog;
  }, []);

  const contextValue: AuthContextType = {
    currentUser,
    userSignUp,
    userSignIn,
    signInWithGoogle,
    userSignOut,
    resetPassword,
    EMAIL_REGEX,
  };

  console.log(globalAuth.currentUser?.email);

  return (
    <AuthenticationContext.Provider value={contextValue}>
      {loading === false && children}
    </AuthenticationContext.Provider>
  );
}
