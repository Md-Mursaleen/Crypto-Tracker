import { useNavigation } from "@react-navigation/native";
import { Image, Text, StyleSheet, View, Pressable } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

const CryptoItem = ({ cryptodata }) => {
    const { id, name, symbol, image, current_price, market_cap_rank, market_cap, price_change_percentage_24h } = cryptodata;
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
    const pricePercentageBackground = price_change_percentage_24h < 0 ? "#ea394360" : "#16c78460";
    return (
        <Pressable style={styles.cryptoContainer} onPress={() => navigation.navigate("Details", {
            cryptoid: id
        })} >
            <Image source={{ uri: image }} style={
                {
                    marginRight: 10,
                    height: 30,
                    width: 30
                }
            } />
            <View>
                <Text style={styles.title}>{name}</Text>
                <View style={
                    {
                        flexDirection: "row",
                        alignItems: "center"
                    }
                }>
                    <View style={[styles.positionContainer, market_cap_rank >= 100 && { width: 39, height: 30 }]}>
                        <Text style={styles.position}>#{market_cap_rank}</Text>
                    </View>
                    <Text style={styles.text}>{symbol?.toUpperCase()}</Text>
                    <View style={[styles.pricePercentageContainer, { backgroundColor: pricePercentageBackground }]}>
                        <AntDesign name={price_change_percentage_24h > 0 ? "caretup" : "caretdown"} color={pricePercentage} style={
                            {
                                marginRight: 5,
                                alignSelf: "center"
                            }
                        } />
                        <Text style={{ color: pricePercentage }}>{price_change_percentage_24h?.toFixed(2)}%</Text>
                    </View>
                </View>
            </View>
            <View style={
                {
                    marginLeft: "auto",
                    alignItems: "flex-end"
                }
            }>
                <Text style={styles.title}>${current_price}</Text>
                <Text style={{ color: "white" }}>MCap {cryptoMarketcap(market_cap)}</Text>
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
        borderBottomColor: "#282828"
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
        fontSize: 16,
        fontWeight: "bold",
        color: "white"
    },
    text: {
        marginRight: 5,
        color: "white"
    },
    position: {
        fontWeight: "bold",
        color: "white"
    }
});