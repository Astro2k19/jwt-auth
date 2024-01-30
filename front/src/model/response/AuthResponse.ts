import {User} from "../User.ts";

export interface AuthResponse {
    accessToken: string
    user: User
}
