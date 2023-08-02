//importView, Text, TextInput, StyleSheet components from react native
import { View, TextInput, StyleSheet } from "react-native";
//import React library from react
import React from "react";
//this creates a custom input container
//that feature a sucure text entry and set value
//to the user data class it is updating
const CustomInput = ({ value, setValue, placeholder, secureTextEntry }) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        style={styles.input}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

//this formats and styles custom input feature
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
    padding: 10,
    flex: 1,

    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 5,

    paddingHorizontal: 10,
    marginVertical: 5,
  },
  input: {},
});
//exports custom input
export default CustomInput;
