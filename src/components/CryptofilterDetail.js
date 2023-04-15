import { Text, StyleSheet, Pressable } from "react-native";
import React from "react";

const CryptofilterDetail = (props) => {
    const { day, value, selectedText, setSelectedText } = props;
    return (
        <Pressable style={[styles.container, selectedText === day && { backgroundColor: "#1e1e1e" }]}
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