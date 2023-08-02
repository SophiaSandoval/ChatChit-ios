import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { userRef } from "../../firebase/config";
import { getDocs, query, where } from "firebase/firestore";
import userAvatar from "../assets/man.png";

type SearchScreenProps = NativeStackScreenProps<
  MainStackParamList,
  "SearchScreen"
>;

const SearchScreen: React.FC<SearchScreenProps> = (props) => {
  const [searchFriend, setSearchFriend] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [found, setFound] = useState(false);
  const [searchFriendsName, setSearchFriendsName] = useState([]);
  const handleSearchFriend = async () => {
    if (searchFriend !== "") {
      setSearchFriendsName([]);
      setIsLoading(true);
      const queryResult = query(
        userRef,
        where("username", ">=", searchFriend.trim()),
        where("username", "<=", searchFriend.trim() + "\ufaff")
      );
      const querySnapshot = await getDocs(queryResult);
      if (!querySnapshot.empty) {
        let friends = [];
        querySnapshot.forEach((doc) => {
          const { profilePic, username, email } = doc.data();
          friends.push({ profilePic, username, email });
        });
        setSearchFriendsName(friends);
        setFound(true);
      } else {
        setFound(false);
      }
      setIsLoading(false);
    }
  };
  return (
    <View>
      <View>
        <TextInput
          placeholder="Search"
          autoCapitalize="none"
          keyboardType="default"
          autoFocus={true}
          value={searchFriend}
          onChangeText={(text) => setSearchFriend(text)}
        />
        <TouchableOpacity onPress={handleSearchFriend}>
          <MaterialCommunityIcons
            name="account-search-outline"
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
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
                    friendAvatar: item.profilePic,
                    friendEmail: item.email.split("@")[0].toLowerCase(),
                  })
                }
              >
                <View>
                  {item.profilePic !== undefined ? (
                    <Image source={{ uri: item.profilePic }} />
                  ) : (
                    <Image source={userAvatar} />
                  )}
                  <Text>{item.username}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      ) : (
        <View>
          <Image source={userAvatar} />
        </View>
      )}
      <StatusBar barStyle={"default"} />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  view: {
    color: "#3B71F3",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  inputContainer: {
    backgroundColor: "white",
    width: "90%",
    padding: 10,
    flex: 1,

    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 5,

    paddingHorizontal: 0,
    marginBottom: 5,
  },
});
