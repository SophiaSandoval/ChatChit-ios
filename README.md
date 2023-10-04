**ChitChat - A React Native Chat Application**
https://github.com/SophiaSandoval/ChatChit-ios/assets/89662198/f3c8689e-2b72-4189-8fe6-94bdfa134be3

**Introduction:**

ChitChat is a cross-platform chat application that I've been developing using React Native, TypeScript, and Expo. The primary goal of this project is to create a seamless and secure messaging platform for users across different platforms. Here's an overview of the project's progress and future plans:

**Project Timeline:**

I started working on ChitChat in August but took a break to develop a website for a plumbing company, which explains the gap in the project timeline. I have now resumed work on ChitChat and wanted to provide an update on its current status and future developments.

**Current Features:**

1. **Firebase Authentication:** ChitChat incorporates Firebase Authentication to ensure secure user registration and login. This feature guarantees a safe and user-friendly experience.

2. **Real-Time Messaging:** I've implemented Firebase Firestore to store and synchronize chat messages in real time. This feature creates a responsive and dynamic messaging platform that allows users to chat seamlessly.

3. **User and Auth Context API:** To efficiently manage application state and user authentication, I've implemented a User and Auth Context API. This enhances the overall user experience and ensures smooth navigation within the app.

4. **Profile Creation:** Users can create their profiles, providing basic information such as name, profile picture, and status.

5. **Profile Reading:** Users can view their own profile.

6. **Profile Updating:** Users have the ability to update their profiles, including changing their profile picture or updating their information.
7. 7. **Profile Search** Users can search for other users who they want to chat with.
**Future Plans:**

**I'm actively working on enhancing ChitChat with the following features**

1. **Extended Authentication Features:** I plan to bolster security by adding features such as two-factor authentication, password reset functionality, and email verification to further protect user accounts.

2. **Improved UI/UX:** ChitChat will receive an overhaul in terms of user interface and user experience. I aim to create a more polished and responsive UI, making it visually appealing and easy to use.

3. **Message Notifications:** Users will benefit from a message notification feature that keeps them informed about new messages, even when the app is in the background.

4. **Code Organization:** I am working on restructuring and optimizing the codebase for better maintainability and scalability.

5. **Profile Deletion:** In the future, I plan to implement the ability for users to delete their profiles, ensuring user data privacy and account management.

6. **Testing:** I intend to implement testing procedures to ensure the application's stability and robustness.

**Audience:**

The primary audience for this project, particularly this README update, is recruiters from potential job opportunities. I believe ChitChat showcases my skills in mobile app development, and I'm excited about the opportunity to further refine and expand this project.

Thank you for taking the time to review my project, and please feel free to reach out if you have any questions or would like to discuss it further.

https://github.com/SophiaSandoval/ChatChit-ios/assets/89662198/f3c8689e-2b72-4189-8fe6-94bdfa134be3






# Development Client example

<p>
  <!-- iOS -->
  <img alt="Supports Expo iOS" longdesc="Supports Expo iOS" src="https://img.shields.io/badge/iOS-4630EB.svg?style=flat-square&logo=APPLE&labelColor=999999&logoColor=fff" />
  <!-- Android -->
  <img alt="Supports Expo Android" longdesc="Supports Expo Android" src="https://img.shields.io/badge/Android-4630EB.svg?style=flat-square&logo=ANDROID&labelColor=A4C639&logoColor=fff" />
</p>

Experiment with Development Client in SDK 40.

## 🚀 How to use

> `npx create-react-native-app my-app -t with-dev-client`

- Run `expo start --dev-client` to try it out.

## 🏗 Build with EAS

You can easily use this project with `EAS` - just follow the steps below.

### ⚙️ Prepare project

- adjust value of `ios.bundleIdentifier` and `android.package` in `app.json`
- run `eas build:configure`

### 💪 Build whatever you want

This example comes with two pre-configured build types: `release` (a production version of your app - ready to be uploaded to stores), `with-dev-client` (a development version of your app that can be shared with your teammates).

To build the app with the dev client, just run `eas build --profile with-dev-client`.

> **Note**: the `with-dev-client` uses the **internal distribution** on **iOS**. That's why, you need to add your device to be able to install the built app. To do it, you can use `eas device:create`.

**For more information about EAS, check out [documentation](https://docs.expo.dev/eas/).**

## 📝 Notes

- [Development Client docs](https://docs.expo.dev/clients/introduction/)
