const mongoose = require('mongoose')

const questionSchema = mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now()
    },
    answers: [{
        name:String,
        answer:String
    }]
})

const nn =mongoose.model("questions", questionSchema)
module.exports = nn