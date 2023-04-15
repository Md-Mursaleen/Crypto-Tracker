import { View, Text, FlatList, RefreshControl, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useWatchlist } from "../../src/contexts/WatchlistContext";
import CryptoItem from "../components/CryptoItem";
import { getWatchlistedCrypto } from "../services/requests"

const WatchlistScreen = () => {
    const { cryptoId } = useWatchlist();
    const [cryptoCurrency, setCryptoCurrency] = useState([]);
    const [loading, setLoading] = useState(false);
    const formattedId = () => cryptoId.join("%2C");
    const fetchWatchlistedCrypto = async () => {
        if (loading) {
            return;
        }
        setLoading(true);
        const watchlistedCrypto = await getWatchlistedCrypto(1, formattedId());
        setCryptoCurrency(watchlistedCrypto);
        setLoading(false);
    };
    useEffect(() => {
        if (cryptoId.length > 0) {
            fetchWatchlistedCrypto();
        }
    }, [cryptoId]);
    return (
        <View style={
            {
                marginBottom: 28
            }
        }>
            <View style={styles.container}>
                <Text style={[styles.textStyle, { marginLeft: 10, fontSize: 18 }]}>Crypto Watchlist</Text>
            </View>
            <FlatList data={cryptoCurrency} renderItem={({ item }) => (
                <CryptoItem cryptodata={item} />
            )} refreshControl={
                <RefreshControl refreshing={loading}
                    tintColor="white"
                    onRefresh={cryptoId.length > 0 ? fetchWatchlistedCrypto : null} />
            } />
        </View>
    );
}

export default WatchlistScreen;

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