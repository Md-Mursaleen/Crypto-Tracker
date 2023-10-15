import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRecoilValue, useRecoilState } from "recoil";
import { portfolioassets } from "../atoms/PortfolioAssets";
import { SwipeListView } from "react-native-swipe-list-view";
import { portfolioassetsinstore } from "../atoms/PortfolioAssets";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import PortfolioAssetItem from "./PortfolioAssetItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from "lottie-react-native";

const PortfolioAssets = () => {
    const assets = useRecoilValue(portfolioassets);
    const [storedAssets, setStoredAssets] = useRecoilState(portfolioassetsinstore);
    const navigation = useNavigation();
    const currentBalance = () => assets.reduce((total, currentAsset) => total + (currentAsset.current_price * currentAsset.quantity), 0);
    const currentValue = () => {
        const currentbalance = currentBalance();
        const boughtValue = assets.reduce((total, currentAsset) => total + (currentAsset.price * currentAsset.quantity), 0);
        return (currentbalance - boughtValue).toFixed(2);
    };
    const currentpercentage = () => {
        const currentbalance = currentBalance();
        const boughtValue = assets.reduce((total, currentAsset) => total + (currentAsset.price * currentAsset.quantity), 0);
        return ((currentbalance - boughtValue) / boughtValue * 100 || 0).toFixed(2);
    };
    const deletingAsset = async (asset) => {
        const newAssets = storedAssets.filter((crypto, index) => crypto.uniqueid !== asset.item.uniqueid);
        const jsonData = JSON.stringify(newAssets);
        await AsyncStorage.setItem("@portfolio_crypto", jsonData);
        setStoredAssets(newAssets);
    };
    const deletebutton = (data) => {
        return (
            <Pressable style={styles.deleteButtonContainer}
                onPress={() => deletingAsset(data)}>
                <FontAwesome name="trash-o" size={24} color="white" />
            </Pressable>
        );
    };
    return (
        assets?.length === 0 ? (
            <>
                <Text style={styles.textStyle}>Portfolio</Text>
                <LottieView source={require("../../assets/animations/searching-animation.json")}
                    autoPlay
                    speed={2.0}
                    loop={true}
                    style={styles.lottieStyle} />
                <View>
                    <Text style={styles.headerTitleStyle}>Your portfolio is empty</Text>
                    <Text style={[styles.headerSubTitleStyle, { marginTop: 20 }]}>Add the first asset by tapping on the</Text>
                    <Text style={[styles.headerSubTitleStyle, { marginTop: 5 }]}>button below.</Text>
                </View>
                < Pressable style={[styles.buttonContainer, assets.length === 0 && { marginTop: 180 }]}
                    onPress={() => navigation.navigate("Asset")}>
                    <Text style={styles.buttonText}>Add New Asset</Text>
                </Pressable >
            </>
        ) : (
            <SwipeListView data={assets}
                renderItem={({ item }) => <PortfolioAssetItem assetitem={item} />}
                rightOpenValue={-75}
                disableRightSwipe
                keyExtractor={({ id }, index) => `${id}${index}`}
                renderHiddenItem={(data) => deletebutton(data)}
                ListHeaderComponent={
                    <>
                        <Text style={styles.textStyle}>Portfolio</Text>
                        <View style={styles.balanceContainer}>
                            <View>
                                <Text style={styles.balanceText}>Current Balance</Text>
                                <Text style={styles.balanceValueText}>${currentBalance()?.toFixed(2)}</Text>
                                <Text style={[styles.changePriceText, { color: currentValue() >= 0 ? "#16c784" : "#ea3943" }]}>${currentValue()} (24h)</Text>
                            </View>
                            <View style={[styles.percentageChangeContainer, { backgroundColor: currentValue() >= 0 ? "#16c784" : "#ea3943" }]}>
                                <AntDesign name={currentValue() >= 0 ? "caretup" : "caretdown"} color="white" style={styles.iconContainer} />
                                <Text style={styles.percentageChangeText}>{currentpercentage()}%</Text>
                            </View>
                        </View>
                        <Text style={styles.assetsText}>Your Assets</Text>
                        <View style={styles.headerContainer}>
                            <Text style={[styles.headerTextStyle, { fontSize: 14 }]}>Asset</Text>
                            <Text style={[styles.headerTextStyle, { marginLeft: 50 }]}>24H Price</Text>
                            <View style={styles.headerItemContainer}>
                                <Text style={styles.headerTextStyle}>Holdings</Text>
                                <AntDesign name="caretdown" color="#5e80fc" size={12} />
                            </View>
                        </View>
                    </>
                }
                ListFooterComponent={
                    < Pressable style={styles.buttonContainer}
                        onPress={() => navigation.navigate("Asset")}>
                        <Text style={styles.buttonText}>Add New Asset</Text>
                    </Pressable >
                } />
        )
    );
}

export default PortfolioAssets;

const styles = StyleSheet.create({
    textStyle: {
        marginLeft: 15,
        fontSize: 25.5,
        fontWeight: "bold",
        color: "white"
    },
    lottieStyle: {
        marginTop: 60,
        height: 185,
        alignSelf: "center"
    },
    headerTitleStyle: {
        marginTop: 80,
        fontSize: 27,
        fontWeight: "bold",
        alignSelf: "center",
        color: "white"
    },
    headerSubTitleStyle: {
        fontSize: 16.5,
        fontWeight: "500",
        alignSelf: "center",
        color: "#8694a1"
    },
    buttonContainer: {
        padding: 10,
        marginVertical: 25,
        marginHorizontal: 10,
        alignItems: "center",
        backgroundColor: "#4169e1",
        borderRadius: 5
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "600",
        color: "white"
    },
    balanceContainer: {
        marginTop: 15,
        marginBottom: 5,
        marginHorizontal: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    balanceText: {
        marginLeft: 4,
        fontSize: 16,
        fontWeight: "600",
        color: "grey"
    },
    balanceValueText: {
        marginTop: 5,
        fontSize: 28.5,
        fontWeight: "700",
        color: "white"
    },
    changePriceText: {
        marginTop: 3,
        fontSize: 14.5,
        fontWeight: "700"
    },
    percentageChangeContainer: {
        paddingHorizontal: 5,
        paddingVertical: 8,
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 10
    },
    iconContainer: {
        marginRight: 5,
        alignSelf: "center"
    },
    percentageChangeText: {
        fontSize: 17,
        fontWeight: "600",
        color: "white"
    },
    assetsText: {
        paddingHorizontal: 10,
        paddingVertical: 20,
        fontSize: 18,
        fontWeight: "700",
        color: "white"
    },
    headerContainer: {
        marginBottom: 10,
        marginHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    headerTextStyle: {
        marginRight: 5,
        fontSize: 13,
        fontWeight: "500",
        color: "#bdc5cc"
    },
    headerItemContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    deleteButtonContainer: {
        flex: 1,
        marginLeft: 20,
        paddingRight: 28,
        alignItems: "flex-end",
        justifyContent: "center",
        backgroundColor: "#ea3943"
    }
});