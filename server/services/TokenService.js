const jwt = require('jsonwebtoken')
const Token = require('../models/Token')
class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET_TOKEN, {expiresIn: '30s'})
        const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET_TOKEN, {expiresIn: '30m'})

        return {
            accessToken,
            refreshToken
        }
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
        const tokenData = await Token.deleteOne({refreshToken});
        return tokenData
    }

    async findToken(refreshToken) {
        const token = await Token.findOne({refreshToken});
        return token
    }
}

module.exports = new TokenService()
