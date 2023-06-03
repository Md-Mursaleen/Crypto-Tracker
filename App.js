import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { LogBox, StyleSheet, View } from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import RootNavigation from "./src/navigation/RootNavigation";
import WatchlistContext from "./src/contexts/WatchlistContext";
import { RecoilRoot } from "recoil";

LogBox.ignoreAllLogs();
function App() {
  useEffect(() => {
    NavigationBar.setBackgroundColorAsync("#0e0e0e");
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

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#000102"
  }
});
