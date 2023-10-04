import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import styles from "../styles/styles";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import { LinearGradient } from "expo-linear-gradient";
import logo from "../assets/ChatChit.png";

type LoginScreenProps = NativeStackScreenProps<
  MainStackParamList,
  "LoginScreen"
>;

const LoginScreen: React.FC<LoginScreenProps> = (props) => {
  return (
    <LinearGradient
      // Background Linear Gradient
      colors={["blue", "pink", "purple"]}
      style={styles.linearGradient}
    >
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
      </View>
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => props.navigation.push("LoginPromptScreen")}
            // style={styles.button}
          >
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              colors={["#5CA0f2", "#F5f7f6"]}
              style={styles.linearButton}
            >
              <Text style={styles.buttonText}>Login </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <Text style={styles.text}> -OR- </Text>
        <View style={styles.buttonContainer}>
          {/* Touchable Opacity is a wrapper for making the Google Login
        feature button respond properly to touches */}
          <TouchableOpacity
            onPress={() => props.navigation.push("RegisterScreen")}
          >
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              colors={["#5CA0f2", "#F5f7f6"]}
              style={styles.linearButton}
            >
              {/*Display "Sign Up With Google button" */}
              <Text style={styles.buttonText}>Sign Up </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

export default LoginScreen;
