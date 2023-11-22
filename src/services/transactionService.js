import HttpService from "./HttpService";
import { QueryReallignment } from '../utils/Utils';


export const GetTransactionsService = (query) => {
    const http = new HttpService();
    let url = `transactions/latestTransactions?limit=${query.limit}`;
    return http.getData(url);
};

export const GetEachTransactionService = (id) => {
    const http = new HttpService();
    let url = `transactions/${id}`;
    return http.getData(url);
};

export const GetUserTransactionService = (id) => {
    const http = new HttpService();
    let url = `transactions/byUser/${id}`;
    return http.getData(url);
};

export const GetTransactionAddressService = (query) => {
    const http = new HttpService();
    let url
    if (query.type === 'in') {
        url = `transactions/incomingByWallet/${query.walletAddress}?perPage=${query.perPage}&page=${query.page}`;
    }
    else {
        url = `transactions/outgoingByWallet/${query.walletAddress}?perPage=${query.perPage}&page=${query.page}`;
    }
    return http.getData(url);
};

export const GetOrphanTransactionService = (query) => {
    const http = new HttpService();
    let url = `transactions/allOrphanTransactions`;

    if (query) {
        let queryParams = QueryReallignment(query);
        url = `${url}?${queryParams}`;
    }

    return http.getData(url);
};

export const GetOrphanLogService = () => {
    const http = new HttpService();
    let url = `orphan/getOrphanHistory`;
    return http.getData(url);
};

export const GetIncomingTnxService = (query) => {
    const http = new HttpService();
    let url = 'transactions/incoming';

    if (query) {
        let queryParams = QueryReallignment(query);
        url = `${url}?${queryParams}`;
    }
    return http.getData(url);
};

export const GetOutgoingTnxService = (query) => {
    const http = new HttpService();
    let url = 'transactions/outgoing';
    if (query) {
        let queryParams = QueryReallignment(query);
        url = `${url}?${queryParams}`;
    }
    return http.getData(url);
};