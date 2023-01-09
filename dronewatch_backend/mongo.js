const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.connect(url)


const Pilot = mongoose.model('Pilot', pilotSchema)

const pilot = new Pilot