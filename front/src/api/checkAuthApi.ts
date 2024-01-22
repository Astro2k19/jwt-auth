import {createAsyncThunk} from "@reduxjs/toolkit";
import AuthService from "../services/AuthService.ts";
import {AuthResponse} from "../model/response/AuthResponse.ts";
import {AxiosError} from "axios";
import {ApiError} from "../model/response/ApiError.ts";


export const checkAuthApi = createAsyncThunk<AuthResponse>(
    'auth/checkAuth',
    async (_, {rejectWithValue}) => {
        try {
            const response =  await AuthService.checkAuth()
            localStorage.setItem('token', response.accessToken)
            return response
        } catch (e) {
            const error = e as AxiosError<ApiError>
            console.log(error.response?.data)

            return rejectWithValue(error.response?.data)
        }
    }
)
