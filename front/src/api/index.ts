import {
    BaseQueryFn,
    createApi,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError
} from "@reduxjs/toolkit/query/react";
import {RootState} from "../store/store.ts";
import {userActions, UserState} from "../slices/userSlice.ts";
import { Mutex } from 'async-mutex'
import {QueryReturnValue} from "@reduxjs/toolkit/dist/query/baseQueryTypes";

const mutex = new Mutex()
export const BASE_URL = 'http://localhost:3500'

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, {getState}) => {
        const {user} = getState() as RootState

        if (user.accessToken) {
            headers.set('authorization', `Bearer ${user.accessToken}`)
        }

        return headers
    },
    credentials: 'include'
})

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions
) => {
    // wait until the mutex is available without locking it
    await mutex.waitForUnlock()
    let result = await baseQuery(args, api, extraOptions)

    if (result.error && result.error.status === 401) {
        // checking whether the mutex is locked
        if (!mutex.isLocked()) {
            const release = await mutex.acquire()
           try {
               const refreshResult: QueryReturnValue<Pick<UserState, 'user' | 'accessToken'>> = await baseQuery(
                   '/refresh',
                   api,
                   extraOptions
               )

               if (refreshResult.data) {
                   api.dispatch(userActions.setCredentials(refreshResult.data));
                   result = await baseQuery(args, api, extraOptions);
               } else {
                   api.dispatch(userActions.logout());
               }
           } finally {
               // release must be called once the mutex should be released again.
               release();
           }
        } else {
            // wait until the mutex is available without locking it
            await mutex.waitForUnlock()
            result = await baseQuery(args, api, extraOptions)
        }
    }

    return result
}

export const $api = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({})
})



