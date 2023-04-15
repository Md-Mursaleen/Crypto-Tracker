import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import CryptoItem from "../components/CryptoItem";
import { getCryptoCoinData } from "../services/requests";

const CryptoHomeScreen = () => {
    const [cryptoCoin, setCryptoCoin] = useState([]);
    const [loading, setLoading] = useState(false);
    const fetchCryptoCoin = async (pagenumber) => {
        if (loading) {
            return;
        }
        setLoading(true);
        const fetchedCryptoCoin = await getCryptoCoinData(pagenumber);
        setCryptoCoin(fetchedCryptoCoin);
        setLoading(false);
    };
    useEffect(() => {
        fetchCryptoCoin();
    }, []);
    return (
        <View style={
            {
                marginBottom: 28
            }
        }>
            <View style={styles.container}>
                <Text style={[styles.textStyle, { marginLeft: 10, fontSize: 18 }]}>Crypto Assets</Text>
            </View>
            <FlatList data={cryptoCoin} renderItem={({ item }) => (
                <CryptoItem cryptodata={item} />
            )} />
        </View>
    );
}

export default CryptoHomeScreen;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingBottom: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    textStyle: {
        fontSize: 15,
        fontWeight: "500",
        color: "white"
    }
});