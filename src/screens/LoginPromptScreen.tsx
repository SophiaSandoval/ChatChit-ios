import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { MainStackParamList } from "../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as Yup from "yup";
import { useAuth } from "../Context/authContext";
import { Formik } from "formik";
import CustomButton from "../components/CustomButton";
import styles from "../styles/styles";
import { LinearGradient } from "expo-linear-gradient";

type LoginPromptScreenProps = NativeStackScreenProps<
  MainStackParamList,
  "LoginPromptScreen"
>;

interface SignInFormValues {
  email: string;
  password: string;
}

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required").min(8).max(200),
});

const LoginPromptScreen: React.FC<LoginPromptScreenProps> = (props) => {
  const { signIn } = useAuth();
  const [formSubmitting, setFormSubmitting] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>("");

  const handleSubmit = async (values: SignInFormValues) => {
    setFormSubmitting(true);
    try {
      await signIn(values.email, values.password);
      props.navigation.push("HomeScreen");
    } catch (error: unknown) {
      let errorMessage = "error.unknown";
      if (typeof error === "string") {
        errorMessage = error.toUpperCase();
      } else if (error instanceof Error) {
        errorMessage = error.message;
        console.log(errorMessage);
      }
      setFormError(errorMessage);
      setFormSubmitting(false);
    }
  };

  return (
    <LinearGradient
      // Background Linear Gradient
      colors={["blue", "pink", "purple"]}
      style={styles.linearGradient}
    >
      <View style={styles.loginContainer}>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={SignInSchema}
        >
          {({ handleChange, handleSubmit, values, errors }) => (
            <View style={styles.signinContainer}>
              <Text style={styles.blackText}>Email address</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={handleChange("email")}
                value={values.email}
              />
              {errors.email && <Text>{errors.email}</Text>}

              <Text style={styles.blackText}>Password</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={handleChange("password")}
                value={values.password}
              />
              {errors.password && <Text>{errors.password}</Text>}

              <TouchableOpacity
                onPress={async () => {
                  handleSubmit();
                }}
              >
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  colors={["#5CA0f2", "#F5f7f6"]}
                  style={styles.linearButton}
                >
                  <Text style={styles.buttonText}>Sign In</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </LinearGradient>
  );
};

export default LoginPromptScreen;

// const styles = StyleSheet.create({
//   container: {
//     width: "100%",
//     height: "100%",
//     backgroundColor: "#213B62",
//     alignItems: "center",
//     flex: 1,
//     justifyContent: "center",
//   },

//   textInput: {
//     height: 50,
//     width: "100%",
//     margin: 10,
//     backgroundColor: "white",
//     borderColor: "gray",
//     borderWidth: StyleSheet.hairlineWidth,
//     borderRadius: 10,
//   },
//   button: {
//     backgroundColor: "#0782F9",
//     width: "100%",
//     padding: 15,
//     borderRadius: 10,
//     marginVertical: 10,
//   },
//   buttonText: {
//     color: "white",
//     fontWeight: "700",
//     fontSize: 16,
//     textAlign: "center",
//   },
//   text: {
//     fontSize: 20,
//     fontWeight: "700",
//     color: "black",
//     //width: '100%',
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });
