import "react-native-gesture-handler";
import React from "react";
import RootNavigator from "./navigation/RootNavigator";
import { AuthProvider } from "./Context/authContext";
import { FirebaseProvider } from "./Context/userContext";
const App = (): JSX.Element => {
  return (
    <AuthProvider>
      <FirebaseProvider>
        <RootNavigator />
      </FirebaseProvider>
    </AuthProvider>
  );
};

export default App;
