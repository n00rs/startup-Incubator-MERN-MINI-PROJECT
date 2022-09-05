const moongose = require('mongoose')

const { Schema } = moongose

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,

    }
})

module.exports = moongose.model('user', userSchema)