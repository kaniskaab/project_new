const mongoose = require('mongoose')

const Prescription = new mongoose.Schema(
    {
        id:{type: String, required: true},
        prescription:{type:String, required:true}

    },
    {
        collection:'prescription_details'
    },
    {
        timestamps :true,
    }
)

const models = mongoose.model('Prescription', Prescription)

module.exports = models