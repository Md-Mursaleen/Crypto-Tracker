import { Text, View, StyleSheet, Image } from "react-native";
import React from "react";
import AntDesign from "react-native-vector-icons/AntDesign";

const PortfolioAssetItem = ({ assetitem }) => {
    const { name, symbol, image, price, current_price, quantity, price_change_percentage_24h } = assetitem;
    const pricePercentage = price_change_percentage_24h < 0 ? "#ea3943" : "#16c784";
    return (
        <View style={styles.container}>
            <Image source={{ uri: image }} style={styles.imageStyle} />
            <View>
                <Text style={styles.titleStyle}>{name}</Text>
                <Text style={styles.symbolStyle}>{symbol}</Text>
            </View>
            <View style={styles.priceContainer}>
                <Text style={styles.titleStyle}>${current_price}</Text>
                <View style={styles.percentageChangeContainer}>
                    <AntDesign name={price_change_percentage_24h > 0 ? "caretup" : "caretdown"} color={pricePercentage} style={
                        {
                            marginRight: 5,
                            alignSelf: "center"
                        }
                    } />
                    <Text style={{ fontWeight: "600", color: pricePercentage }}>{price_change_percentage_24h.toFixed(2)}%</Text>
                </View>
            </View>
            <View style={styles.quantityContainer}>
                <Text style={styles.titleStyle}>${(quantity * current_price).toFixed(2)}</Text>
                <Text style={styles.symbolStyle}>{quantity} {symbol}</Text>
            </View>
        </View>
    );
}

export default PortfolioAssetItem;

const styles = StyleSheet.create({
    container: {
        padding: 15,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#121212"
    },
    imageStyle: {
        marginRight: 10,
        width: 30,
        height: 30
    },
    titleStyle: {
        fontSize: 16,
        fontWeight: "bold",
        alignSelf: "flex-end",
        color: "white"
    },
    symbolStyle: {
        fontWeight: "700",
        color: "grey"
    },
    priceContainer: {
        marginLeft: "auto",
        alignItems: "flex-end"
    },
    percentageChangeContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    quantityContainer: {
        marginLeft: "auto",
        alignItems: "flex-end"
    }
});