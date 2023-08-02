import React, {
  ReactNode,
  useEffect,
  useState,
  useContext,
  createContext,
} from "react";
import { auth } from "../../firebase/config";
import {
  Auth,
  UserCredential,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";

export interface AuthProviderProps {
  children?: ReactNode;
}

export interface UserContextState {
  isAuthenticated: boolean;
  isLoading: boolean;
  id?: string;
}

export const UserStateContext = createContext<UserContextState>(
  {} as UserContextState
);
export interface AuthContextModel {
  auth: Auth;
  user: User | null;
  userAvatarUrl: any;
  setUserAvatarUrl(userAvatarUrl: any): void;
  setUser(user: User): void;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  signUp: (email: string, password: string) => Promise<UserCredential>;
  //sendPasswordResetEmail?: (email: string) => Promise<void>;
  logOut: (auth: Auth) => Promise<void>;
}

export const AuthContext = React.createContext<AuthContextModel>(
  {} as AuthContextModel
);

export function useAuth(): AuthContextModel {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [user, setUser] = useState<User | null>(null);

  const [userAvatarUrl, setUserAvatarUrl] = useState(null);

  function signUp(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function signIn(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(auth, email, password);
  }
  // function resetPassword(email: string): Promise<void> {
  //   return sendPasswordResetEmail(auth, email);
  // }
  function logOut(auth: Auth): Promise<void> {
    return signOut(auth);
  }
  useEffect(() => {
    //function that firebase notifies you if a user is set
    const unsubsrcibe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return unsubsrcibe;
  }, []);

  const values = {
    signUp,
    user,
    signIn,
    // resetPassword,
    auth,
    setUser,
    logOut,
    userAvatarUrl,
    setUserAvatarUrl,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useUserContext = (): UserContextState => {
  return useContext(UserStateContext);
};
