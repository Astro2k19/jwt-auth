const User = require("../models/User");
const AdminService = require('../services/AdminService')
const DtoUser = require("../dto/DtoUser");

class AdminController {
    async getAllUsers(req, res, next) {
        try {
            const users = await User.find({}, '-password')
            res.json(users)
        } catch (e) {
            next(e)
        }
    }

    async updateUserRoles(req, res, next) {
        try {
            const userId = req.params.id
            const roles = req.params.body
            const updatedUser = await AdminService.updateUserRoles(userId, roles)
            const dtoUser = new DtoUser(updatedUser)
            res.json(dtoUser)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new AdminController()