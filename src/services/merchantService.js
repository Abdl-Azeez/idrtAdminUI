import HttpService from "./HttpService";
import { QueryReallignment } from '../utils/Utils';


export const MerchantService = () => {
    const http = new HttpService();
    let url = `merchant/${JSON.parse(localStorage.getItem("idrtUsername"))}`;

    return http.getData(url);
};

export const GetMerchantService = (name) => {
    const http = new HttpService();
    let url = `merchant/${name}`;
    return http.getData(url);
};

export const UpdateMerchantService = ({ payload, name }) => {
    const http = new HttpService();
    const url = `merchant/${name}`;
    return http.patchData(payload, url);
};