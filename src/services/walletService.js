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

export const WalletHistoryService = (query) => {
    const http = new HttpService();
    let url

    if (query.type === 'user') {
        url = `wallet/assignHistoryByUser/${query.Id}`;
    }
    else {
        url = `wallet/assignHistoryByWallet/${query.Id}`;
    }
    return http.getData(url);
};

