import React, { useEffect, useState } from "react";
import { View, Text, FlatList, RefreshControl, StyleSheet, Pressable } from "react-native";
import CryptoItem from "../components/CryptoItem";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useWatchlist } from "../../src/contexts/WatchlistContext";
import { getWatchlistedCrypto } from "../services/requests"
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";

const WatchlistScreen = () => {
    const navigation = useNavigation();
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
    console.log(cryptoId.length)
    return (
        cryptoId.length === 0 ? (
            <>
                <View style={styles.container}>
                    <Text style={styles.textStyle}>Watchlists</Text>
                </View>
                <LottieView source={require("../../assets/animations/watchlist-animation.json")}
                    autoPlay
                    speed={0.8}
                    loop={true}
                    style={styles.lottieStyle} />
                <View>
                    <Text style={styles.headerTitle}>Your watchlist is empty</Text>
                    <Text style={[styles.headerSubTitle, { marginTop: 20 }]}>Start building your watchlist by clicking</Text>
                    <Text style={[styles.headerSubTitle, { marginTop: 5 }]}>button below.</Text>
                </View>
                < Pressable style={[styles.buttonContainer, cryptoCurrency.length === 0 && { marginTop: 180 }]}
                    onPress={() => navigation.navigate("Markets")}>
                    <Text style={styles.buttonText}>Add New Coins</Text>
                </Pressable >
            </>
        ) : (
            <View style={{ marginBottom: 70 }}>
                <View style={styles.container}>
                    <Text style={styles.textStyle}>Watchlists</Text>
                </View>
                <View style={styles.headerContainer}>
                    <View style={styles.headerItemContainer}>
                        <Text style={[styles.headerTextStyle, { fontSize: 15 }]}>#</Text>
                        <AntDesign name="caretdown" color="#5e80fc" size={12} />
                    </View>
                    <View style={styles.headerItemContainer}>
                        <Text style={styles.headerTextStyle}>Market Cap</Text>
                        <AntDesign name="caretdown" color="#b2bbc3" size={12} />
                    </View>
                    <View style={styles.headerItemContainer}>
                        <Text style={styles.headerTextStyle}>Price(USD)</Text>
                        <AntDesign name="caretdown" color="#b2bbc3" size={12} />
                    </View>
                    <View style={styles.headerItemContainer}>
                        <Text style={styles.headerTextStyle}>24h%</Text>
                        <AntDesign name="caretdown" color="#b2bbc3" size={12} />
                    </View>
                </View>
                <FlatList data={cryptoCurrency} renderItem={({ item }) => (
                    <CryptoItem cryptodata={item} />
                )} refreshControl={
                    <RefreshControl refreshing={loading}
                        tintColor="white"
                        onRefresh={cryptoId.length > 0 ? fetchWatchlistedCrypto : null} />
                } style={{ marginTop: 8 }} />
            </View>
        )
    );
}

export default WatchlistScreen;

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        paddingHorizontal: 10,
        paddingBottom: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    headerContainer: {
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
    },
    lottieStyle: {
        marginTop: 60,
        width: 100,
        height: 185,
        alignSelf: "center"
    },
    headerTitle: {
        marginTop: 75,
        fontSize: 27,
        fontWeight: "bold",
        alignSelf: "center",
        color: "white"
    },
    headerSubTitle: {
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
    }
});