import React, { createContext, useEffect, useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const watchlistContext = createContext();
export const useWatchlist = () => useContext(watchlistContext);

const WatchlistContext = ({ children }) => {
    const [cryptoId, setCryptoId] = useState([]);
    const getWatchlistData = async () => {
        try {
            const jsonData = await AsyncStorage.getItem("@watchlist_crypto");
            setCryptoId(jsonData !== null ? JSON.parse(jsonData) : []);
        } catch (e) {
            console.log(e);
        }
    };
    useEffect(() => {
        getWatchlistData();
    }, []);
    const storeWatchlistData = async (cryptoid) => {
        try {
            const newWatchlist = [...cryptoId, cryptoid];
            const jsonData = JSON.stringify(newWatchlist);
            await AsyncStorage.setItem("@watchlist_crypto", jsonData);
            setCryptoId(newWatchlist);
        } catch (e) {
            console.log(e);
        }
    };
    const removeWatchlistData = async (cryptoid) => {
        try {
            const newWatchlist = cryptoId.filter((cryptoIdValue) => cryptoIdValue !== cryptoid);
            const jsonData = JSON.stringify(newWatchlist);
            await AsyncStorage.setItem("@watchlist_crypto", jsonData);
            setCryptoId(newWatchlist);
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <watchlistContext.Provider value={{ cryptoId, storeWatchlistData, removeWatchlistData }}>
            {children}
        </watchlistContext.Provider>
    );
}

export default WatchlistContext;