import {$api, BASE_URL} from "../api";
import {AuthResponse} from "../model/response/AuthResponse.ts";
import axios from "axios";

export default class AuthService {
    static async login(email: string, password: string): Promise<AuthResponse> {
        const response = await $api.post<AuthResponse>('/login', {email, password})
        return response.data
    }

    static async register(email: string, password: string): Promise<AuthResponse> {
        const response = await $api.post<AuthResponse>('/registration', {email, password})
        return response.data
    }

    static async logout(): Promise<void> {
        await $api.post('/logout')
    }

    static async checkAuth() {
        const response = await axios.get<AuthResponse>(`${BASE_URL}/refresh`, {withCredentials: true})
        return response.data
    }
}
