import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import CustomButton from "../components/CustomButton";
import {
  DocumentData,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../../firebase/config";
import { AuthContext, useAuth } from "../Context/authContext";
import { Ionicons } from "@expo/vector-icons";
import { Auth } from "@firebase/auth";
import { signOut } from "@firebase/auth";
import {
  ref,
  getStorage,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { SimpleLineIcons } from "@expo/vector-icons";
import firebase from "firebase/compat";
export let usertemp = [];

type UserInfoScreenProps = NativeStackScreenProps<
  MainStackParamList,
  "UserInfoScreen"
>;

const UserInfoScreen: React.FC<UserInfoScreenProps> = (props) => {
  const { user } = useContext(AuthContext);
  const userkey = auth.currentUser.uid;
  const [userdetails, setUserDetails] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [userImageUrl, setUserImageUrl] = useState(null);
  const { logOut } = useAuth();

  async function DocFinder(queryResult) {
    const querySnapshot = await getDocs(queryResult);

    querySnapshot.forEach((doc) => {
      let userdetails = [];
      userdetails.push({
        ...(doc.data() as Record<string, unknown>),
        id: doc.id,
      });
      console.log("DATA IS EQUAL TO", userdetails);
      setUserDetails(userdetails);
    });
  }
  console.log(userdetails);
  useEffect(() => {
    if (!user) return;
    const userRef = collection(db, "user");
    console.log("User Document Reference:", userRef.path); // Log the document reference path to verify if it's correct

    const queryResult = query(userRef, where("uid", "==", userkey));
    DocFinder(queryResult);
  }, []);

  usertemp = Object.assign([], userdetails);
  console.log(usertemp);
  const handleSignOut = async () => {
    try {
      await logOut(auth).then(() => {
        console.log("User signed out successfully");
        props.navigation.push("LoginScreen");
      });
    } catch (error) {
      console.log("Sign out error ", error);
    }
  };

  // const Logout = async () => {
  //   auth
  //     .signOut()
  //     .then(() => {
  //       console.log("User Signed Out Successfully!");
  //     })
  //     .catch((e) => Alert.alert("Error", e.message));
  //   // setUser(null);
  // };

  return (
    <View style={styles.homecontainer}>
      <Text style={styles.title}>Profile Info</Text>
      <FlatList
        id={userdetails.id}
        data={userdetails}
        renderItem={({ item }) => (
          <View>
            <Image style={styles.logo} source={{ uri: item.profilePic }} />
            <View>
              <View style={styles.row}>
                <Text style={styles.text}>Name: {item.username}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.text}>Username: {item.email}</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.text}>Bio: {item.bio}</Text>
              </View>
            </View>
          </View>
        )}
      />

      <View style={styles.inputContainer}>
        <CustomButton
          text="Edit User Profile"
          onPress={() => props.navigation.push("EditProfileScreen")}
          bgColor={undefined}
          fgColor={undefined}
        />
        {/* <CustomButton
          text="Home"
          onPress={null}
          bgColor={undefined}
          fgColor={undefined}
        /> */}
        <CustomButton
          text="Sign Out"
          onPress={handleSignOut}
          bgColor={undefined}
          fgColor={undefined}
        />
      </View>
    </View>
  );
};

export default UserInfoScreen;

const styles = StyleSheet.create({
  homecontainer: {
    backgroundColor: "#FFB6C1",
    flex: 1,
    alignItems: "center",
  },
  //title format and screen placement
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#FFF",
  },
  item: {
    flexDirection: "row",
    borderColor: "#FFF",
    borderWidth: 3,
    //justifyContent: 'center',
    paddingHorizontal: 5,
    marginVertical: 5,
  },
  imageList: {
    width: 50,
    height: 50,
    left: 25,
    bottom: 20,
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    alignItems: "center",
    paddingHorizontal: 5,
    marginVertical: 15,
  },
  button: {
    backgroundColor: "#f6f2f2",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
  },
  row: {
    borderColor: "	#f6f2f2",
    borderWidth: 3,
    paddingHorizontal: 5,
    marginVertical: 5,
  },
  inputContainer: {
    width: "80%",
    marginTop: 5,
    borderRadius: 10,
  },
  logo: {
    width: "100%",
    maxWidth: 100,
    height: 100,
    paddingHorizontal: 10,
    marginVertical: 3,
    justifyContent: "center",
  },
});
