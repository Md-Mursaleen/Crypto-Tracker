import React, { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = () => {
    const navigation = useNavigation();
    const [signedUser, setSignedUser] = useState();
    const getSignedUserData = async () => {
        const signedUserData = await AsyncStorage.getItem("SignedUserData");
        setSignedUser(JSON.parse(signedUserData));
    };
    useEffect(() => {
        getSignedUserData();
    }, []);
    const signOutWithGoogle = async () => {
        auth().signOut();
        navigation.navigate("Login");
    };
    return (
        <View style={styles.container}>
            <Text style={styles.profileText}>Profile</Text>
            <View style={styles.profileIconContainer}>
                <View style={styles.profileIconSubContainer}>
                    <FontAwesome5 name="user" color="#bdc5cc" size={28} />
                </View>
            </View>
            <View style={{ marginTop: 10 }}>
                <Text style={styles.usernameText}>{signedUser?.user?.displayName}</Text>
            </View>
            <View style={styles.middleContainer}>
                <Text style={styles.assetsText}>Your Assets</Text>
                <View style={{ marginTop: 20 }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <View>
                            <MaterialIcons name="attach-money" size={32} color="white" />
                        </View>
                        <View style={{ marginLeft: 15 }}>
                            <Text style={styles.middleContainerText} onPress={() => navigation.navigate("Portfolio")}>Current Assets</Text>
                            <Text style={styles.middleContainerSubText} onPress={() => navigation.navigate("Asset")}>Add Asset</Text>
                        </View>
                    </View>
                    <View style={styles.borderStyle} />
                    <View style={styles.middleContainerBottomView}>
                        <View>
                            <FontAwesome5 name="star" size={22} color="white" />
                        </View>
                        <View style={{ marginLeft: 20 }}>
                            <Text style={styles.middleContainerText} onPress={() => navigation.navigate("Watchlist")}>Watchlist Assets</Text>
                            <Text style={styles.middleContainerSubText} onPress={() => navigation.navigate("Markets")} >Add Watchlist</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.bottomContainer}>
                <Pressable
                    onPress={() => signOutWithGoogle()}>
                    <Text style={styles.signOutText}>Sign Out</Text>
                </Pressable>
            </View>
        </View>
    );
}

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        paddingTop: 50
    },
    profileText: {
        marginLeft: 15,
        fontSize: 29,
        fontWeight: "bold",
        color: "white"
    },
    profileIconContainer: {
        width: 75,
        height: 75,
        marginTop: 20,
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
        backgroundColor: "#bdc5cc",
        borderRadius: 50
    },
    profileIconSubContainer: {
        width: 65,
        height: 65,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#2b3238",
        borderRadius: 50
    },
    usernameText: {
        fontSize: 16,
        fontWeight: "500",
        textAlign: "center",
        color: "#bdc5cc"
    },
    assetsText: {
        marginTop: 20,
        fontSize: 18.5,
        fontWeight: "500",
        color: "white"
    },
    middleContainer: {
        marginLeft: 15,
        marginTop: 30
    },
    middleContainerBottomView: {
        marginLeft: 3,
        marginTop: 18,
        flexDirection: "row",
        alignItems: "center"
    },
    middleContainerText: {
        fontSize: 14.8,
        fontWeight: "500",
        color: "white"
    },
    middleContainerSubText: {
        marginTop: 18,
        fontSize: 13,
        fontWeight: "500",
        color: "grey"
    },
    bottomContainer: {
        marginTop: 20,
        marginLeft: 15
    },
    borderStyle: {
        marginTop: 20,
        marginRight: 15,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "#2b3238"
    },
    signOutText: {
        marginTop: 25,
        fontSize: 18.5,
        fontWeight: "600",
        color: "#bdc5cc"
    },
    imageStyle: {
        width: 70,
        height: 70,
        resizeMode: "contain"
    }
});