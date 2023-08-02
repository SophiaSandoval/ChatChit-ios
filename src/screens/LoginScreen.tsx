import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";

type LoginScreenProps = NativeStackScreenProps<
  MainStackParamList,
  "LoginScreen"
>;

const LoginScreen: React.FC<LoginScreenProps> = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chit Chat</Text>
      <View style={styles.inputContainer}>
        <TouchableOpacity
          onPress={() => props.navigation.push("LoginPromptScreen")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.text}> -OR- </Text>
      <View style={styles.inputContainer}>
        {/* Touchable Opacity is a wrapper for making the Google Login
        feature button respond properly to touches */}
        <TouchableOpacity
          onPress={() => props.navigation.push("RegisterScreen")}
          style={styles.button}
        >
          {/*Display "Sign Up With Google button" */}
          <Text style={styles.buttonText}>Sign Up </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  //background color and alignment
  container: {
    backgroundColor: "#213B62",
    width: "100%",
    height: "100%",
    padding: 50,
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#FFF",
  },
  logo: {
    width: "100%",
    maxWidth: 300,
    height: 300,
  },
  inputContainer: {
    width: "100%",
    marginTop: 5,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
  },
  text: {
    fontSize: 25,
    fontWeight: "700",
    color: "#0782F9",
    //width: '100%',
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoginScreen;
