import HttpService from "./HttpService";
import { QueryReallignment } from '../utils/Utils';


export const GetTransactionsService = () => {
    const http = new HttpService();
    let url = `transactions/alltransactions`;
    return http.getData(url);
};

export const GetEachTransactionService = (id) => {
    const http = new HttpService();
    let url = `transactions/${id}`;
    return http.getData(url);
};

export const GetTransactionAddressService = (address) => {
    const http = new HttpService();
    let url = `transactions/alltransactions/${address}`;
    return http.getData(url);
};

export const GetOrphanTransactionService = () => {
    const http = new HttpService();
    let url = `transactions/orphan`;
    return http.getData(url);
};

export const GetOrphanLogService = () => {
    const http = new HttpService();
    let url = `transactions/orphanhistory`;
    return http.getData(url);
};