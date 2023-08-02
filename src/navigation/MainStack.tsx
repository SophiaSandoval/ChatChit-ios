import { StyleSheet } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import UserInfoScreen from "../screens/UserInfoScreen";
import LoginScreen from "../screens/LoginScreen";
import CreateProfileScreen from "../screens/CreateProfileScreen";
import LoginPromptScreen from "../screens/LoginPromptScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import { MainStackParamList } from "../types/navigation";
import RegisterScreen from "../screens/RegisterScreen";
import { AuthContext, useAuth } from "../Context/authContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/config";
import SearchScreen from "../screens/SearchScreen";
import Chat from "../screens/Chat";
// Stack will receive a MainStack param list -type
const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStack = () => {
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });
  });

  if (!user) {
    return (
      <Stack.Navigator>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="LoginPromptScreen" component={LoginPromptScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      </Stack.Navigator>
    );
  } else {
    return (
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
        <Stack.Screen name="Chat" component={Chat} options={{ title: "" }} />

        <Stack.Screen name="UserInfoScreen" component={UserInfoScreen} />
        <Stack.Screen
          name="CreateProfileScreen"
          component={CreateProfileScreen}
        />
        <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
      </Stack.Navigator>
    );
  }
};

export default MainStack;

const styles = StyleSheet.create({});
