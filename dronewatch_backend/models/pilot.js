const mongoose = require('mongoose');
const url = process.env.MONGODB_URI;

mongoose.connect(url).then((result) => {
  console.log('connected to MongoDB');
}).catch((error) => {
  console.log('error connecting to MongoDB: ', error.message);
});

const pilotSchema = new mongoose.Schema({
  pilotId: String,
  firstName: String,
  lastName: String,
  phoneNumber: String,
  createdDt: String,
  email: String,
  expireAt: {
    type: Date,
    default: Date.now,
    index: { expires: '600s' }
  },
});

pilotSchema.index({ expireAt: 1 }, { expireAfterSeconds: 600 })


pilotSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Pilot', pilotSchema)
