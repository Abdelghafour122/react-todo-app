import React, { createContext, useContext, useState, ReactNode } from "react";

type AuthProviderProps = {
  children: ReactNode;
};

const AuthenticationContext = createContext({});

export function useAuthentication() {
  return useContext(AuthenticationContext);
}
export default function AuthContext({ children }: AuthProviderProps) {
  return (
    <AuthenticationContext.Provider value={{}}>
      {children}
    </AuthenticationContext.Provider>
  );
}
