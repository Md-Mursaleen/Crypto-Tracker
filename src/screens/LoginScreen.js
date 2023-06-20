import "expo-dev-client";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from "lottie-react-native";

const LoginScreen = () => {
    const navigation = useNavigation();
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    GoogleSignin.configure({
        webClientId: "226973251910-r60j1kq2tk9so9bq8fvaatjem8r0tln5.apps.googleusercontent.com"
    });
    function onAuthStateChanged(user) {
        setUser(user);
        AsyncStorage.setItem("SignedUserData", JSON.stringify({ user, loggedIn: true }));
        if (initializing) setInitializing(false);
    }
    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);
    useEffect(() => {
        if (user) {
            navigation.navigate("BottomTab");
        }
    }, [user]);
    const signInWithGoogle = async () => {
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        const { idToken } = await GoogleSignin.signIn();
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        const signedInUser = auth().signInWithCredential(googleCredential);
        signedInUser.then((user) => {
            console.log(user);
        }).catch((error) => {
            console.log(error);
        });
        if (user) {
            navigation.navigate("BottomTab");
        }
    };
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Image source={require("../../assets/images/icon.png")} style={styles.imageStyle} />
                <Text style={styles.headingText}>The Crypto App</Text>
            </View>
            <Text style={styles.titleStyle}>Easily track your</Text>
            <Text style={styles.subTitleStyle}>crypto</Text>
            <Text style={styles.textStyle}>Trusted by over 1 million users</Text>
            <LottieView source={require("../../assets/animations/graph-animations.json")}
                autoPlay
                speed={1.5}
                loop={true}
                style={styles.lottieStyle} />
            <TouchableOpacity style={styles.buttonContainer}
                onPress={() => signInWithGoogle()}>
                <Text style={styles.buttonText}>Sign in with Google</Text>
            </TouchableOpacity>
        </View>
    );
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    headerContainer: {
        marginTop: 80,
        marginLeft: 35,
        flexDirection: "row"
    },
    headingText: {
        marginTop: 5,
        marginLeft: 15,
        fontSize: 20,
        fontWeight: "bold",
        color: "black"
    },
    imageStyle: {
        width: 40,
        height: 40
    },
    titleStyle: {
        marginTop: 15,
        marginLeft: 30,
        fontSize: 38,
        fontWeight: "bold",
        color: "black"
    },
    subTitleStyle: {
        marginTop: -5,
        marginLeft: 30,
        fontSize: 32,
        fontWeight: "bold",
        color: "#4169e1"
    },
    textStyle: {
        marginTop: 20,
        marginLeft: 30,
        fontSize: 16,
        fontWeight: "bold",
        color: "grey"
    },
    buttonContainer: {
        marginTop: 440,
        padding: 12,
        marginHorizontal: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#4169e1",
        borderRadius: 5
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "500",
        color: "white"
    },
    lottieStyle: {
        marginTop: 50,
        alignSelf: "center"
    }
});