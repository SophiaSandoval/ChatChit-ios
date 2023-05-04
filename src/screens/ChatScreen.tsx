import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ChatScreenRouteProp, MainStackParamList } from "../types/navigation";

const ChatScreen = ({
  navigation,
}: NativeStackScreenProps<MainStackParamList>) => {
  const route = useRoute<ChatScreenRouteProp>();
  return (
    <View>
      <Text> This is the ChatScreen</Text>
      <Text>{route.params.title}</Text>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
