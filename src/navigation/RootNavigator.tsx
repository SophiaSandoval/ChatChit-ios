import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./MainStack";
import { AuthProvider } from "../hooks/useAuth";
const RootNavigator = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <MainStack />
      </AuthProvider>
    </NavigationContainer>
  );
};

export default RootNavigator;

const styles = StyleSheet.create({});
