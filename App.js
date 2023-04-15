import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { LogBox, StyleSheet, View } from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import RootNavigation from "./src/navigation/RootNavigation";
import WatchlistContext from "./src/contexts/WatchlistContext";
import { Amplify } from "aws-amplify";
import config from "./src/aws-exports";
import { withAuthenticator, AmplifyTheme } from "aws-amplify-react-native";
import { RecoilRoot } from "recoil";

Amplify.configure({
  ...config,
  Analytics: {
    disabled: true
  }
});
LogBox.ignoreAllLogs();
function App() {
  useEffect(() => {
    NavigationBar.setBackgroundColorAsync("#181818");
  }, []);
  return (
    <RecoilRoot>
      <WatchlistContext>
        <View style={styles.container}>
          <RootNavigation />
          <StatusBar style="light" />
        </View>
      </WatchlistContext>
    </RecoilRoot>
  );
}

const customTheme = {
  ...AmplifyTheme,
  container: {
    ...AmplifyTheme.container,
    paddingTop: 20
  },
  button: {
    ...AmplifyTheme.button,
    backgroundColor: "#181818"
  },
  buttonDisabled: {
    ...AmplifyTheme.buttonDisabled,
    backgroundColor: "#18181880"
  },
  sectionFooterLink: {
    ...AmplifyTheme.sectionFooterLink,
    color: "#181818"
  },
  sectionFooterLinkDisabled: {
    ...AmplifyTheme.sectionFooterLinkDisabled,
    color: "#18181880"
  }
};

const signUpConfig = {
  header: "Create a new account",
  hideAllDefaults: true,
  signUpFields: [
    {
      label: "Full name",
      key: "name",
      required: true,
      displayOrder: 1,
      type: "string",
    },
    {
      label: "Email",
      key: "email",
      required: true,
      displayOrder: 2,
      type: "string",
    },
    {
      label: "Username",
      key: "username",
      required: true,
      displayOrder: 3,
      type: "string",
    },
    {
      label: "Password",
      key: "password",
      required: true,
      displayOrder: 4,
      type: "password",
    }
  ]
};

export default withAuthenticator(App, { signUpConfig, theme: customTheme });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#121212"
  }
});
