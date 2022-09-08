import { User, UserCredential } from "firebase/auth";

export type AuthContextType = {
  currentUser: User | null | undefined;
  userSignUp: (email: string, password: string) => Promise<UserCredential>;
};
