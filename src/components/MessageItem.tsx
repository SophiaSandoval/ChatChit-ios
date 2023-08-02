import { StyleSheet, Text, View } from "react-native";
import React from "react";

const MessageItem = ({ item, sender }) => {
  console.log(item.message);
  console.log(item.sender);

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: item.sender === sender ? "flex-end" : "flex-start",
        padding: 10,
      }}
    >
      <View
        style={{
          backgroundColor: item.sender === sender ? "white" : "blue",
          padding: 10,
          borderRadius: 10,
          marginRight: 10,
          maxWidth: "80%",
          marginLeft: 10,
        }}
      >
        <Text>{item.sender}</Text>
        <Text>{item.message}</Text>
      </View>
    </View>
  );
};

export default MessageItem;

const styles = StyleSheet.create({});
