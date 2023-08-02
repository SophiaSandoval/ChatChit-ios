// import react-native components View, Text, StyleSheet, Pressable
import { View, Text, StyleSheet, Pressable } from "react-native";
//import react-native library
import React from "react";
// lines 3 - 22 constrcuts customized button
//this button will be used in the screen files
//of the app to update data and navigate to other
//components
const CustomButton = ({
  onPress,
  text,
  type = "PRIMARY",
  bgColor,
  fgColor,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        styles[`container_${type}`],
        bgColor ? { backgroundColor: bgColor } : {},
      ]}
    >
      <Text
        style={[
          styles.text,
          styles[`text_${type}`],
          fgColor ? { color: fgColor } : {},
        ]}
      >
        {text}
      </Text>
    </Pressable>
  );
};
//lines 23-45 styles/formats custom button
const styles = StyleSheet.create({
  container: {
    width: "100%",

    padding: 15,
    marginVertical: 15,

    alignItems: "center",
    borderRadius: 5,
  },

  container_PRIMARY: {
    backgroundColor: "#f6f2f2",
  },

  container_TERTIARY: {},

  text: {
    fontWeight: "bold",
    color: "#FFB6C1",
  },
});

export default CustomButton; //exports custom button
