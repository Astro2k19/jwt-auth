import {$api} from "./index.js";
import {User, UserRoles} from "../model/User.ts";

interface updateUserRolesArgs {
    userId: string
    roles: UserRoles[]
}

export const authApi = $api.enhanceEndpoints({addTagTypes: ['User']}).injectEndpoints({
    endpoints: (build) => ({
        updateUserRoles: build.mutation<User[], updateUserRolesArgs>({
            query: ({userId, roles}) => ({
                url: `/user-roles/${userId}`,
                method: 'PATCH',
                body: roles
            }),
            invalidatesTags: ['User']
        }),
        fetchUsers: build.query<User & {_id: string}[], undefined>({
            query: () => ({
                url: '/users',
                method: 'GET',
            }),
            transformResponse: (response: User & {_id: string}[]) => response.map(({_id, ...rest}) => ({...rest, id: _id})),
            providesTags: ['User']
        }),
    })
})
export const { useUpdateUserRolesMutation, useFetchUsersQuery } = authApi
