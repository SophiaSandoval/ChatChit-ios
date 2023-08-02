import React, { useContext, useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { auth, db, userRef } from "../../firebase/config";
import { addDoc, collection, query, where } from "firebase/firestore";
import { SimpleLineIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import {
  ref,
  getStorage,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { AuthContext } from "../Context/authContext";

type CreateProfileScreenProps = NativeStackScreenProps<
  MainStackParamList,
  "CreateProfileScreen"
>;

const CreateProfileScreen: React.FC<CreateProfileScreenProps> = (props) => {
  const userkey = auth.currentUser.uid;
  const storage = getStorage();
  const { setUserAvatarUrl } = useContext(AuthContext);

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [userImageUrl, setUserImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const saveUserProfile = async () => {
    try {
      const docRef = await addDoc(collection(db, "user"), {
        uid: userkey,
        username: username,
        email: email,
        bio: bio,
        profilePic: userImageUrl,
      });

      console.log(
        "Document written with ID: ",
        docRef.id,
        "doc save to user",
        userkey
      );
      props.navigation.push("UserInfoScreen");
    } catch (e) {
      console.error("Error adding document: ", e);
      console.log(username, email, bio);
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      setUserImageUrl(result.assets[0].uri);
      setUserAvatarUrl(result.assets[0].uri);
    }
  };

  const metadata = {
    contentType: "image/jpeg",
  };

  const storageRef = ref(storage, "images/" + Date.now());
  const uploadTask = uploadBytesResumable(storageRef, userImageUrl, metadata);
  console.log(storageRef);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case "storage/unauthorized":
          // User doesn't have permission to access the object
          break;
        case "storage/canceled":
          // User canceled the upload
          break;
        // ...
        case "storage/unknown":
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    },
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log("File available at", downloadURL);
      });
    }
  );

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
          Create User Profile
        </Text>
        <View>
          <TouchableOpacity onPress={pickImage}>
            {userImageUrl === null ? (
              <SimpleLineIcons name="camera" size={24} color="black" />
            ) : (
              <Image style={styles.logo} source={{ uri: userImageUrl }} />
            )}
          </TouchableOpacity>
        </View>
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
      <TouchableOpacity onPress={saveUserProfile} style={styles.button}>
        <Text>Save</Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
};
export default CreateProfileScreen;

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
    maxWidth: 100,
    height: 100,
    paddingHorizontal: 10,
    marginVertical: 1,
    justifyContent: "center",
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
