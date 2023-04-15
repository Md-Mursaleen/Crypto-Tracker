import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CryptoHomeScreen from "../screens/CryptoHomeScreen";
import WatchlistScreen from "../screens/WatchlistScreen";
import ProfileScreen from "../screens/ProfileScreen";
import PortfolioScreen from "../screens/PortfolioScreen";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const BottomTab = createBottomTabNavigator();

const BottomTabNavigation = () => {
    return (
        <BottomTab.Navigator screenOptions={
            {
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: "#181818"
                },
                tabBarActiveTintColor: "white",
                tabBarInactiveTintColor: "grey"
            }
        }>
            <BottomTab.Screen name="Crypto Coins" component={CryptoHomeScreen} options={
                {
                    tabBarIcon: ({ size, color }) => (<FontAwesome5 name="bitcoin" size={26} color={color} />)
                }
            } />
            <BottomTab.Screen name="Portfolio" component={PortfolioScreen} options={
                {
                    tabBarIcon: ({ size, color }) => (<Feather name="pie-chart" size={size} color={color} />)
                }
            } />
            <BottomTab.Screen name="Watchlist" component={WatchlistScreen} options={
                {
                    tabBarIcon: ({ size, color }) => (<FontAwesome5 name="star" size={23} color={color} />)
                }
            } />
            <BottomTab.Screen name="Profile" component={ProfileScreen} options={
                {
                    tabBarIcon: ({ size, color }) => (<MaterialCommunityIcons name="account-circle-outline" size={30} color={color} />)
                }
            } />
        </BottomTab.Navigator>
    );
}

export default BottomTabNavigation;