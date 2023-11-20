import HttpService from "./HttpService";
import { QueryReallignment } from '../utils/Utils';


export const MerchantService = () => {
    const http = new HttpService();
    let url = `merchant/${JSON.parse(localStorage.getItem("idrtUsername"))}`;

    return http.getData(url);
};

