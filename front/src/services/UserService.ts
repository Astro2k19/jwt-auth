import {$api} from "../api";
import {User} from "../model/User.ts";

export default class UserService {
    static async fetchUsers(): Promise<User[]> {
        const response = await $api.get('/users')
        return response.data
    }
}
