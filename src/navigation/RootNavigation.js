import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CryptoDetailsScreen from "../screens/CryptoDetailsScreen";
import AddAssetScreen from "../screens/AddAssetScreen";
import LoginScreen from "../screens/LoginScreen";
import BottomTabNavigation from "./BottomTabNavigation";

const Stack = createStackNavigator();

const RootNavigation = () => {
    return (
        <NavigationContainer theme={
            {
                colors: {
                    background: "#000102"
                }
            }
        }>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login" >
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="BottomTab" component={BottomTabNavigation} />
                <Stack.Screen name="Details" component={CryptoDetailsScreen} />
                <Stack.Screen name="Asset" component={AddAssetScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default RootNavigation;