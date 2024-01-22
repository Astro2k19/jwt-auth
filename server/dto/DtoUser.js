class DtoUser {
    constructor(user) {
        this.email = user.email
        this.id = user._id
        this.isActivated = user.isActivated
    }
}

module.exports = DtoUser
