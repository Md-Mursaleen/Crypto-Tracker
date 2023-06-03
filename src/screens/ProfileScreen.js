import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { Auth } from "aws-amplify";

const ProfileScreen = () => {
    const [username, setUsername] = useState("");
    const navigation = useNavigation();
    useEffect(() => {
        Auth.currentAuthenticatedUser().then((res) => setUsername(res.attributes.name));
    }, []);
    return (
        <View style={styles.container}>
            <Text style={styles.profileText}>Profile</Text>
            <View style={styles.profileIconContainer}>
                <View style={styles.profileIconSubContainer}>
                    <FontAwesome5 name="user" color="#bdc5cc" size={28} />
                </View>
            </View>
            <View style={{ marginTop: 10 }}>
                <Text style={styles.usernameText}>{username}</Text>
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
                    onPress={() => Auth.signOut()}>
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
        marginTop: 10
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
        backgroundColor: "#343b43",
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
        marginTop: 25
    },
    middleContainerBottomView: {
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
        color: "#677685"
    },
    bottomContainer: {
        marginTop: 20,
        marginLeft: 15
    },
    borderStyle: {
        marginTop: 20,
        marginRight: 15,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "#8694a1"
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