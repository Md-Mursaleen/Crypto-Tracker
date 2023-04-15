import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CryptoDetailsScreen from "../screens/CryptoDetailsScreen";
import BottomTabNavigation from "./BottomTabNavigation";
import AddAssetScreen from "../screens/AddAssetScreen";

const Stack = createStackNavigator();

const RootNavigation = () => {
    return (
        <NavigationContainer theme={
            {
                colors: {
                    background: "#121212"
                }
            }
        }>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="BottomTab" >
                <Stack.Screen name="BottomTab" component={BottomTabNavigation} />
                <Stack.Screen name="Details" component={CryptoDetailsScreen} />
                <Stack.Screen name="Asset" component={AddAssetScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default RootNavigation;