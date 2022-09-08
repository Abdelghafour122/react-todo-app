import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { createUserWithEmailAndPassword, User } from "firebase/auth";
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

  const userSignUp = (email: string, password: string) => {
    return createUserWithEmailAndPassword(globalAuth, email, password);
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
  };

  return (
    <AuthenticationContext.Provider value={contextValue}>
      {loading === false && children}
    </AuthenticationContext.Provider>
  );
}
