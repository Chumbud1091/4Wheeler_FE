import axios from "axios";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
  headers: { Accept: "application/json" },
  withCredentials: true,
});

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const status = error.response?.status;
    const url = originalRequest?.url || "";
    if (
      status === 403 &&
      !originalRequest._retry &&
      !url.includes("/auth/users/refresh-token")
    ) {
      originalRequest._retry = true;

      try {
        await client.post("/auth/users/refresh-token", {});
        return client(originalRequest);
      } catch (refreshError) {
        console.warn("[client] Refresh token failed, letting caller handle 403");
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default client;
