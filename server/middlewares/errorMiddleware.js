const ApiError = require("../exceptions/ApiError");
const errorMiddleware = (err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.status).json({message: err.message, errors: err.errors})
    }

    res.status(500).json({message: 'Something went wrong!'})
}

module.exports = errorMiddleware
