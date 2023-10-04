import type { RouteProp } from "@react-navigation/native";

export type MainStackParamList = {
  HomeScreen: undefined;
  UserInfoScreen: undefined;
  CreateProfileScreen: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  LoginPromptScreen: undefined;
  SearchScreen: undefined;
  Chat: any;
};

export type ChatRouteProp = RouteProp<MainStackParamList, "Chat">;

export type SearchScreenRouteProp = RouteProp<
  MainStackParamList,
  "SearchScreen"
>;

export type UserInfoScreenRouteProp = RouteProp<
  MainStackParamList,
  "UserInfoScreen"
>;

export type HomeScreenRouteProp = RouteProp<MainStackParamList, "HomeScreen">;

export type LoginScreenRouteProp = RouteProp<MainStackParamList, "LoginScreen">;

export type CreateProfileScreenProp = RouteProp<
  MainStackParamList,
  "CreateProfileScreen"
>;
export type LoginPromptScreenRouteProp = RouteProp<
  MainStackParamList,
  "LoginPromptScreen"
>;

export type RegisterScreenRouteProp = RouteProp<
  MainStackParamList,
  "RegisterScreen"
>;
