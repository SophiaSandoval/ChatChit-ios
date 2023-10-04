import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  StatusBar,
  Animated,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { userRef } from "../../firebase/config";
import { getDocs, onSnapshot, query, where } from "firebase/firestore";
import userAvatar from "../assets/man.png";
import styles from "../styles/styles";
import { LinearGradient } from "expo-linear-gradient";
import SearchComponent from "../components/SearchBox";
import { UserDetailsContextState, useFirebase } from "../Context/userContext";
import { AuthContext } from "../Context/authContext";
import logo from "../assets/ChatChit.png";

type SearchScreenProps = NativeStackScreenProps<
  MainStackParamList,
  "SearchScreen"
>;

const SearchScreen: React.FC<SearchScreenProps> = (props) => {
  const [searchFriend, setSearchFriend] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [found, setFound] = useState(false);
  const [searchFriendsName, setSearchFriendsName] = useState([]);
  const { user, setUserAvatarUrl, userAvatarUrl } = useContext(AuthContext);

  const handleSearchFriend = async () => {
    console.log("handleSearchFriend called");
    console.log("Handling search for:", searchFriend);

    if (searchFriend.trim() !== "") {
      setSearchFriendsName([]);
      setIsLoading(true);

      console.log("Searching for friends...");

      try {
        const queryResult = query(
          userRef,
          where("username", ">=", searchFriend.trim()),
          where("username", "<=", searchFriend.trim() + "\uf8ff")
        );

        const querySnapshot = await getDocs(queryResult);

        if (!querySnapshot.empty) {
          let friends = [];
          querySnapshot.forEach((document) => {
            const { userImageUrl, username, email } = document.data();
            friends.push({ userImageUrl, username, email: email });
          });
          setSearchFriendsName(friends);
          setFound(true);
          console.log("Found friends:", friends);
        } else {
          setFound(false);
          console.log("No friends found.");
        }
      } catch (error) {
        console.error("Error while searching for friends:", error);
      } finally {
        setIsLoading(false);
        console.log("Search completed.");
      }
    } else {
      console.log("Input is empty or contains only whitespace.");
    }
  };

  // useEffect(() => {
  //   const queryResult = query(
  //     userRef,
  //     where("username", ">=", searchFriend.trim()),
  //     where("username", "<=", searchFriend.trim() + "\uf8ff")
  //   );
  //   const unsubscribe = onSnapshot(queryResult, (snapshot) => {
  //     if (!snapshot.empty) {
  //       let friends = [];
  //       snapshot.forEach((doc) => {
  //         const { username, email, userImageUrl, userAvatarUrl } = doc.data();
  //         friends.push({
  //           username: username,
  //           email: email,
  //           userImageUrl: userImageUrl,
  //           userAvatarUrl: userAvatarUrl,
  //         });
  //       });
  //       setSearchFriendsName(friends);
  //       console.log("FRIENDS ARE ", friends);
  //       setFound(true);
  //     } else {
  //       setFound(false);
  //       console.log("user not found");
  //     }
  //   });
  //   return () => unsubscribe();
  // }, [searchFriend]);
  return (
    <LinearGradient
      colors={["blue", "pink", "purple"]}
      style={styles.linearGradient}
    >
      <View>
        <View style={styles.searchContainer}>
          <Image style={styles.searchImage} source={{ uri: userAvatarUrl }} />
          <Animated.View>
            <TextInput
              style={styles.formField}
              placeholderTextColor={"white"}
              placeholder="Search"
              autoCapitalize="none"
              keyboardType="default"
              autoFocus={true}
              value={searchFriend}
              onChangeText={(text: string) => {
                console.log("Input changed:", text);
                setSearchFriend(text);
              }}
            />
          </Animated.View>
        </View>
        <TouchableOpacity
          style={styles.searchFriend}
          onPress={handleSearchFriend}
        >
          <MaterialCommunityIcons
            name="account-search-outline"
            size={24}
            color="white"
          />
        </TouchableOpacity>
        {isLoading && <ActivityIndicator size={"large"} color="gray" />}
        {found ? (
          <View>
            <FlatList
              data={searchFriendsName}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item.username}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.replace("Chat", {
                      friendName: item.username,
                      friendAvatar: item.userImageUrl,
                      friendEmail: item.email.split("@")[0].toLowerCase(),
                    })
                  }
                >
                  <View>
                    {item.userImageUrl !== undefined ? (
                      <Image
                        style={styles.searchImage}
                        source={{ uri: item.userImageUrl }}
                      />
                    ) : (
                      <Image style={styles.searchImage} source={userAvatar} />
                    )}
                    <Text style={styles.searchText}>{item.username}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        ) : (
          <View></View>
        )}
        <StatusBar barStyle={"default"} />
      </View>
    </LinearGradient>
  );
};

export default SearchScreen;

// const styles = StyleSheet.create({
//   view: {
//     color: "#3B71F3",
//     justifyContent: "center",
//     paddingHorizontal: 10,
//   },
//   inputContainer: {
//     backgroundColor: "white",
//     width: "90%",
//     padding: 10,
//     flex: 1,

//     borderColor: "#e8e8e8",
//     borderWidth: 1,
//     borderRadius: 5,

//     paddingHorizontal: 0,
//     marginBottom: 5,
//   },
// });
