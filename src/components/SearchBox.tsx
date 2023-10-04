import React from "react";
import { Animated, StyleSheet, TextInput } from "react-native";

const SearchComponent = (props) => {
  return (
    <Animated.View>
      <TextInput
        placeholder="Search"
        style={styles.formField}
        placeholderTextColor={"white"}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 10,
    left: 20,
    zIndex: 99,
    width: "80%",
    backgroundColor: "white",
  },
  formField: {
    borderWidth: 1,
    padding: 12,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 20,
    borderColor: "white",

    fontSize: 18,
    height: 50,
  },
  searchFriend: {
    marginLeft: 50,
  },
});

export default SearchComponent;
