import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useContext, useState } from "react";
import { MainStackParamList } from "../types/navigation";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CustomButton from "../components/CustomButton";
import { auth, db } from "../../firebase/config";
import { addDoc, collection, doc, updateDoc, where } from "firebase/firestore";
import { usertemp } from "./UserInfoScreen";

type EditProfileScreenProps = NativeStackScreenProps<
  MainStackParamList,
  "EditProfileScreen"
>;

const EditProfileScreen: React.FC = (props: EditProfileScreenProps) => {
  const uid = auth.currentUser.uid;
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const tkey = usertemp.map(({ id }) => `${id}`).join("");
  console.log(tkey);
  const editUserProfile = async (
    tkey: string,
    username: string,
    email: string,
    bio: string
  ) => {
    const userDocRef = doc(db, "user", tkey);
    try {
      await updateDoc(userDocRef, {
        id: tkey,
        username: username,
        email: email,
        bio: bio,
      });

      props.navigation.push("UserInfoScreen");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <KeyboardAwareScrollView style={styles.scrollView}>
      <View style={styles.view}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: "700",
            color: "#FFF",
          }}
        >
          Edit User Profile
        </Text>
        <View></View>
      </View>
      <View style={styles.inputContainer}>
        <View>
          <TextInput
            placeholder="Full Name"
            style={styles.input}
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="User Name"
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Bio"
          style={styles.input}
          value={bio}
          onChangeText={(text) => setBio(text)}
        />
      </View>
      <TouchableOpacity
        onPress={async () => await editUserProfile(tkey, username, email, bio)}
        style={styles.button}
      >
        <Text>Save</Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  //root format and screen placement
  root: {
    alignItems: "center",
    padding: 50,
    backgroundColor: "#213B62",
  },
  view: {
    color: "#3B71F3",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  //text format and screen placement
  text: {
    color: "#3B71F3",
    fontWeight: "bold",
    fontSize: 20,
    alignItems: "center",
    paddingHorizontal: 10,
    marginVertical: 15,
  },
  //logo format and screen placement
  logo: {
    width: "100%",
    maxWidth: 80,
    height: 100,
    paddingHorizontal: 10,
    marginVertical: 1,
  },
  //container format and screen placement
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    padding: 50,
  },
  //list format and
  list: {
    width: 125,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    borderWidth: 3,
    borderColor: "#096DC6",
    color: "#FFF",
    padding: 8,
    borderRadius: 10,
    //right: 45,
    textAlignVertical: "center",
    textAlign: "center",
    bottom: 20,
  },
  //scrollView format and screen placement
  scrollView: {
    backgroundColor: "#213B62",
  },
  //buttonsContainer format and screen placement
  buttonsContainer: {
    marginTop: 25,
    flexDirection: "row",
    //width: '100%',
    width: "90%",
    //justifyContent: 'center',
    alignItems: "center",
  },
  //buttonStyle format and screen placement
  buttonStyle: {
    marginTop: 25,
    flexDirection: "row",
    //width: '100%',
    width: "90%",
    //justifyContent: 'center',
    alignItems: "center",
    marginBottom: 10,
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
  //personal format and screen placement
  personal: {
    color: "white",
    width: "100%",
  },
  inputContainer: {
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
  inputTime: {
    flexDirection: "row",
    borderColor: "#3B71F3",
    borderWidth: 3,
    justifyContent: "center",
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  schedule: {
    color: "#3B71F3",
    fontWeight: "bold",
    fontSize: 20,
    borderColor: "#3B71F3",
    borderWidth: 3,
    justifyContent: "center",
    paddingHorizontal: 10,
    marginVertical: 5,
  },
});
