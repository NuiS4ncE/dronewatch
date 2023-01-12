const mongoose = require('mongoose');
const url = process.env.MONGODB_URI;

mongoose.connect(url).then((result) => {
  console.log('connected to MongoDB in drone.js');
}).catch((error) => {
  console.log('error connecting to MongoDB: ', error.message);
});

const droneSchema = new mongoose.Schema({
  serialNumber: String,
  model: String,
  manufacturer: String,
  mac: String,
  ipv4: String,
  ipv6: String,
  firmware: String,
  positionY: String,
  positionX: String,
  altitude: String,
  expireAt: {
    type: Date,
    default: Date.now,
    index: { expires: '600s' }
  },
});

droneSchema.index({ expireAt: 1 }, { expireAfterSeconds: 600 })


droneSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Drone', droneSchema)
