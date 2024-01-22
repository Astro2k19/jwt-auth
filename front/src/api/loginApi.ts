import {createAsyncThunk} from "@reduxjs/toolkit";
import AuthService from "../services/AuthService.ts";
import {AuthResponse} from "../model/response/AuthResponse.ts";
import {AxiosError} from "axios";
import {ApiError} from "../model/response/ApiError.ts";

interface LoginApiArgs {
    email: string
    password: string
}

export const loginApi = createAsyncThunk<AuthResponse, LoginApiArgs>(
    'auth/login',
    async ({email, password}, {rejectWithValue}) => {
        try {
            const response =  await AuthService.login(email, password)
            localStorage.setItem('token', response.accessToken)
            return response
        } catch (e) {
            const error = e as AxiosError<ApiError>
            console.log(error.response?.data)

            return rejectWithValue(error.response?.data)
        }
    }
)
