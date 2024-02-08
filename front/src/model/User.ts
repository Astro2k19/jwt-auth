export interface User {
    id: string
    email: string
    isActivated: boolean
    roles: UserRoles[]
}

export type UserRoles = 'User' | 'Editor' | 'Admin'

