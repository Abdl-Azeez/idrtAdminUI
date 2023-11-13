import HttpService from "./HttpService";

export const LoginService = (payload) => {
  const http = new HttpService();
  const url = "auth/admin_login";
  return http.postData(payload, url);
};

