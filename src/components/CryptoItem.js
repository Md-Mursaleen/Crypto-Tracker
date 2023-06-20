import React from "react";
import { Image, Text, StyleSheet, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";

const CryptoItem = ({ cryptodata }) => {
    const { id, symbol, image, current_price, market_cap_rank, market_cap, price_change_percentage_24h } = cryptodata;
    const navigation = useNavigation();
    const cryptoMarketcap = (market_cap) => {
        if (market_cap > 1e12) {
            return `${(market_cap / 1e12).toFixed(3)} Tn`;
        }
        if (market_cap > 1e9) {
            return `${(market_cap / 1e9).toFixed(3)} Bn`;
        }
        if (market_cap > 1e6) {
            return `${(market_cap / 1e6).toFixed(3)} Mn`;
        }
        if (market_cap > 1e3) {
            return `${(market_cap / 1e3).toFixed(3)} K`;
        }
        return market_cap;
    };
    const pricePercentage = price_change_percentage_24h < 0 ? "#ea3943" : "#16c784";
    const pricePercentageBackground = price_change_percentage_24h < 0 ? "#ea394320" : "#16c78420";
    return (
        <Pressable style={styles.cryptoContainer} onPress={() => navigation.navigate("Details", {
            cryptoid: id
        })} >
            <Text style={styles.position}>{market_cap_rank}</Text>
            <Image source={{ uri: image }} style={styles.imageStyle} />
            <View>
                <Text style={styles.text}>{symbol?.toUpperCase()}</Text>
                <Text style={styles.marketCapStyle}>{cryptoMarketcap(market_cap)}</Text>
            </View>
            <View style={{ marginLeft: "auto" }}>
                <Text style={styles.title}>${current_price === 1 ? "1.00" : current_price}</Text>
            </View>
            <View style={styles.priceChangeContainer}>
                <View style={[styles.pricePercentageContainer, { backgroundColor: pricePercentageBackground }]}>
                    <AntDesign name={price_change_percentage_24h > 0 ? "caretup" : "caretdown"} color={pricePercentage} size={10} style={styles.iconStyle} />
                    <Text style={[styles.priceChangeText, { color: pricePercentage }]}>{price_change_percentage_24h?.toFixed(2)}%</Text>
                </View>
            </View>
        </Pressable>
    );
}

export default CryptoItem;

const styles = StyleSheet.create({
    cryptoContainer: {
        padding: 15,
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "#323232"
    },
    positionContainer: {
        marginRight: 5,
        width: 28,
        height: 24,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#585858",
        borderRadius: 5
    },
    pricePercentageContainer: {
        width: 65,
        height: 26,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10
    },
    title: {
        marginBottom: 3,
        fontSize: 14.5,
        fontWeight: "500",
        color: "#8694a1"
    },
    text: {
        marginRight: 5,
        fontWeight: "bold",
        color: "white"
    },
    position: {
        fontSize: 14.5,
        fontWeight: "bold",
        color: "#b2bbc3"
    },
    imageStyle: {
        marginLeft: 30,
        marginRight: 10,
        height: 27,
        width: 27
    },
    marketCapStyle: {
        fontSize: 13,
        fontWeight: "500",
        color: "#8694a1"
    },
    priceChangeContainer: {
        marginLeft: "auto",
        alignItems: "flex-end"
    },
    priceChangeText: {
        fontSize: 13,
        fontWeight: "500"
    },
    iconStyle: {
        marginRight: 5,
        alignSelf: "center"
    }
});