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
    <View style={styles.container}>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={SignInSchema}
      >
        {({ handleChange, handleSubmit, values, errors }) => (
          <View style={styles.loginContainer}>
            <Text style={styles.text}>Email address</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={handleChange("email")}
              value={values.email}
            />
            {errors.email && <Text>{errors.email}</Text>}

            <Text style={styles.text}>Password</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={handleChange("password")}
              value={values.password}
            />
            {errors.password && <Text>{errors.password}</Text>}

            <TouchableOpacity
              style={styles.button}
              onPress={async () => {
                handleSubmit();
              }}
            >
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.push("RegisterScreen")}
            >
              <Text>Dont have an account? Register</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default LoginPromptScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#213B62",
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  loginContainer: {
    width: "90%",
    alignItems: "center",
    backgroundColor: "white",
    padding: 30,
    elevation: 10,
  },
  textInput: {
    height: 50,
    width: "100%",
    margin: 10,
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
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
    fontSize: 20,
    fontWeight: "700",
    color: "black",
    //width: '100%',
    justifyContent: "center",
    alignItems: "center",
  },
});
