import { Button, StyleSheet, Text, View } from "react-native";
import React, { createContext, useContext, useEffect, useState } from "react";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

type AuthContextType = {
  userInfo: any;
  setUserInfo: React.Dispatch<React.SetStateAction<any>>;
};

export const AuthContext = createContext<AuthContextType>({
  userInfo: null,
  setUserInfo: () => {},
});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    //androidClientId: "GOOGLE_GUID.apps.googleusercontent.com",
    iosClientId:
      "611347768149-8gt95e7tanp75vdbq867drohuf74k40d.apps.googleusercontent.com",
  });
  useEffect(() => {
    if (response?.type === "success") {
      setToken(response.authentication.accessToken);
      getUserInfo();
    }
  }, [response, token]);

  const getUserInfo = async () => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      setUserInfo(user);
    } catch (error) {}
  };

  return (
    <AuthContext.Provider value={{ userInfo, setUserInfo }}>
      <View style={styles.container}>
        {userInfo === null ? (
          <Button
            title="Sign in with Google"
            disabled={!request}
            onPress={() => {
              promptAsync();
            }}
          />
        ) : (
          <Text style={styles.text}>{userInfo.name}</Text>
        )}
      </View>
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
