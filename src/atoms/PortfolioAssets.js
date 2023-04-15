import { atom, selector } from "recoil";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getWatchlistedCrypto } from "../../src/services/requests";

export const portfoliostoredassets = selector({
    key: "portfoliostoredassets",
    get: async () => {
        const jsonData = await AsyncStorage.getItem("@portfolio_crypto");
        return jsonData !== null ? JSON.parse(jsonData) : [];
    }
});
export const portfolioassetsinapi = selector({
    key: "portfolioassetsinapi",
    get: async ({ get }) => {
        const portfolioassets = get(portfolioassetsinstore);
        const portfolioassetsmarketData = await getWatchlistedCrypto(1, portfolioassets.map((portfolioasset) => portfolioasset.id).join(","));
        const boughtportfolioassets = portfolioassets.map((boughtasset) => {
            const portfolioasset = portfolioassetsmarketData.filter((item) => boughtasset.id === item.id)[0];
            return {
                ...boughtasset,
                current_price: portfolioasset.current_price,
                price_change_percentage_24h: portfolioasset.price_change_percentage_24h
            }
        });
        return boughtportfolioassets.sort((item1, item2) => (item1.quantitybought * item1.current_price) < (item2.quantitybought * item2.current_price));
    }
});
export const portfolioassets = atom({
    key: "portfolioassets",
    default: portfolioassetsinapi
});
export const portfolioassetsinstore = atom({
    key: "portfolioassetsinstore",
    default: portfoliostoredassets
});