import HttpService from "./HttpService";

export const MerchantService = () => {
    const http = new HttpService();
    const url = "merchant/merchant1";
    return http.getData(url);
};

