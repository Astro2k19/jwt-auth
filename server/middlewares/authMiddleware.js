const ApiError = require("../exceptions/ApiError");
const TokenService = require('../services/TokenService')
const authMiddleware = (req, res, next) => {
    if (!req.headers.authorization) {
        return next(ApiError.Unauthorized())
    }

    const bearerToken = req.headers.authorization.split(' ')[1]
    if (!bearerToken) {
        return next(ApiError.Unauthorized())
    }

    const decoded = TokenService.verifyAccessToken(bearerToken)
    if (!decoded) {
        return next(ApiError.Unauthorized())
    }

    req.user = decoded
    next()
}

module.exports = authMiddleware
