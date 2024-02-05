const UserService = require('../services/UserService')
const {validationResult, matchedData} = require("express-validator");
const ApiError = require("../exceptions/ApiError");
const User = require('../models/User')

class UserController {
    async register(req, res, next) {
        try {
            const result = validationResult(req)
            if (!result.isEmpty()) {
                return next(ApiError.BadRequest('Validation error!', result.array()))
            }
            const {email, password} = matchedData(req)
            const userData = await UserService.register(email, password)
            res.cookie(
                'refreshToken',
                userData.refreshToken,
                {httpOnly: true, secure: true, maxAge: 30 * 24 * 60 * 60 * 1000, sameSite: 'none'}
            )
            res.status(201).json({user: userData.user, accessToken: userData.accessToken})
        } catch (e) {
            next(e)
        }
    }

    async login(req, res, next) {
        try {
            const result = validationResult(req)
            if (!result.isEmpty()) {
                return next(ApiError.BadRequest('Validation error!', result.array()))
            }
            const {email, password} = matchedData(req)
            const userData = await UserService.login(email, password)
            res.cookie(
                'refreshToken',
                userData.refreshToken,
                {httpOnly: true, secure: true, maxAge: 30 * 24 * 60 * 60 * 1000, sameSite: 'none'}
            )
            res.status(201).json({user: userData.user, accessToken: userData.accessToken})
        } catch (e) {
            next(e)
        }
    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link
            await UserService.activate(activationLink)
            res.redirect(process.env.CLIENT_URL)
        } catch (e) {
            next(e)
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            console.log(req.cookies, 'req.cookies')
            const userData = await UserService.refresh(refreshToken)
            res.status(200).json(userData)
        } catch (e) {
            next(e)
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const token = await UserService.logout(refreshToken)
            res.clearCookie('refreshToken', {httpOnly: true, secure: true, sameSite: 'none'})
            res.status(200).json(token)
        } catch (e) {
            next(e)
        }
    }


    async getAllUsers(req, res, next) {
        try {
            const users = await User.find({}, '-password')
            res.json(users)
        } catch (e) {
            next(e)
        }
    }

}

module.exports = new UserController()
