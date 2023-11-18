import HttpService from "./HttpService";

export const LoginService = (payload) => {
  const http = new HttpService();
  const url = "auth/merchant_login";
  return http.postData(payload, url);
};

