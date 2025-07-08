import axios from "axios";
import { refreshToken } from "../services/api/auth";

const http = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "portal": "admin",
        "platform": "browser",
        "medium": "Web",
    },
});

http.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

http.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            const refreshTokenValue = localStorage.getItem("refreshToken");
            const errorDetail =
                error.response?.data?.detail || error.response?.data?.details;

            if (
                errorDetail === "Token is expired" ||
                errorDetail === "Token is blacklisted"
            ) {
                localStorage.clear();
                window.location.href = "/login";
                return;
            }

            if (refreshTokenValue) {
                originalRequest._retry = true;
                try {
                    const res = await refreshToken({ refresh: refreshTokenValue });

                    const newAccessToken = res?.data?.access;
                    const newRefreshToken = res?.data?.refresh;
                    if (!newAccessToken)
                        throw new Error("Failed to get new access token");

                    localStorage.setItem("accessToken", newAccessToken);
                    localStorage.setItem("refreshToken", newRefreshToken);
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                    return http(originalRequest);
                } catch (refreshErr) {
                    localStorage.clear();
                    window.location.href = "/login";
                    return Promise.reject(refreshErr);
                }
            }
        }

        return Promise.reject(error);
    }
);

export { http };
