module.exports = class ApiError extends Error {
    status;
    message;
    errors;

    constructor(status, message, errors = []) {
        super(message);
        this.status = status
        this.message = message
        this.errors = errors
    }

    static BadRequest(message, error = []) {
        return new ApiError(400, message, error)
    }

    static Unauthorized(errors = []) {
        return new ApiError(401, 'You are not authorized!', errors)
    }

}
