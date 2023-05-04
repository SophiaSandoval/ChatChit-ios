import type { RouteProp } from "@react-navigation/native";

export type MainStackParamList = {
  LoginScreen: undefined;
  HomeScreen: undefined;
  ChatScreen: { title: string };
};

export type ChatScreenRouteProp = RouteProp<MainStackParamList, "ChatScreen">;

export type HomeScreenRouteProp = RouteProp<MainStackParamList, "HomeScreen">;

export type LoginScreenRouteProp = RouteProp<MainStackParamList, "LoginScreen">;
