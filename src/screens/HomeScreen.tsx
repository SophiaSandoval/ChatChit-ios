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
import { LinearGradient } from "expo-linear-gradient";
import userAvatar from "../assets/man.png";
import { AuthContext } from "../Context/authContext";
import { getDocs, query, where } from "firebase/firestore";
import styles from "../styles/styles";
import logo from "../assets/ChatChit.png";
import CustomButton from "../components/CustomButton";
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
            {!userAvatarUrl ? (
              <Image source={userAvatar} style={styles.headerImage} />
            ) : (
              <Image
                source={{ uri: userAvatarUrl }}
                style={styles.headerImage}
              />
            )}
          </TouchableOpacity>
        );
      },
    });
  }, [userAvatarUrl]);

  console.log("this is the profile pic", userAvatarUrl);

  return (
    <LinearGradient
      colors={["blue", "pink", "purple"]}
      style={styles.linearGradient}
    >
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => props.navigation.push("SearchScreen")}
          // style={styles.button}
        >
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={["#5CA0f2", "#F5f7f6"]}
            style={styles.linearButton}
          >
            <Text style={styles.buttonText}>Search Friends</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default HomeScreen;
