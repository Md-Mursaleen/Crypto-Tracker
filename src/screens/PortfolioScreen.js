import { View } from "react-native";
import React from "react";
import PortfolioAssets from "../components/PortfolioAssets";

const PortfolioScreen = () => {
    return (
        <View style={{ flex: 1 }}>
            <PortfolioAssets />
        </View>
    );
}

export default PortfolioScreen;