import { View, Text, Image, StyleSheet, Dimensions, TextInput, ActivityIndicator, KeyboardAvoidingView } from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { LineChart } from "react-native-wagmi-charts";
import { CandlestickChart } from "react-native-wagmi-charts";
import { useNavigation } from "@react-navigation/native";
import { getCryptoData, getChartData, getCandleChartData } from "../services/requests";
import { useWatchlist } from "../../src/contexts/WatchlistContext";
import CryptofilterDetail from "../components/CryptofilterDetail";

const CryptoDetailsScreen = ({ route }) => {
    const { cryptoId, storeWatchlistData, removeWatchlistData } = useWatchlist();
    const { cryptoid } = route.params;
    const [cryptoCoin, setCryptoCoin] = useState(null);
    const [chartData, setChartData] = useState(null);
    const [candlechartData, setCandlechartData] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const SIZE = Dimensions.get("window").width;
    const [cryptoValue, setCryptoValue] = useState("1");
    const [usdValue, setUsdValue] = useState("");
    const [selectedText, setSelectedText] = useState("1");
    const [candleChartVisible, setCandleChartVisible] = useState(false);
    const fetchData = async () => {
        setLoading(true);
        const fetchedData = await getCryptoData(cryptoid);
        setCryptoCoin(fetchedData);
        setUsdValue(fetchedData?.market_data?.current_price?.usd.toString());
        setLoading(false);
    };
    const fetchChartData = async (selectedText) => {
        const fetchedChartData = await getChartData(cryptoid, selectedText);
        setChartData(fetchedChartData);
    };
    const fetchCandleChartData = async (selectedText) => {
        const fetchedCandleChartData = await getCandleChartData(selectedText, cryptoid);
        setCandlechartData(fetchedCandleChartData);
    };
    useEffect(() => {
        fetchData();
        fetchChartData(1);
        fetchCandleChartData();
    }, []);
    if (loading || !cryptoCoin || !chartData || !candlechartData) {
        return <ActivityIndicator size="large" />
    }
    const { id, name, symbol, image, market_data: { current_price: { usd }, market_cap_rank, price_change_percentage_24h } } = cryptoCoin;
    const { prices } = chartData;
    const pricePercentage = price_change_percentage_24h < 0 ? "#ea3943" : "#16c784";
    const formatPrice = ({ value }) => {
        "worklet";
        if (value === "") {
            if (usd < 1) {
                return `$${usd}`;
            }
            return `$${usd.toFixed(2)}`;
        }
        if (usd < 1) {
            return `$${parseFloat(value)}`;
        }
        return `$${parseFloat(value).toFixed(2)}`;
    };
    const changingCryptoValue = (value) => {
        setCryptoValue(value);
        const cryptoAmount = parseFloat(value.replace(",", ".")) || 0;
        setUsdValue((cryptoAmount * usd).toString());
    };
    const changingUsdValue = (value) => {
        setUsdValue(value);
        const usdAmount = parseFloat(value.replace(",", ".")) || 0;
        setCryptoValue((usdAmount / usd).toString());
    };
    const cryptoinWatchlist = () =>
        cryptoId.some((cryptoIdValue) => cryptoIdValue === id);

    const checkWatchlistData = () => {
        if (cryptoinWatchlist()) {
            return removeWatchlistData(id);
        }
        return storeWatchlistData(id);
    };
    const onChangeValue = (value) => {
        setSelectedText(value);
        fetchChartData(value);
        fetchCandleChartData(value);
    };
    const filterValues = [
        {
            day: "1",
            value: "24h"
        },
        {
            day: "7",
            value: "7d"
        },
        {
            day: "14",
            value: "14d"
        },
        {
            day: "30",
            value: "30d"
        },
        {
            day: "max",
            value: "All"
        }
    ];
    return (
        <KeyboardAvoidingView style={styles.container}>
            <LineChart.Provider data={prices.map(([timestamp, value]) => ({ timestamp, value }))}>
                <View style={styles.headerContainer}>
                    <Ionicons name="chevron-back-sharp" size={25} color="white" onPress={() => navigation.goBack()} />
                    <View style={styles.infoContainer}>
                        <Image source={{ uri: image.small }} style={
                            {
                                width: 25,
                                height: 25
                            }
                        } />
                        <Text style={styles.text}>{symbol.toUpperCase()}</Text>
                        <View style={[styles.positionContainer, market_cap_rank >= 100 && { width: 39, height: 30 }]}>
                            <Text style={styles.positionText}>#{market_cap_rank}</Text>
                        </View>
                    </View>
                    <FontAwesome name={cryptoinWatchlist() ? "star" : "star-o"} size={25} color={cryptoinWatchlist() ? "#FFBF00" : "white"}
                        onPress={() => checkWatchlistData()} />
                </View>
                <View style={styles.cryptoInfoContainer}>
                    <View>
                        <Text style={styles.title}>{name}</Text>
                        <LineChart.PriceText
                            format={formatPrice}
                            style={styles.priceText} />
                    </View>
                    <View style={[styles.percentageContainer, { backgroundColor: pricePercentage }]}>
                        <AntDesign name={price_change_percentage_24h > 0 ? "caretup" : "caretdown"} color="white" style={
                            {
                                marginRight: 5,
                                alignSelf: "center"
                            }
                        } />
                        <Text style={styles.percentageText}>{price_change_percentage_24h?.toFixed(2)}%</Text>
                    </View>
                </View>
                <View style={styles.filterContainer}>
                    {filterValues.map((data, index) => (
                        <CryptofilterDetail key={index} day={data.day} value={data.value} selectedText={selectedText} setSelectedText={onChangeValue} />
                    ))}
                    {candleChartVisible ? (<MaterialIcons name="show-chart" size={24} color="#16c784" onPress={() => setCandleChartVisible(false)} />) : (<MaterialIcons name="waterfall-chart" size={24} color="#16c784" onPress={() => setCandleChartVisible(true)} />)}
                </View>
                {candleChartVisible ? (
                    <CandlestickChart.Provider data={candlechartData.map(([timestamp, open, high, low, close]) => ({ timestamp, open, high, low, close }))}>
                        <CandlestickChart height={SIZE / 2} width={SIZE} >
                            <CandlestickChart.Candles />
                            <CandlestickChart.Crosshair>
                                <CandlestickChart.Tooltip />
                            </CandlestickChart.Crosshair>
                        </CandlestickChart>
                        <View style={styles.candlechartContainer}>
                            <View>
                                <Text style={styles.candleText}>Open</Text>
                                <CandlestickChart.PriceText style={styles.candlechartText} type="open" />
                            </View>
                            <View>
                                <Text style={styles.candleText}>High</Text>
                                <CandlestickChart.PriceText style={styles.candlechartText} type="high" />
                            </View>
                            <View>
                                <Text style={styles.candleText}>Low</Text>
                                <CandlestickChart.PriceText style={styles.candlechartText} type="low" />
                            </View>
                            <View>
                                <Text style={styles.candleText}>Close</Text>
                                <CandlestickChart.PriceText style={styles.candlechartText} type="close" />
                            </View>
                        </View>
                        <CandlestickChart.DatetimeText style={{ margin: 10, fontWeight: "700", color: "white" }} />
                    </CandlestickChart.Provider>
                ) : (
                    <LineChart height={SIZE / 2} width={SIZE}>
                        <LineChart.Path color={usd > prices[0][1] ? "#16c784" : "#ea3943"}>
                            <LineChart.Gradient color={usd > prices[0][1] ? "#16c784" : "#ea3943"} />
                        </LineChart.Path>
                        <LineChart.CursorCrosshair color={usd > prices[0][1] ? "#16c784" : "#ea3943"} >
                            <LineChart.Tooltip textStyle={{ fontSize: 15, fontWeight: "bold", color: "white" }} />
                            <LineChart.Tooltip position="bottom" >
                                <LineChart.DatetimeText style={{ fontSize: 15, fontWeight: "bold", color: "white" }} />
                            </LineChart.Tooltip>
                        </LineChart.CursorCrosshair>
                    </LineChart>
                )}
                <View style={{ marginTop: 50, flexDirection: "row" }}>
                    <View style={styles.inputContainer}>
                        <Text style={{ color: "grey", alignSelf: "center" }}>{symbol.toUpperCase()}</Text>
                        <View style={styles.inputFieldContainer}>
                            <TextInput style={styles.inputField} value={cryptoValue} keyboardType="numeric" onChangeText={changingCryptoValue} />
                        </View>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={{ color: "grey", alignSelf: "center" }}>USD</Text>
                        <View style={styles.inputFieldContainer}>
                            <TextInput style={styles.inputField} value={usdValue} keyboardType="numeric" onChangeText={changingUsdValue} />
                        </View>
                    </View>
                </View>
            </LineChart.Provider>
        </KeyboardAvoidingView>
    );
}

export default CryptoDetailsScreen;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    text: {
        marginHorizontal: 5,
        fontSize: 17,
        fontWeight: "bold",
        color: "white"
    },
    infoContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    positionText: {
        fontSize: 15,
        fontWeight: "bold",
        color: "white"
    },
    positionContainer: {
        width: 30,
        height: 26,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#585858",
        borderRadius: 5
    },
    title: {
        fontSize: 15,
        color: "white"
    },
    priceText: {
        fontSize: 30,
        fontWeight: "600",
        color: "white"
    },
    cryptoInfoContainer: {
        paddingVertical: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    percentageContainer: {
        paddingHorizontal: 5,
        paddingVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 5
    },
    percentageText: {
        fontSize: 16,
        color: "white"
    },
    inputContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center"
    },
    inputField: {
        flex: 1,
        height: 40,
        margin: 12,
        padding: 10,
        fontSize: 16,
        color: "white",
        borderBottomColor: "white",
        borderBottomWidth: 1
    },
    filterContainer: {
        marginBottom: 20,
        marginVertical: 10,
        paddingVertical: 5,
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "#2B2B2B",
        borderRadius: 5
    },
    candlechartContainer: {
        marginTop: 20,
        marginHorizontal: 10,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    candlechartText: {
        fontWeight: "700",
        color: "white"
    },
    candleText: {
        fontSize: 13,
        color: "grey"
    },
    inputFieldContainer: {
        marginLeft: 10,
        width: 130,
        height: 60,
        backgroundColor: "#1e1e1e",
        borderRadius: 5
    }
});