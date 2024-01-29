const {Schema, model} = require("mongoose");

const roles = ['User', 'Admin', 'Editor'];

const User = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    isActivated: {type: Boolean, default: false},
    activationLink: String,
    roles: {
        type: [{
            type: String,
            enum: roles,
            default: ['User']
        }],
        default: ['User'] // Set the default value for the roles field
    }
})

module.exports = model('User', User)
