const User = require('../models/User')
const TokenService = require('../services/TokenService')
const MailService = require('../services/MailService')
const bgcrypt = require('bcrypt')
const uuid = require("uuid");
const DtoUser = require("../dto/DtoUser");
const ApiError = require("../exceptions/ApiError");
const Token = require('../models/Token')
class UserService {
    async register(email, password) {
        const candidate = await User.findOne({email})

        if (candidate) {
            throw ApiError.BadRequest(`User with ${email} email already exist!`)
        }

        const hashedPassword = await bgcrypt.hash(password, 3)
        const activationLink = uuid.v4()

        const user = await User.create({email, password: hashedPassword, activationLink})
        await MailService.sendActivationEmail(email, `${process.env.BACKEND_URL}/activate/${activationLink}`)
        const dtoUser = new DtoUser(user)

        const jwtTokens = TokenService.generateTokens({...dtoUser}) // why spread?
        await TokenService.saveRefreshToken(dtoUser.id, jwtTokens.refreshToken)

        return {...jwtTokens, user: dtoUser}
    }
    async login(email, password) {
        const foundUser = await User.findOne({email})
        if (!foundUser) {
            throw ApiError.BadRequest(`User with ${email} email doesn't exist!`)
        }
        const isPassEqual = await bgcrypt.compare(password, foundUser.password)
        if (!isPassEqual) {
            throw ApiError.BadRequest(`Password is not correct!`)
        }

        const dtoUser = new DtoUser(foundUser)
        const jwtTokens = TokenService.generateTokens({...dtoUser})
        await TokenService.saveRefreshToken(dtoUser.id, jwtTokens.refreshToken)

        return {...jwtTokens, user: dtoUser}
    }

    async activate(activationLink) {
        const user = await User.findOne({activationLink})

        if (!user) {
            throw ApiError.BadRequest(`Activation link is not correct!`)
        }

        user.isActivated = true
        await user.save()
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.Unauthorized()
        }

        const tokenFromDb = await TokenService.findToken(refreshToken)
        const decoded = TokenService.verifyRefreshToken(refreshToken)

        if (!tokenFromDb || !decoded) {
            throw ApiError.Unauthorized()
        }


        const user = await User.findById(tokenFromDb.user)
        const dtoUser = new DtoUser(user)
        const jwtTokens = TokenService.generateTokens({...dtoUser})
        await TokenService.saveRefreshToken(dtoUser.id, jwtTokens.refreshToken)

        return {...jwtTokens, user: dtoUser}
    }

    async logout(refreshToken) {
        if (!refreshToken) {
            throw ApiError.Unauthorized()
        }

        const tokenData = await TokenService.removeToken(refreshToken)
        return tokenData;
    }

}

module.exports = new UserService()
