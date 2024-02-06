const User = require('../models/User')
const ApiError = require("../exceptions/ApiError");
class AdminService {
    async updateUserRoles(userId, roles) {
        const user = await User.findById(userId);

        if (!user) {
            throw ApiError.BadRequest(`User with ${userId} id don't exist!`)
        }

        user.roles = [...user.roles, ...roles]
        await user.save()

        return user
    }

}

module.exports = new AdminService()
