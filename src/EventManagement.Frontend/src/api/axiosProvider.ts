import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../components/user";

axios.interceptors.request.use(config => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  if (token)
    config.headers.Authorization = createJwtHeader(token);

  return config;
});

createAuthRefreshInterceptor(axios, failedRequest => {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);
  const token = localStorage.getItem(ACCESS_TOKEN);
  if (!refreshToken || !token)
    return Promise.resolve();

  return axios
    .post("/api/profileuser/refresh-token", {
      token,
      refreshToken,
    })
    .then((tokenRefreshResponse) => {
      const { token, refreshToken } = tokenRefreshResponse.data;
      localStorage.setItem(ACCESS_TOKEN, token);
      localStorage.setItem(REFRESH_TOKEN, refreshToken);

      failedRequest.response.config.headers.Authorization = createJwtHeader(token);
      return Promise.resolve();
    });
});

export default axios;

function createJwtHeader(accessToken: string) {
  return "Bearer " + accessToken;
}
