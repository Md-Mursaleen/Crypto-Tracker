import { Pressable, StyleSheet, Text, TextInput, View, KeyboardAvoidingView, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import SearchableDropdown from "react-native-searchable-dropdown";
import { useRecoilState } from "recoil";
import { portfolioassetsinstore } from "../atoms/PortfolioAssets";
import { getCoins, getCryptoData } from "../services/requests";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

const AddAssetScreen = () => {
    const [coins, setCoins] = useState([]);
    const [selectedCoin, setSelectedCoin] = useState(null);
    const [selectedCoinData, setSelectedCoinData] = useState(null);
    const [assetQuantity, setAssetQuantity] = useState("");
    const [loading, setLoading] = useState(false);
    const [assetsinStore, setAssetsinStore] = useRecoilState(portfolioassetsinstore);
    const navigation = useNavigation();
    const addnewAsset = async () => {
        const newAsset = {
            id: selectedCoinData?.id,
            uniqueid: selectedCoinData?.id + uuid.v4(),
            name: selectedCoinData?.name,
            image: selectedCoinData?.image?.small,
            symbol: selectedCoinData?.symbol.toUpperCase(),
            price: selectedCoinData?.market_data?.current_price?.usd,
            quantity: parseFloat(assetQuantity)
        };
        const newAssets = [...assetsinStore, newAsset];
        const jsonData = JSON.stringify(newAssets);
        await AsyncStorage.setItem("@portfolio_crypto", jsonData);
        setAssetsinStore(newAssets);
        navigation.goBack();
    };
    const fetchCoins = async () => {
        if (loading) {
            return;
        }
        setLoading(true);
        const coins = await getCoins();
        setCoins(coins);
        setLoading(false);
    };
    const fetchCoinData = async () => {
        if (loading) {
            return;
        }
        setLoading(true);
        const coinData = await getCryptoData(selectedCoin);
        setSelectedCoinData(coinData);
        setLoading(false);
    };
    useEffect(() => {
        fetchCoins();
    }, []);
    useEffect(() => {
        if (selectedCoin) {
            fetchCoinData();
        }
    }, [selectedCoin]);
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} keyboardVerticalOffset={80} behavior={Platform.OS === "ios" ? "padding" : "height"} >
            <View style={styles.headerContainer}>
                <Ionicons name="chevron-back-sharp" size={25} color="white" onPress={() => navigation.goBack()} style={{ marginLeft: 10 }} />
                <Text style={styles.headerText}>Add New Asset</Text>
            </View>
            <SearchableDropdown containerStyle={styles.dropdownContainer}
                itemStyle={styles.dropdownitemContainer}
                itemTextStyle={{ color: "white" }}
                items={coins}
                onItemSelect={(item) => setSelectedCoin(item.id)}
                resetValue={false}
                placeholder={selectedCoin || "Select a crypto coin"}
                placeholderTextColor="white"
                textInputProps={{
                    underlineColorAndroid: "transparent",
                    style: styles.textInputStyle
                }} />
            {selectedCoinData && (
                <>
                    <View style={styles.quantityContainer}>
                        <View style={
                            {
                                flexDirection: "row"
                            }
                        }>
                            <TextInput value={assetQuantity} placeholder="0" placeholderTextColor="#1e1e1e"
                                keyboardType="numeric"
                                style={{ fontSize: 90, color: "white" }}
                                onChangeText={setAssetQuantity} />
                            <Text style={styles.symbolStyle}>{selectedCoinData?.symbol.toUpperCase()}</Text>
                        </View>
                        <Text style={styles.priceStyle}>{selectedCoinData?.market_data?.current_price?.usd} per coin</Text>
                    </View>
                    <Pressable style={[styles.buttonContainer, { backgroundColor: assetQuantity === "" ? "#303030" : "#4169e1" }]}
                        onPress={addnewAsset} disabled={assetQuantity === ""} >
                        <Text style={[styles.buttonText, { color: assetQuantity === "" ? "grey" : "white" }]}>Add New Asset</Text>
                    </Pressable>
                </>
            )}
        </KeyboardAvoidingView>
    );
}

export default AddAssetScreen;

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    headerText: {
        marginLeft: "28%",
        fontSize: 16,
        fontWeight: "bold",
        color: "white"
    },
    dropdownContainer: {
        paddingHorizontal: 10,
        paddingVertical: 20,
        width: "100%"
    },
    dropdownitemContainer: {
        padding: 10,
        marginTop: 2,
        backgroundColor: "#1e1e1e",
        borderWidth: 1,
        borderColor: "#444444",
        borderRadius: 5
    },
    textInputStyle: {
        padding: 12,
        backgroundColor: "#1e1e1e",
        color: "white",
        borderWidth: 1.5,
        borderColor: "#444444",
        borderRadius: 5
    },
    quantityContainer: {
        flex: 1,
        marginTop: 50,
        alignItems: "center"
    },
    symbolStyle: {
        marginTop: 25,
        marginLeft: 5,
        fontSize: 20,
        fontWeight: "700",
        color: "grey"
    },
    buttonContainer: {
        padding: 10,
        marginVertical: 25,
        marginHorizontal: 10,
        alignItems: "center",
        borderRadius: 5
    },
    buttonText: {
        fontSize: 17,
        fontWeight: "600"
    },
    priceStyle: {
        fontSize: 17,
        fontWeight: "600",
        color: "grey"
    }
});