import { StyleSheet, Text, View, Image, TextInput, Alert } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import CustomButton from "../components/CustomButton";

import { auth, db, userRef } from "../../firebase/config";
import { AuthContext, useAuth } from "../Context/authContext";

import { useFirebase, UserDetailsContextState } from "../Context/userContext";
import { Feather } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import { doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../styles/styles";
export let usertemp = [];

type UserInfoScreenProps = NativeStackScreenProps<
  MainStackParamList,
  "UserInfoScreen"
>;

const UserInfoScreen: React.FC<UserInfoScreenProps> = (props) => {
  const { userDetails, updateUserDetails } = useFirebase(); // Get the addUserDetails function from the FirebaseProvider
  const { logOut } = useAuth();
  const storage = getStorage();
  const uid = auth.currentUser.uid;
  const [isLoading, setIsLoading] = useState(false);
  const [editedUsername, setEditedUsername] = useState<string>("");
  const [editedemail, setEditedEmail] = useState<string>("");
  const [editedBio, setEditedBio] = useState<string>("");
  const [editedUserImageUrl, setEditedUserImageUrl] = useState<string>("");
  const { user, setUserAvatarUrl, userAvatarUrl } = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");

  // Step 2: Render Text or TextInput based on edit mode

  console.log("userdetails in UserInfoScreen ; ", userDetails);
  const renderTextOrInput = (
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>,
    field: string // Add a new parameter to indicate the field to edit
  ) => {
    if (editMode) {
      // Render TextInput in edit mode
      return (
        <TextInput
          style={styles.inputContainer}
          placeholder={value}
          placeholderTextColor={"black"}
          value={
            field === "Name"
              ? editedUsername
              : field === "Email"
              ? editedemail
              : editedBio
          }
          onChangeText={(text) => {
            if (field === "Name") {
              setEditedUsername(text);
            } else if (field === "Email") {
              setEditedEmail(text);
            } else if (field === "Bio") {
              setEditedBio(text);
            }
          }}
          editable={true}
        />
      );
    } else {
      // Render Text in view mode
      return <Text style={styles.text}>{value}</Text>;
    }
  };

  // Step 3: Handle edit button click
  const handleEditClick = () => {
    setEditMode(!editMode); // Toggle edit mode on/off
  };

  const handleUpdate = async () => {
    const updatedUserDetails: UserDetailsContextState = {
      ...userDetails,
      uid: uid,
      username: editedUsername,
      email: editedemail,
      bio: editedBio,
      userImageUrl: editedUserImageUrl,
    };

    await updateUserDetails(updatedUserDetails);
    setEditMode(false);
  };

  const handleSignOut = async () => {
    try {
      await logOut(auth).then(() => {
        console.log("User signed out successfully");
        props.navigation.push("LoginScreen");
      });
    } catch (error) {
      console.log("Sign out error ", error);
    }
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
      setEditedUserImageUrl(downloadURL);
      setUserAvatarUrl(downloadURL);
    });
  };

  return (
    <LinearGradient
      colors={["blue", "pink", "purple"]}
      style={styles.linearGradient}
    >
      <View style={styles.container}>
        <Text style={styles.text}>Your Profile</Text>
        <FlatList
          data={userDetails}
          keyExtractor={(item) => item.uid}
          renderItem={({ item }) => (
            <View>
              <Image
                style={styles.profileImage}
                source={{ uri: userAvatarUrl }}
              />
              <SimpleLineIcons
                style={styles.cameraIcon}
                name="camera"
                size={30}
                color="white"
                onPress={pickImage}
              />
              <View>
                <View style={styles.row}>
                  <Text style={styles.text}>Name: </Text>
                  {renderTextOrInput(item.username, setEditedUsername, "Name")}
                </View>
                <View style={styles.row}>
                  <Text style={styles.text}>Email: </Text>
                  {renderTextOrInput(item.email, setEditedEmail, "Email")}
                </View>

                <View style={styles.bioRow}>
                  <Text style={styles.text}>Bio: </Text>
                  {renderTextOrInput(item.bio, setEditedBio, "Bio")}
                </View>
              </View>
            </View>
          )}
        />

        <View style={styles.container}>
          {editMode ? (
            <CustomButton
              text="Save User Profile"
              onPress={handleUpdate}
              bgColor={undefined}
              fgColor={undefined}
            />
          ) : (
            <Feather
              name="edit"
              size={24}
              color="white"
              onPress={handleEditClick}
            />
          )}
          <CustomButton
            text="Sign Out"
            onPress={handleSignOut}
            bgColor={undefined}
            fgColor={undefined}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

export default UserInfoScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 20,
//     paddingTop: 30,
//   },
//   profileImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     alignSelf: "center",
//     marginBottom: 20,
//   },
//   input: {
//     borderBottomWidth: 1,
//     borderColor: "#ccc",
//     paddingVertical: 8,
//     marginBottom: 10,
//   },
//   text: {
//     fontSize: 16,
//     marginBottom: 10,
//   },
//   editButton: {
//     alignSelf: "center",
//     padding: 10,
//     backgroundColor: "#2196F3",
//     borderRadius: 5,
//     marginTop: 10,
//   },
//   editText: {
//     color: "#fff",
//     fontWeight: "bold",
//   },
//   signOutButton: {
//     alignSelf: "center",
//     padding: 10,
//     backgroundColor: "#F44336",
//     borderRadius: 5,
//     marginTop: 20,
//   },
//   signOutText: {
//     color: "#fff",
//     fontWeight: "bold",
//   },
//   row: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     borderBottomWidth: 1,
//     borderColor: "#ccc",
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     marginRight: 200,
//   },
// });
