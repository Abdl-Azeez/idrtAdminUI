import HttpService from "./HttpService";
import { QueryReallignment } from '../utils/Utils';


export const WalletService = () => {
    const http = new HttpService();
    let url = `wallet`;
    return http.getData(url);
};

export const WalletBalanceService = (address) => {
    const http = new HttpService();
    let url = `wallet/balance/${address}`;
    return http.getData(url);
};

