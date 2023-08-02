import { StyleSheet, Text, View, Image, Animated } from "react-native";
import React, {
  useState,
  useLayoutEffect,
  useContext,
  useRef,
  useEffect,
} from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../types/navigation";
import {
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import userAvatar from "../assets/man.png";
import { RouteProp } from "@react-navigation/native";
import { AuthContext } from "../Context/authContext";
import {
  Timestamp,
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { chatRef, db } from "../../firebase/config";
import MessageItem from "../components/MessageItem";

// Define the data type for route params
interface ChatRouteParams {
  friendAvatar: string | undefined;
  friendName: string;
  friendEmail: string;
}

// Define the combined type that satisfies the constraint
type ChatRouteProp = RouteProp<MainStackParamList, "Chat"> & {
  params: ChatRouteParams;
};

type ChatProps = NativeStackScreenProps<MainStackParamList, "Chat">;

const Chat: React.FC<ChatProps> = (props) => {
  const { user } = useContext(AuthContext);
  const route = useRoute<ChatRouteProp>();
  const [message, setMessage] = useState("");
  const { friendAvatar, friendName, friendEmail } = route.params;
  const sender = user.email.split("@")[0].toLowerCase();
  const [messages, setMessages] = useState([]);
  const flatListRef = useRef(null);
  const [isListReady, setIsListReady] = useState(false);
  console.log("this is friends email", friendEmail);
  console.log("this is sender email", sender);

  const queryResult = query(
    chatRef,
    where("chatters", "==", `${sender}xx${friendEmail}`)
  );
  const queryResult2 = query(
    chatRef,
    where("chatters", "==", `${friendEmail}xx${sender}`)
  );

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => (
        <View>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Ionicons name="ios-arrow-back-outline" size={24} color="black" />
          </TouchableOpacity>
          {friendAvatar !== undefined ? (
            <Image source={{ uri: friendAvatar }} />
          ) : (
            <Image source={userAvatar} />
          )}
          <Text>{friendName}</Text>
        </View>
      ),
    });
  }, [friendAvatar, props.navigation]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const querySnapshotUser = await getDocs(queryResult);
        const querySnapshotFriend = await getDocs(queryResult2);

        let userMessages = [];
        let friendMessages = [];

        if (!querySnapshotUser.empty) {
          userMessages = querySnapshotUser.docs.map(
            (doc) => doc.data().conversation
          );
        }

        if (!querySnapshotFriend.empty) {
          friendMessages = querySnapshotFriend.docs.map(
            (doc) => doc.data().conversation
          );
        }

        const allMessages = [...userMessages, ...friendMessages];
        const sortedMessages = allMessages.sort(
          (a, b) => a.timestamp?.seconds - b.timestamp?.seconds
        );

        setMessages(sortedMessages);
        console.log("Friend Messages: ", friendMessages);

        console.log("All Messages: ", allMessages);
        console.log("Sorted Messages: ", sortedMessages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    const unsub1 = onSnapshot(queryResult, (snapshot) => {
      const allMessages = snapshot.docs.map((doc) => doc.data().conversation);
      setMessages(allMessages);
      console.log("this is all messages", allMessages);
    });
    const unsub2 = onSnapshot(queryResult2, (snapshot) => {
      const allMessages = snapshot.docs.map((doc) => doc.data().conversation);
      setMessages(allMessages);
    });
    fetchMessages();
    return () => {
      unsub1();
      unsub2();
    };
  }, []);

  const handleSend = async () => {
    const querySnapshot = await getDocs(queryResult);
    const querySnapshot2 = await getDocs(queryResult2);
    if (!querySnapshot.empty || !querySnapshot2.empty) {
      querySnapshot.forEach((doc) => {
        const chatDocRef = doc.ref;

        updateDoc(chatDocRef, {
          conversation: [
            ...(doc.data().conversation || []),
            {
              message: message,
              timestamp: Timestamp.now(),
              sender: sender,
            },
          ],
        }).catch((error) => console.log(error));
      });
      querySnapshot2.forEach((doc) => {
        const chatDocRef = doc.ref;

        updateDoc(chatDocRef, {
          conversation: [
            ...(doc.data().conversation || []),
            {
              message: message,
              timestamp: Timestamp.now(),
              sender: sender,
            },
          ],
        }).catch((error) => console.log(error));
      });
    } else {
      await addDoc(collection(db, "chats"), {
        chatters: `${sender}xx${friendEmail}`,
        conversation: [
          {
            message: message,
            timestamp: Timestamp.now(),
            sender: sender,
          },
        ],
      });
    }
    setMessage("");
  };

  useEffect(() => {
    setIsListReady(true);
  }, [messages]);
  return (
    <View>
      <View style={{ height: "90%" }}>
        {messages[0] !== undefined && (
          <FlatList
            initialNumToRender={10}
            ref={flatListRef}
            onContentSizeChange={() => {
              if (isListReady)
                flatListRef?.current?.scrollToEnd({ animated: true });
            }}
            data={messages[0]}
            keyExtractor={(item) => item.timestamp}
            renderItem={({ item }) => (
              <MessageItem item={item} sender={sender} />
            )}
          />
        )}
      </View>
      <View style={{ height: "10%" }}>
        <TextInput
          style={styles.inputContainer}
          placeholder="type your message here"
          multiline={true}
          value={message}
          onChangeText={(text) => setMessage(text)}
        />
        <TouchableOpacity onPress={handleSend}>
          <MaterialCommunityIcons
            name="account-search-outline"
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: "white",
    width: "90%",
    padding: 10,
    flex: 1,
    alignContent: "center",

    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 5,

    paddingHorizontal: 0,
    marginBottom: 5,
  },
});
