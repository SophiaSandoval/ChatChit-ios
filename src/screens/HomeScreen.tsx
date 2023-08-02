import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableOpacityBase,
} from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import { signOut } from "firebase/auth";
import { auth, userRef } from "../../firebase/config";
import { useNavigation } from "@react-navigation/native";

import userAvatar from "../assets/man.png";
import { AuthContext } from "../Context/authContext";
import { getDocs, query, where } from "firebase/firestore";
type HomeScreenProps = NativeStackScreenProps<MainStackParamList, "HomeScreen">;

interface UserData {
  profilePic: string; // You can change the type of 'profilePic' based on your actual data structure
  // Add other properties from the document if needed
}
const HomeScreen: React.FC<HomeScreenProps> = (props) => {
  const { userAvatarUrl } = useContext(AuthContext);
  // const navigation = useNavigation();
  const userkey = auth.currentUser.uid;

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity
            onPress={() => props.navigation.push("UserInfoScreen")}
          >
            <Image
              source={{ uri: userAvatarUrl }}
              style={{ height: 50, width: 30 }}
            />
          </TouchableOpacity>
        );
      },
    });
  }, [userAvatarUrl]);

  console.log("this is the profile pic", userAvatarUrl);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => props.navigation.push("SearchScreen")}>
        <Text>search</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#FFB6C1",
    alignItems: "center",
  },
  logo: {
    width: "100%",
    maxWidth: 300,
    height: 300,
  },
  subtitle: {
    fontSize: 16,
    color: "#FFF",
    top: 10,
  },
  buttonsContainer: {
    marginTop: 15,
    flexDirection: "row",
  },
  list: {
    width: 125,
    borderWidth: 3,
    borderColor: "#096DC6",
    color: "#FFF",
    padding: 8,
    borderRadius: 10,
    right: 45,
    textAlignVertical: "center",
    textAlign: "center",
    top: 30,
    bottom: 20,
  },
  image: {
    bottom: 20,
    width: 250,
    height: 250,
    resizeMode: "contain",
    alignSelf: "center",
  },
  imageList: { width: 50, height: 50, left: 25, top: 30 },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    top: 10,
    left: 150,
  },
  question: {
    top: 55,
    fontSize: 16,
    color: "#FFF",
  },
  button: {
    top: 30,
    backgroundColor: "#0782F9",
    width: "25%",
    padding: 15,
    borderRadius: 25,
    marginVertical: 30,
  },
});
