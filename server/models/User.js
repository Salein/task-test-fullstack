const { Schema, model} = require('mongoose')


const Messages = new Schema({
    name: {type: String, required: true},
    phone: {type: String, required: true},
    message: {type: String, required: true}
})

module.exports = model('User', Messages)