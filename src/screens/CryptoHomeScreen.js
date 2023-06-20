import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, RefreshControl } from "react-native";
import CryptoItem from "../components/CryptoItem";
import AntDesign from "react-native-vector-icons/AntDesign";
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
    const refetchCryptoCoin = async () => {
        if (loading) {
            return;
        }
        setLoading(true);
        const fetchedCryptoCoin = await getCryptoCoinData();
        setCryptoCoin(fetchedCryptoCoin);
        setLoading(false);
    };
    useEffect(() => {
        fetchCryptoCoin();
    }, []);
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.textStyle}>Markets</Text>
            </View>
            <View style={styles.headerSubContainer}>
                <View style={styles.headerItemContainer}>
                    <Text style={[styles.headerTextStyle, { fontSize: 15 }]}>#</Text>
                    <AntDesign name="caretdown" color="#5e80fc" size={12} />
                </View>
                <View style={styles.headerItemContainer}>
                    <Text style={styles.headerTextStyle}>Market Cap</Text>
                    <AntDesign name="caretdown" color="#b2bbc3" size={12} style={{ marginRight: 20 }} />
                </View>
                <View style={styles.headerItemContainer}>
                    <Text style={styles.headerTextStyle}>Price(USD)</Text>
                    <AntDesign name="caretdown" color="#b2bbc3" size={12} style={{ marginRight: 10 }} />
                </View>
                <View style={styles.headerItemContainer}>
                    <Text style={styles.headerTextStyle}>24h%</Text>
                    <AntDesign name="caretdown" color="#b2bbc3" size={12} style={{ marginRight: 8 }} />
                </View>
            </View>
            <FlatList data={cryptoCoin} renderItem={({ item }) => (
                <CryptoItem cryptodata={item} />
            )}
                refreshControl={
                    <RefreshControl refreshing={loading} tintColor="white" onRefresh={refetchCryptoCoin} />
                } style={{ marginTop: 8 }} />
        </View>
    );
}

export default CryptoHomeScreen;

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        marginBottom: 70
    },
    headerContainer: {
        paddingHorizontal: 10,
        paddingBottom: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    headerSubContainer: {
        marginTop: 10,
        marginHorizontal: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    headerItemContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    headerTextStyle: {
        marginRight: 5,
        fontSize: 13.5,
        fontWeight: "500",
        color: "#bdc5cc"
    },
    textStyle: {
        marginLeft: 10,
        fontSize: 23,
        fontWeight: "bold",
        color: "white"
    }
});