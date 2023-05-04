import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import useAuth from "../hooks/useAuth";

const HomeScreen = ({
  navigation,
}: NativeStackScreenProps<MainStackParamList>) => {
  const { user } = useAuth();
  return (
    <View>
      <Text>Welcome {user}</Text>
      <Text>This is the chat</Text>
      <Button
        title="Go to Chat"
        onPress={() => navigation.navigate("ChatScreen", { title: "WYA" })}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
