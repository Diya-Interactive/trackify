import { http } from "../../config/httpMethod";

export const login = async (data: { email: string }) => {
    const response = await http.post("/user/login-request/", data);
    return response;
};

export const verifyOtp = async (data: { email: string; otp: string }) => {
    const response = await http.post("/user/login-verify/", data);
    return response;
};

export const refreshToken = async (data: { refresh: string }) => {
    const response = await http.post("/user/refresh-token/", data);
    return response.data;
};

export const getMe = async () => {
    const response = await http.get("/user/me/");
    return response.data;
};

export const forgotPassword = async (data: { email: string }) => {
    const response = await http.post("/user/forgot-password/", data);
    return response.data;
};

export const resetPassword = async (
    token: string,
    data: { password: string }
) => {
    const response = await http.post(`/user/reset-password/${token}`, data);
    return response.data;
};
