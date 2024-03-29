const ApiError = require("../exceptions/ApiError");
const rolesMiddleware = (allowedRoles) => {
    return (req, res, next) => {
        const roles = req.user.roles
        const isRouteAllowed = roles.some(role => allowedRoles.includes(role))
        console.log(isRouteAllowed, 'isRouteAllowed')
        if (!isRouteAllowed) {
            next(ApiError.Forbidden())
            return;
        }
        next()
    }
}

module.exports = rolesMiddleware
