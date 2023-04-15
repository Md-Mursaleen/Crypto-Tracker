import { View, Text, Pressable, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { useNavigation } from "@react-navigation/native";
import { Auth } from "aws-amplify";

const ProfileScreen = () => {
    const [username, setUsername] = useState("");
    const navigation = useNavigation();
    useEffect(() => {
        Auth.currentAuthenticatedUser().then((res) => setUsername(res.attributes.name));
    }, []);
    return (
        <View style={
            {
                flex: 1,
                marginTop: 10
            }
        }>
            <Pressable style={
                {
                    marginLeft: 15
                }
            }
                onPress={() => navigation.goBack()}>
                <Feather name="arrow-left" size={23} color="white" />
            </Pressable>
            <Text style={
                {
                    marginLeft: 15,
                    fontSize: 38,
                    fontWeight: "400",
                    color: "white"
                }
            }>Profile</Text>
            <View style={
                {
                    width: 75,
                    height: 75,
                    marginTop: 20,
                    backgroundColor: "#eee",
                    alignItems: "center",
                    alignSelf: "center",
                    justifyContent: "center",
                    borderRadius: 50
                }
            }>
                <View style={
                    {
                        width: 65,
                        height: 65,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#181818",
                        borderRadius: 50
                    }
                }
                ><SimpleLineIcons name="user" size={30} color="white" /></View>
            </View>
            <View style={
                {
                    marginTop: 10
                }
            }>
                <Text style={
                    {
                        fontSize: 18,
                        textAlign: "center",
                        color: "white"
                    }
                }>{username}</Text>
            </View>
            <View style={
                {
                    marginLeft: 15,
                    marginTop: 30
                }
            }>
                <Text style={
                    {
                        marginTop: 20,
                        fontSize: 20,
                        color: "white"
                    }
                }>Your Assets</Text>
                <View style={
                    {
                        marginTop: 20
                    }
                }>
                    <Pressable style={
                        {
                            flexDirection: "row",
                            alignItems: "center"
                        }
                    }
                        onPress={() => navigation.navigate("Portfolio")}>
                        <View>
                            <FontAwesome name="bitcoin" size={25} color="white" />
                        </View>
                        <View style={
                            {
                                marginLeft: 20
                            }
                        }>
                            <Text style={
                                {
                                    fontSize: 15,
                                    color: "white"
                                }
                            }>Current Assets</Text>
                            <Text style={
                                {
                                    marginTop: 15,
                                    fontSize: 13,
                                    color: "grey"
                                }
                            }>Add Asset</Text>
                        </View>
                    </Pressable>
                    <View style={{
                        marginTop: 20,
                        marginRight: 15,
                        borderWidth: StyleSheet.hairlineWidth,
                        borderColor: "#282828"
                    }} />
                    <Pressable style={
                        {
                            marginTop: 18,
                            flexDirection: "row",
                            alignItems: "center"
                        }
                    }
                        onPress={() => navigation.navigate("Watchlist")}>
                        <View>
                            <FontAwesome5 name="star" size={23} color="white" />
                        </View>
                        <View style={
                            {
                                marginLeft: 20
                            }
                        }>
                            <Text style={
                                {
                                    fontSize: 15,
                                    color: "white"
                                }
                            }>Watchlist Assets</Text>
                            <Text style={
                                {
                                    marginTop: 15,
                                    fontSize: 13,
                                    color: "grey"
                                }
                            }>Add Watchlist</Text>
                        </View>
                    </Pressable>
                </View>
            </View>
            <View style={
                {
                    marginTop: 20,
                    marginLeft: 15
                }
            }>
                <Pressable
                    onPress={() => Auth.signOut()}>
                    <Text style={
                        {
                            marginTop: 25,
                            fontSize: 18,
                            fontWeight: "500",
                            color: "#ea3943"
                        }
                    }>Sign Out</Text>
                </Pressable>
            </View>
            <Pressable style={styles.buttonContainer}
                onPress={() => navigation.navigate("Asset")}>
                <Text style={styles.buttonText}>Add New Asset</Text>
            </Pressable>
        </View>
    );
}

export default ProfileScreen;

const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 50,
        padding: 10,
        marginVertical: 25,
        marginHorizontal: 10,
        alignItems: "center",
        backgroundColor: "#4169e1",
        borderRadius: 5
    },
    buttonText: {
        fontSize: 17,
        fontWeight: "600",
        color: "white"
    }
});