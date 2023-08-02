import "react-native-gesture-handler";
import React from "react";
import RootNavigator from "./navigation/RootNavigator";
import { AuthProvider } from "./Context/authContext";
const App = (): JSX.Element => {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
};

export default App;
