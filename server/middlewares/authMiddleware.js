const ApiError = require("../exceptions/ApiError");
const TokenService = require('../services/TokenService')
const authMiddleware = (req, res, next) => {
    if (!req.headers.authorization) {
        return next(ApiError.Unauthorized())
    }

    console.log(req.headers.authorization, 'req.headers.authorization')

    const bearerToken = req.headers.authorization.split(' ')[1]
    if (!bearerToken) {
        return next(ApiError.Unauthorized())
    }

    const decoded = TokenService.verifyAccessToken(bearerToken)

    console.log(decoded, 'decoded')
    if (!decoded) {
        return next(ApiError.Unauthorized())
    }

    console.log('user auth')

    req.user = decoded
    next()
}

module.exports = authMiddleware
