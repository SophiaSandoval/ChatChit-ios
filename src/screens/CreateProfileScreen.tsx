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
import { UserDetailsContextState, useFirebase } from "../Context/userContext";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../styles/styles";

type CreateProfileScreenProps = NativeStackScreenProps<
  MainStackParamList,
  "CreateProfileScreen"
>;

const CreateProfileScreen: React.FC<CreateProfileScreenProps> = (props) => {
  const { addUserDetails } = useFirebase(); // Get the addUserDetails function from the FirebaseProvider

  const storage = getStorage();
  const { setUserAvatarUrl } = useContext(AuthContext);

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [userImageUrl, setUserImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const saveUserProfile = async () => {
    const userDetails: UserDetailsContextState = {
      uid: auth.currentUser.uid,
      username,
      email,
      bio,
      userImageUrl,
      // Add other properties as needed
    };
    await addUserDetails(userDetails);
    props.navigation.push("HomeScreen");
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.2,
    });

    // console.log(result);

    if (!result.canceled) {
      setUserAvatarUrl(result.assets[0].uri);
      uploadImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (image) => {
    const res = await fetch(image);
    console.log("response = ", JSON.stringify(res));
    const blob = await res.blob();
    console.log("blob = ", JSON.stringify(blob));
    const filename = image.substring(image.lastIndexOf("/"));
    console.log("filename = ", filename);
    const imageRef = ref(storage, `ProfilePicture/${filename}`);
    uploadBytesResumable(imageRef, blob).then(async () => {
      const downloadURL = await getDownloadURL(imageRef);
      console.log(downloadURL);
      setUserImageUrl(downloadURL);
      setUserAvatarUrl(downloadURL);
    });
  };

  return (
    <LinearGradient
      // Background Linear Gradient
      colors={["blue", "pink", "purple"]}
      style={styles.linearGradient}
    >
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <Text style={styles.text}>Create User Profile</Text>
          <View>
            <TouchableOpacity onPress={pickImage}>
              {userImageUrl === null ? (
                <SimpleLineIcons name="camera" size={24} color="black" />
              ) : (
                <Image
                  style={styles.profileImage}
                  source={{ uri: userImageUrl }}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <View>
            <TextInput
              placeholder="Full Name"
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
    </LinearGradient>
  );
};
export default CreateProfileScreen;

// const styles = StyleSheet.create({
//   //root format and screen placement
//   root: {
//     alignItems: "center",
//     padding: 50,
//     backgroundColor: "#213B62",
//   },
//   view: {
//     color: "#3B71F3",
//     justifyContent: "center",
//     paddingHorizontal: 10,
//   },
//   //text format and screen placement
//   text: {
//     color: "#3B71F3",
//     fontWeight: "bold",
//     fontSize: 20,
//     alignItems: "center",
//     paddingHorizontal: 10,
//     marginVertical: 15,
//   },
//   //logo format and screen placement
//   logo: {
//     width: "100%",
//     maxWidth: 100,
//     height: 100,
//     paddingHorizontal: 10,
//     marginVertical: 1,
//     justifyContent: "center",
//   },
//   //container format and screen placement
//   container: {
//     justifyContent: "center",
//     alignItems: "center",
//     flex: 1,
//     padding: 50,
//   },
//   //list format and
//   list: {
//     width: 125,
//     justifyContent: "center",
//     alignItems: "center",
//     flex: 1,
//     borderWidth: 3,
//     borderColor: "#096DC6",
//     color: "#FFF",
//     padding: 8,
//     borderRadius: 10,
//     //right: 45,
//     textAlignVertical: "center",
//     textAlign: "center",
//     bottom: 20,
//   },
//   //scrollView format and screen placement
//   scrollView: {
//     backgroundColor: "#213B62",
//   },
//   //buttonsContainer format and screen placement
//   buttonsContainer: {
//     marginTop: 25,
//     flexDirection: "row",
//     //width: '100%',
//     width: "90%",
//     //justifyContent: 'center',
//     alignItems: "center",
//   },
//   //buttonStyle format and screen placement
//   buttonStyle: {
//     marginTop: 25,
//     flexDirection: "row",
//     //width: '100%',
//     width: "90%",
//     //justifyContent: 'center',
//     alignItems: "center",
//     marginBottom: 10,
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
//   //personal format and screen placement
//   personal: {
//     color: "white",
//     width: "100%",
//   },
//   inputContainer: {
//     backgroundColor: "white",
//     width: "100%",
//     padding: 10,
//     flex: 1,

//     borderColor: "#e8e8e8",
//     borderWidth: 1,
//     borderRadius: 5,

//     paddingHorizontal: 10,
//     marginVertical: 5,
//   },
//   input: {},
//   inputTime: {
//     flexDirection: "row",
//     borderColor: "#3B71F3",
//     borderWidth: 3,
//     justifyContent: "center",
//     paddingHorizontal: 10,
//     marginVertical: 5,
//   },
//   schedule: {
//     color: "#3B71F3",
//     fontWeight: "bold",
//     fontSize: 20,
//     borderColor: "#3B71F3",
//     borderWidth: 3,
//     justifyContent: "center",
//     paddingHorizontal: 10,
//     marginVertical: 5,
//   },
// });
