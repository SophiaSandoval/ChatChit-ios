import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../../firebase/config";
import { AuthContext, useAuth } from "../Context/authContext";

export interface UserDetailsContextState {
  username: string;
  email: string;
  bio: string;
  userImageUrl?: any;
  uid?: string;
  id?: string;
  // Add other properties as needed
}

export interface FirebaseContextModel {
  userDetails: UserDetailsContextState[];

  addUserDetails: (userDetails: UserDetailsContextState) => Promise<void>;
  updateUserDetails: (updatedDetails: UserDetailsContextState) => Promise<void>;
  // deleteUserDetails: (id: string) => Promise<void>
}

export const FirebaseContext = createContext<FirebaseContextModel>({
  userDetails: [],
  addUserDetails: async () => {},
  updateUserDetails: async () => {},
});

export function useFirebase() {
  return useContext(FirebaseContext);
}

export interface FirebaseProviderProps {
  children?: ReactNode;
}

export const FirebaseProvider = ({
  children,
}: FirebaseProviderProps): JSX.Element => {
  const [userDetails, setUserDetails] = useState<UserDetailsContextState[]>([]);
  const [userId, setUserId] = useState<string | null>(null); // Add state for the user id
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      const userRef = collection(db, "user");
      const queryResult = query(userRef, where("uid", "==", user.uid));
      const unsubscribe = onSnapshot(queryResult, (snapshot) => {
        const data: UserDetailsContextState[] = [];
        snapshot.forEach((doc) => {
          const { uid, username, email, bio, userImageUrl } = doc.data();
          data.push({
            uid: uid,
            username: username,
            email: email,
            bio: bio,
            userImageUrl: userImageUrl,
            id: doc.id,
          });
        });
        setUserDetails(data);
        console.log("This is user details userContext", data);

        if (data.length > 0) {
          setUserId(data[0].id);
        } else {
          setUserId(null);
        }
      });
      return () => unsubscribe();
    }
  }, [user]);

  const addUserDetails = async (
    userDetails: UserDetailsContextState
  ): Promise<void> => {
    try {
      await addDoc(collection(db, "user"), {
        uid: userDetails.uid,
        username: userDetails.username,
        email: userDetails.email,
        bio: userDetails.bio,
        userImageUrl: userDetails.userImageUrl,
      });
    } catch (error) {
      console.error("Error adding item: ", error);
    }
  };

  const updateUserDetails = async (
    userDetails: UserDetailsContextState
  ): Promise<void> => {
    try {
      await updateDoc(doc(db, "user", userId), {
        uid: userDetails.uid,
        username: userDetails.username,
        email: userDetails.email,
        bio: userDetails.bio,
        userImageUrl: userDetails.userImageUrl,
      });
    } catch (error) {
      console.log("Error updating item: ", error);
    }
  };
  const values: FirebaseContextModel = {
    userDetails,
    addUserDetails,
    updateUserDetails,
    // deleteUserDetails,
  };

  return (
    <FirebaseContext.Provider value={values}>
      {children}
    </FirebaseContext.Provider>
  );
};
