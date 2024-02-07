import {
    BaseQueryFn,
    createApi,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError
} from "@reduxjs/toolkit/query/react";
import {RootState} from "../store/store.ts";
import {userActions} from "../slices/userSlice.ts";

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
    let result = await baseQuery(args, api, extraOptions)
    const url = typeof args === 'string' ? args : args.url

    if (result.error && result.error.status === 401 && url !== '/refresh') {
        console.log(result.error, 'result.error')
        const refreshResult = await baseQuery('/refresh', api, extraOptions)
        // TODO: FIX isRetry
        if (refreshResult.data) {
            api.dispatch(userActions.setCredentials(refreshResult.data))
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(userActions.logout())
        }
    }

    return result
}


export const $api = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({})
})


