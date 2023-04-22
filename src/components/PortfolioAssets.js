import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import PortfolioAssetItem from "./PortfolioAssetItem";
import { useNavigation } from "@react-navigation/native";
import { useRecoilValue, useRecoilState } from "recoil";
import { portfolioassets } from "../atoms/PortfolioAssets";
import { SwipeListView } from "react-native-swipe-list-view";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { portfolioassetsinstore } from "../atoms/PortfolioAssets";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
        )
    };
    return (
        <SwipeListView data={assets}
            renderItem={({ item }) => <PortfolioAssetItem assetitem={item} />}
            rightOpenValue={-75}
            disableRightSwipe
            keyExtractor={({ id }, index) => `${id}${index}`}
            renderHiddenItem={(data) => deletebutton(data)}
            ListHeaderComponent={
                <>
                    <View style={styles.balanceContainer}>
                        <View>
                            <Text style={styles.balanceText}>Current Balance</Text>
                            <Text style={styles.balanceValueText}>${currentBalance().toFixed(2)}</Text>
                            <Text style={{ fontSize: 16, fontWeight: "700", color: currentValue() >= 0 ? "#16c784" : "#ea3943" }}>${currentValue()} (All Time)</Text>
                        </View>
                        <View style={[styles.percentageChangeContainer, { backgroundColor: currentValue() >= 0 ? "#16c784" : "#ea3943" }]}>
                            <AntDesign name={currentValue() >= 0 ? "caretup" : "caretdown"} color="white" style={
                                {
                                    marginRight: 5,
                                    alignSelf: "center"
                                }
                            } />
                            <Text style={styles.percentageChangeText}>{currentpercentage()}%</Text>
                        </View>
                    </View>
                    <Text style={styles.assetsText}>Your Assets</Text>
                </>
            }
            ListFooterComponent={
                <Pressable style={styles.buttonContainer}
                    onPress={() => navigation.navigate("Asset")}>
                    <Text style={styles.buttonText}>Add New Asset</Text>
                </Pressable>
            } />
    );
}

export default PortfolioAssets;

const styles = StyleSheet.create({
    balanceContainer: {
        marginTop: 10,
        marginBottom: 5,
        marginHorizontal: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    balanceText: {
        marginLeft: 4,
        fontSize: 18,
        fontWeight: "600",
        color: "white"
    },
    balanceValueText: {
        fontSize: 38,
        fontWeight: "700",
        color: "white"
    },
    percentageChangeContainer: {
        paddingHorizontal: 5.5,
        paddingVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#16c784",
        borderRadius: 5
    },
    percentageChangeText: {
        fontSize: 17,
        fontWeight: "600",
        color: "white"
    },
    assetsText: {
        paddingHorizontal: 10,
        paddingVertical: 20,
        fontSize: 22,
        fontWeight: "700",
        color: "white"
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
        fontSize: 17,
        fontWeight: "600",
        color: "white"
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