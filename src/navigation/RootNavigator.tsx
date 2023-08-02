import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./MainStack";

const RootNavigator = () => {
  // Handle user state changes
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
};

export default RootNavigator;

const styles = StyleSheet.create({});
