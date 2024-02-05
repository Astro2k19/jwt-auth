import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../slices/userSlice.ts'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {$api} from "../api";

export const store  = configureStore({
    reducer: {
        user: userReducer,
        [$api.reducerPath]: $api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat($api.middleware),
    devTools: import.meta.env.DEV
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

