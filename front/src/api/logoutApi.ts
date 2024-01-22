import {createAsyncThunk} from "@reduxjs/toolkit";
import AuthService from "../services/AuthService.ts";
import {AxiosError} from "axios";
import {ApiError} from "../model/response/ApiError.ts";


export const logoutApi = createAsyncThunk(
    'auth/logout',
    async (_, {rejectWithValue}) => {
        try {
            await AuthService.logout()
            localStorage.removeItem('token')
        } catch (e) {
            const error = e as AxiosError<ApiError>
            console.log(error.response?.data)

            return rejectWithValue(error.response?.data)
        }
    }
)
