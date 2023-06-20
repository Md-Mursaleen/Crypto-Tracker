import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CryptoHomeScreen from "../screens/CryptoHomeScreen";
import WatchlistScreen from "../screens/WatchlistScreen";
import PortfolioScreen from "../screens/PortfolioScreen";
import ProfileScreen from "../screens/ProfileScreen";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const BottomTab = createBottomTabNavigator();

const BottomTabNavigation = () => {
    return (
        <BottomTab.Navigator screenOptions={
            {
                headerShown: false,
                tabBarStyle: styles.tabBarStyle,
                tabBarActiveTintColor: "#5e80fc",
                tabBarInactiveTintColor: "#708090"
            }
        }>
            <BottomTab.Screen name="Markets" component={CryptoHomeScreen} options={
                {
                    tabBarLabelStyle: styles.tabBarLabelStyle,
                    tabBarIcon: ({ color }) => <FontAwesome5 name="bitcoin" size={22} color={color} />
                }
            } />
            <BottomTab.Screen name="Portfolio" component={PortfolioScreen} options={
                {
                    tabBarLabelStyle: styles.tabBarLabelStyle,
                    tabBarIcon: ({ color }) => <Feather name="pie-chart" size={22} color={color} />
                }
            } />
            <BottomTab.Screen name="Watchlist" component={WatchlistScreen} options={
                {
                    tabBarLabelStyle: styles.tabBarLabelStyle,
                    tabBarIcon: ({ color }) => <FontAwesome5 name="star" size={20} color={color} />
                }
            } />
            <BottomTab.Screen name="Profile" component={ProfileScreen} options={
                {
                    tabBarLabelStyle: styles.tabBarLabelStyle,
                    tabBarIcon: ({ color }) => <FontAwesome name="user-circle-o" size={24} color={color} />
                }
            } />
        </BottomTab.Navigator>
    );
}

export default BottomTabNavigation;

const styles = StyleSheet.create({
    tabBarStyle: {
        height: 55,
        backgroundColor: "#0e0e0e"
    },
    tabBarLabelStyle: {
        paddingBottom: 6,
        fontSize: 11.5,
        fontWeight: "600"
    }
});