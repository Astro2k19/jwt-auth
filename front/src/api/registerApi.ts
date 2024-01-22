import {createAsyncThunk} from "@reduxjs/toolkit";
import AuthService from "../services/AuthService.ts";
import {AuthResponse} from "../model/response/AuthResponse.ts";
import {AxiosError} from "axios";
import {ApiError} from "../model/response/ApiError.ts";

interface RegisterApiArgs {
    email: string
    password: string
}

export const registerApi = createAsyncThunk<AuthResponse, RegisterApiArgs>(
    'auth/register',
    async ({email, password}, {rejectWithValue}) => {
        try {
            const response =  await AuthService.register(email, password)
            localStorage.setItem('token', response.accessToken)
            return response
        } catch (e) {
            const error = e as AxiosError<ApiError>
            console.log(error.response?.data)

            return rejectWithValue(error.response?.data)
        }
    }
)
