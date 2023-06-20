import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";

const CryptofilterDetail = (props) => {
    const { day, value, selectedText, setSelectedText } = props;
    return (
        <Pressable style={[styles.container, selectedText === day && { backgroundColor: "black" }]}
            onPress={() => setSelectedText(day)}>
            <Text style={{ color: selectedText === day ? "white" : "grey" }}>{value}</Text>
        </Pressable>
    );
}

export default CryptofilterDetail;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: "transparent",
        borderRadius: 5
    }
});