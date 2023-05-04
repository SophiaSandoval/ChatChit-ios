import { Button, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import useAuth from "../hooks/useAuth";

const LoginScreen = ({
  navigation,
}: NativeStackScreenProps<MainStackParamList>) => {
  const { userInfo } = useAuth();

  return (
    <View>
      {userInfo ? (
        <Text>Welcome, {userInfo.name}!</Text>
      ) : (
        <Text>Please sign in to continue.</Text>
      )}
    </View>
  );
};

export default LoginScreen;
