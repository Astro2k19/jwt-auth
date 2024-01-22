const {Schema, model} = require("mongoose");

const Token = new Schema({
    user: {type: Schema.Types.ObjectId, required: true, ref: 'User'},
    refreshToken: String
})

module.exports = model('Token', Token)
