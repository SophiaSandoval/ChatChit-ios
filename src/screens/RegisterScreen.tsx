import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import { useNavigation } from "@react-navigation/native";
import * as Yup from "yup";
import { useAuth } from "../Context/authContext";
import { Formik } from "formik";

type RegisterScreenProps = NativeStackScreenProps<
  MainStackParamList,
  "RegisterScreen"
>;

interface SignUpFormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  confirmPassword: Yup.string().when("password", (password, schema) =>
    password && password.length > 0
      ? schema
          .oneOf([Yup.ref("password")], "Both passwords need to be the same")
          .required("Required")
      : schema
  ),
});

const RegisterScreen: React.FC<RegisterScreenProps> = (props) => {
  const { signUp } = useAuth();
  const [formError, setFormError] = useState<string>("");
  const [formSubmitting, setFormSubmitting] = useState<boolean>(false);
  const navigation = useNavigation();

  const handleSubmit = async (values: SignUpFormValues) => {
    setFormSubmitting(true);
    try {
      await signUp(values.email, values.password);
      props.navigation.push("CreateProfileScreen");
    } catch (error) {
      console.log(error);
      setFormError("An error occurred while signing up.");
      setFormSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          email: "",
          password: "",
          confirmPassword: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={SignUpSchema}
      >
        {({ handleChange, handleSubmit, values, errors }) => (
          <View style={styles.signupContainer}>
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
              secureTextEntry
            />
            {errors.password && <Text>{errors.password}</Text>}

            <Text style={styles.text}>Repeat password</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={handleChange("confirmPassword")}
              value={values.confirmPassword}
              secureTextEntry
            />
            {errors.confirmPassword && <Text>{errors.confirmPassword}</Text>}

            <TouchableOpacity
              style={styles.button}
              onPress={async () => {
                handleSubmit();
              }}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => props.navigation.push("LoginPromptScreen")}
            >
              <Text>Already have an account? Login</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#213B62",
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  signupContainer: {
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
