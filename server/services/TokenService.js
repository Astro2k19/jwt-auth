const jwt = require('jsonwebtoken')
const Token = require('../models/Token')
class TokenService {
    generateTokens(payload) {
        const accessToken = this.generateAccessToken(payload)
        const refreshToken = this.generateRefreshToken(payload)

        return {
            accessToken,
            refreshToken
        }
    }

    generateAccessToken(payload) {
        return jwt.sign(payload, process.env.ACCESS_SECRET_TOKEN, {expiresIn: '30s'})
    }

    generateRefreshToken(payload) {
        return jwt.sign(payload, process.env.REFRESH_SECRET_TOKEN, {expiresIn: '30m'})
    }

    async saveRefreshToken(userId, token) {
        const existedToken = await Token.findOne({user: userId})

        if (existedToken) {
            existedToken.refreshToken = token
            await existedToken.save()
            return;
        }

        await Token.create({user: userId, refreshToken: token})
    }

     verifyAccessToken(token) {
        try {
            return jwt.verify(token, process.env.ACCESS_SECRET_TOKEN)
        } catch (e) {
            return null
        }
    }

     verifyRefreshToken(token) {
        try {
            return jwt.verify(token, process.env.REFRESH_SECRET_TOKEN)
        } catch (e) {
            return null
        }
    }

    async removeToken(refreshToken) {
        return await Token.deleteOne({refreshToken});
    }

    async findToken(refreshToken) {
        return await Token.findOne({refreshToken});
    }
}

module.exports = new TokenService()
