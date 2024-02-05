import {$api} from "./index.js";
import {AuthResponse} from "../model/response/AuthResponse.ts";
import {User} from "../model/User.ts";

interface AuthArgs {
    email: string
    password: string
}

export const authApi = $api.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<AuthResponse, AuthArgs>({
            query: (body) => ({
                url: '/login',
                method: 'POST',
                body,
            }),
        }),
        register: build.mutation<AuthResponse, AuthArgs>({
            query: (body) => ({
                url: '/registration',
                method: 'POST',
                body
            }),
        }),
        refresh: build.query<AuthResponse, undefined>({
            query: () => ({
                url: '/refresh',
                method: 'GET'
            }),
        }),
        logout: build.mutation({
            query: () => ({
                url: '/logout',
                method: 'POST'
            }),
        }),
        fetchUsers: build.query<User[], undefined>({
            query: () => ({
                url: '/users',
                method: 'GET'
            }),
        }),
    })
})

export const {useLoginMutation, useRegisterMutation, useRefreshQuery, useLogoutMutation, useFetchUsersQuery } = authApi
