export interface User {
    id: string
    email: string
    isActivated: boolean
    roles: UserRoles[]
}

export enum UserRoles {
    User = 'User',
    Editor = 'Editor',
    Admin = 'Admin'
}
