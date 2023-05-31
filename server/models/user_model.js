const mongoose = require('mongoose')

const User = new mongoose.Schema(
    {
        email:{type: String, required: true, unique: true},
        password:{type:String, required: true}

    },
    {
        collection:'user-data'
    },
    {
        timestamps :true,
    }
)

const models = mongoose.model('UserData', User)

module.exports = models