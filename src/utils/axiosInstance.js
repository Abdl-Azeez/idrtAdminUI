import axios from "axios";

export const checkAuthTokens = () => {
  // console.log(localStorage.getItem("idrtToken"));
  let authTokens = localStorage.getItem("idrtToken") ? JSON.parse(localStorage.getItem("idrtToken")) : null;

  return authTokens;
};

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  // headers: { Authorization: `Bearer ${checkAuthTokens()?.access_token}` },
});

axiosInstance.interceptors.request.use(async (req) => {
  if (checkAuthTokens()) {
    req.headers.Authorization = `Bearer ${checkAuthTokens()?.access_token}`;

  }
  req.headers.requester = req.baseURL;
  req.headers["Access-Control-Allow-Origin"] = "*";

  return req;
});

// axiosInstance.interceptors.response.use(
//   (res) => {
//     return res;
//   },
//   async (error) => {
//     const originalConfig = error.config;
//     if (error.response) {

//       if (error.response.status === 401) {
//         try {
//           const rs = await refreshToken();
//           if (rs) {
//             const { result } = rs.data;
//             localStorage.setItem("idrtToken", JSON.stringify(result));
//             axiosInstance.defaults.headers.Authorization = `Bearer ${result?.access_token}`;
//             return axiosInstance(originalConfig);
//           }
//         } catch (_error) {
//           console.log(_error)
//           // localStorage.removeItem("idrtToken");
//           window.location.href = "/login";
//           if (_error.response && _error.response.data) {
//             return Promise.reject(_error.response.data);
//           }
//           return Promise.reject(_error);
//         }
//       }
//     }
//     return Promise.reject(error);
//   }
// );

async function refreshToken() {
  if (localStorage.getItem("idrtToken")) {
    const result = await axiosInstance.post("/auth/refreshToken", {
      refreshToken: JSON.parse(localStorage.getItem("idrtToken")).refreshToken,
    });
    return result;
  } else {
    return null;
  }
}

export default axiosInstance;
