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
  createdAt: {
    type: Date,
    expires: Date.now() + 10 * 60 * 1000, 
  },
});

pilotSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Pilot = mongoose.model('Pilot', pilotSchema);

Pilot.createIndex({ "createdAt": 1 }, { expireAfterSeconds: 600 }).then(() => {
  console.log('TTL index created on createdAt field');
}).catch((error) => {
  console.error(error);
});

module.exports = Pilot;
