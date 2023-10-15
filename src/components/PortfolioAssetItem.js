import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

const PortfolioAssetItem = ({ assetitem }) => {
    const { name, symbol, image, current_price, quantity, price_change_percentage_24h } = assetitem;
    const pricePercentage = price_change_percentage_24h < 0 ? "#ea3943" : "#16c784";
    return (
        <View style={styles.container}>
            <Image source={{ uri: image }} style={styles.imageStyle} />
            <View>
                <Text style={styles.titleTextStyle}>{name}</Text>
                <Text style={styles.symbolTextStyle}>{symbol}</Text>
            </View>
            <View style={styles.priceContainer}>
                <Text style={styles.titleTextStyle}>${current_price}</Text>
                <View style={styles.percentageChangeContainer}>
                    <AntDesign name={price_change_percentage_24h > 0 ? "caretup" : "caretdown"} color={pricePercentage} style={styles.iconContainer} />
                    <Text style={{ fontWeight: "600", color: pricePercentage }}>{price_change_percentage_24h?.toFixed(2)}%</Text>
                </View>
            </View>
            <View style={styles.quantityContainer}>
                <Text style={styles.titleTextStyle}>${(quantity * current_price)?.toFixed(2)}</Text>
                <Text style={styles.symbolTextStyle}>{quantity} {symbol}</Text>
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
        backgroundColor: "#000102"
    },
    imageStyle: {
        marginRight: 10,
        width: 27,
        height: 27
    },
    titleTextStyle: {
        fontSize: 15,
        fontWeight: "600",
        alignSelf: "flex-end",
        color: "white"
    },
    symbolTextStyle: {
        fontSize: 13.5,
        fontWeight: "500",
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
    iconContainer: {
        marginRight: 5,
        alignSelf: "center"
    },
    quantityContainer: {
        marginLeft: "auto",
        alignItems: "flex-end"
    }
});