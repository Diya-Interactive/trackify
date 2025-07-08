import { login, verifyOtp } from "../services/api/auth";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AuthState {
    formData: {
        email: string;
        password: string;
    };
    otp: string[];
}

const initialState: AuthState = {
    formData: {
        email: "",
        password: "",
    },
    otp: new Array(6).fill(""),
};

export const loginForm = createAsyncThunk(
    "login",
    async (data: { email: string }, { rejectWithValue }) => {
        try {
            const response = await login(data);
            return response?.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const verifyOtpForm = createAsyncThunk(
    "verifyOtp",
    async (data:  { email: string; otp: string }, { rejectWithValue }) => {
        try {
            const response = await verifyOtp(data);
            return response?.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);



const AuthSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        setFormData: (state, action) => {
            const { key, value } = action.payload;
            state.formData = {
                ...state?.formData,
                [key]: value,
            };
        },
        setOTPCode: (state, action) => {
            state.otp = action.payload;
        },
        clearFormData: (state) => {
            state.formData = {
                email: "",
                password: "",
            };
            state.otp = new Array(6).fill("");
        },
    },
});

export const { setFormData, setOTPCode, clearFormData } = AuthSlice.actions;
export default AuthSlice.reducer;
