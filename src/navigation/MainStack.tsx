import { StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import ChatScreen from "../screens/ChatScreen";
import LoginScreen from "../screens/LoginScreen";
import { MainStackParamList } from "../types/navigation";
import useAuth from "../hooks/useAuth";

// Stack will receive a MainStack param list -type
const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStack = () => {
  const { userInfo } = useAuth();
  return (
    <Stack.Navigator>
      {userInfo ? (
        <>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="ChatScreen" component={ChatScreen} />
        </>
      ) : (
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
};

export default MainStack;

const styles = StyleSheet.create({});
