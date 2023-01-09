const mongoose = require('mongoose')

const pilotSchema = new mongoose.Schema({
    pilotId: String,
    firstName: String,
    lastName: String,
    phoneNUmber: String,
    createdDt: String,
    email: String,
    createdAt: {
        type: Date,
        expires: 600
    }
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Pilot', pilotSchema)