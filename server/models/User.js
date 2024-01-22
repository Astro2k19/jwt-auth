const {Schema, model} = require("mongoose");

const User = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    isActivated: {type: Boolean, default: false},
    activationLink: String
})

module.exports = model('User', User)
