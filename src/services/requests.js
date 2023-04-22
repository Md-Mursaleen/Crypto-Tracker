import axios from "axios";

export const getCryptoData = async (cryptoid) => {
    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${cryptoid}?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=false`);
        return response.data;
    } catch (e) {
        console.log(e);
    }
};

export const getChartData = async (cryptoid, selectedValue) => {
    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${cryptoid}/market_chart?vs_currency=usd&days=${selectedValue}&interval=hourly`);
        return response.data;

    } catch (e) {
        console.log(e);
    }
};

export const getCryptoCoinData = async (pagenumber = 1) => {
    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=${pagenumber}&sparkline=false&price_change_percentage=24h&locale=en`);
        return response.data;
    } catch (e) {
        console.log(e);
    }
};
export const getWatchlistedCrypto = async (pagenumber = 1, cryptoids) => {
    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${cryptoids}&order=market_cap_desc&per_page=50&page=${pagenumber}&sparkline=false&price_change_percentage=24h&locale=en`);
        return response.data;
    } catch (e) {
        console.log(e);
    }
};
export const getCandleChartData = async (days = 1, cryptoid) => {
    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${cryptoid}/ohlc?vs_currency=usd&days=${days}`);
        return response.data;
    } catch (e) {
        console.log(e);
    }
};
export const getCoins = async () => {
    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/list?include_platform=false`)
        return response.data;
    } catch (e) {
        console.error(e);
    }
};