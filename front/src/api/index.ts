import axios from "axios";
import AuthService from "../services/AuthService.ts";

export const BASE_URL = 'http://localhost:3500'

export const $api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
})

$api.interceptors.request.use((config) => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

$api.interceptors.response.use((response) => {
    return response

}, async (error) => {
    const isRetry = error.config._isRetry

    if (error.response.status === 401 && error.config && !isRetry) {
        try {
            const response = await AuthService.checkAuth()
            localStorage.setItem('token', response.accessToken)
            error.config._isRetry = true
            return await $api.request(error.config)
        } catch (e) {
            console.log(e)
        }
    }

    throw error
})

