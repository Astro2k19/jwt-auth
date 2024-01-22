import {createAsyncThunk} from "@reduxjs/toolkit";
import {User} from "../model/User.ts";
import UserService from "../services/UserService.ts";
import {AxiosError} from "axios";
import {ApiError} from "../model/response/ApiError.ts";

export const fetchUsers = createAsyncThunk<User[]>(
    'user/fetchUsers',
    async (_, {rejectWithValue}) => {
        try {
            return await UserService.fetchUsers()
        } catch (e) {
            const error = e as AxiosError<ApiError>
            console.log(error.response?.data)

            return rejectWithValue(error.response?.data)
        }
    }
)
