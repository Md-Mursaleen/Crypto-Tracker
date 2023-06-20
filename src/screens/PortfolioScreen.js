import React from "react";
import { StyleSheet, View } from "react-native";
import PortfolioAssets from "../components/PortfolioAssets";

const PortfolioScreen = () => {
    return (
        <View style={styles.container}>
            <PortfolioAssets />
        </View>
    );
}

export default PortfolioScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50
    }
});