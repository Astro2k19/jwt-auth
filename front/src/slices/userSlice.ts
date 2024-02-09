import {createSlice, isAnyOf, PayloadAction} from '@reduxjs/toolkit'
import {User} from "../model/User.ts";
import {authApi} from "../api/authApi.ts";

export interface UserState {
    user: User | null
    accessToken: string | null
    isAuth: boolean
    isPersist: boolean
    users?: User[]
}

const initialState: UserState = {
    user: null,
    accessToken: null,
    isPersist: JSON.parse(localStorage.getItem('persist') || 'false'),
    isAuth: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setCredentials: (state, {payload}: PayloadAction<Pick<typeof initialState, 'user' | 'accessToken'>>) => {
            state.user = payload.user
            state.accessToken = payload.accessToken
        },
        setPersist: (state, {payload}: PayloadAction<boolean>) => {
            state.isPersist = payload
        },
        logout: (state) => {
            state.user = null
            state.isAuth = false
            state.accessToken = null
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            isAnyOf(
                authApi.endpoints.login.matchFulfilled,
                authApi.endpoints.register.matchFulfilled,
                authApi.endpoints.refresh.matchFulfilled
            ),
            (state, {payload}) => {
                state.user = payload.user
                state.isAuth = true
                state.accessToken = payload.accessToken
            }
        )
            .addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
                state.user = null
                state.isAuth = false
                state.accessToken = null
            })
    }
})

export const userActions = userSlice.actions
export default userSlice.reducer

