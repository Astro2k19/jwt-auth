import {createSlice} from '@reduxjs/toolkit'
import {User} from "../model/User.ts";
import {loginApi} from "../api/loginApi.ts";
import {registerApi} from "../api/registerApi.ts";
import {logoutApi} from "../api/logoutApi.ts";
import {checkAuthApi} from "../api/checkAuthApi.ts";
import {fetchUsers} from "../api/fetchUsers.ts";
import {ApiError} from "../model/response/ApiError.ts";

interface UserState {
    user?: User
    isAuth: boolean
    isLoading: boolean
    users?: User[]
    error?: ApiError
}

const initialState: UserState = {
    isAuth: false,
    isLoading: false
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        // setUser: (state, {payload}: PayloadAction<User>) => {
        //     state.user = payload
        // },
        // setAuth: (state, {payload}: PayloadAction<boolean>) => {
        //     state.isAuth = payload
        // },
    },
    extraReducers: (builder) => {
        // loginApi
        builder.addCase(loginApi.pending, (state) => {
            state.isLoading = true
        })
        .addCase(loginApi.fulfilled, (state, action) => {
            state.isLoading = false
            state.user = action.payload.user
            state.isAuth = true
        })
        .addCase(loginApi.rejected, (state) => {
            state.isLoading = false
            state.isAuth = false
        })

         // registerApi
        .addCase(registerApi.pending, (state) => {
            state.isLoading = true
        })
        .addCase(registerApi.fulfilled, (state, action) => {
            state.isLoading = false
            state.user = action.payload.user
            state.isAuth = true
        })
        .addCase(registerApi.rejected, (state) => {
            state.isLoading = false
            state.isAuth = false
        })

        // logoutApi
        .addCase(logoutApi.pending, (state) => {
            state.isLoading = true
        })
        .addCase(logoutApi.fulfilled, (state) => {
            state.isLoading = false
            state.user = undefined
            state.users = undefined
            state.isAuth = false
        })

        // checkAuth
        .addCase(checkAuthApi.pending, (state) => {
            state.isLoading = true
        })
        .addCase(checkAuthApi.fulfilled, (state, action) => {
            state.isLoading = false
            state.user = action.payload.user
            state.isAuth = true
        })
        .addCase(checkAuthApi.rejected, (state) => {
            state.isLoading = false
            state.isAuth = false
        })


        .addCase(fetchUsers.fulfilled, (state, action) => {
            console.log(action.payload, 'action.payload')
            state.users = action.payload
        })

    }
})

export const userActions = userSlice.actions
export default userSlice.reducer
