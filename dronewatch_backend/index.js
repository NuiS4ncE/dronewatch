const express = require('express')
const app = express()
const cors = require('cors')
const axios = require('axios')
const convert = require("xml-js")
const mongoose = require('mongoose')
require('dotenv').config()
const Pilot = require('./models/pilot')

app.use(cors())

app.get("/api/dronesinfo", async (req, res) => {
  try {
    const response = await axios.get('https://assignments.reaktor.com/birdnest/drones')
    const data = JSON.parse(convert.xml2json(response.data, { compact: true, spaces: 2 }))
    res.json(data)
  } catch (ex) {
    res.status(500).send('Error fetching and saving data')
  }
})

app.get("/api/drones", async (req, res) => {
  try {
    const response = await axios.get('https://assignments.reaktor.com/birdnest/drones')
    const data = JSON.parse(convert.xml2json(response.data, { compact: true, spaces: 2 }))
    const dronesdata = data.report.capture.drone
    res.json(dronesdata)
  } catch (ex) {
    res.status(500).send('Error fetching and saving data')
  }
})

app.get("/api/dangerclose", async (req, res) => {
  try {
    const dangerclose = await fetchDangerClose()
    res.json(dangerclose)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

app.get("/api/pilots", async (req, res) => {
  pilots = []
  //console.log("starting for loop to fetch stuff")
  try {
    const dangerclose = await fetchDangerClose()
    //console.log("dangerclose: " + JSON.stringify(dangerclose))
    for (let i = 0; i < dangerclose.length; i++) {
      //console.log("indexes: " + dangerclose[i].serialNumber._text)
      const response = await axios.get(`https://assignments.reaktor.com/birdnest/pilots/${dangerclose[i].serialNumber._text}`)
      pilots.push(response.data)
    }
    addToDb(pilots)
    getFromDb().then((pilotData) => {
      res.json(pilotData)
    })
  } catch (error) {
    res.status(500).send(error.message)
  }
})

app.get("/api/pilots/:serNum", async (req, res) => {
  try {
    const serNum = req.params.serNum
    //console.log("serNum: " + serNum)
    const response = await axios.get(`https://assignments.reaktor.com/birdnest/pilots/${serNum}`)
    //console.log("serNum JSON.stringify(): " + JSON.stringify(response.data))
    res.json(response.data)
    //console.log("serNum res: " + res) 
  } catch (ex) {
    res.status(500).send('Error fetching data')
  }
})

const getFromDb = () => {
  //const Pilot = mongoose.model('Pilot', pilotSchema)
  return Pilot.find().then((pilots) => {
    console.log("Found pilots: " + JSON.stringify(pilots))
    return pilots
  }).catch((err) => {
    console.log(err)
  })
}

const addToDb = (pilots) => {
  //const Pilot = mongoose.model('Pilot', pilotSchema)
  //const pilots = JSON.stringify(pilotdata)
  console.log("pilots in beginning of addToDb: " + JSON.stringify(pilots))
  const currentTime = Date()
  for(const pilot of pilots) {
  Pilot.findOne({ pilotId: pilot.pilotId }).then((doc) => {
    if (doc) {
      const newTTL = 600
      const query = { pilotId: pilot.pilotId }
      const update = { createdAt: Date.now() }
      const options = {
        new: true,
        expiresAfterSeconds: newTTL,
      }

      findOneAndUpdate(query, update, options).then((updatedDoc) => {
        console.log("updatedDoc: " + updatedDoc)
      }).catch((err) => {
        console.log(err)
      })
    } else {
      console.log("pilots after else: " + JSON.stringify(pilots))
      const newPilot = new Pilot({
        pilotId: pilot.pilotId,
        firstName: pilot.firstName,
        lastName: pilot.lastName,
        phoneNumber: pilot.phoneNumber,
        createdDt: pilot.createdDt,
        email: pilot.email,
        createdAt: Date.now(),
      })
      newPilot.save()
    }
  }).catch((err) => {
    console.log(err)
  })
}

}

const fetchDangerClose = () => {
  return axios.get('https://assignments.reaktor.com/birdnest/drones')
    .then(response => {
      const data = JSON.parse(convert.xml2json(response.data, { compact: true, spaces: 2 }))
      const dronesdata = data.report.capture.drone
      return checkDrones(dronesdata)
    })
    .catch(error => {
      console.error(error)
      throw new Error('Error fetching data')
    })
}

const checkDrones = (drones) => {
  // Given information implies that the scale is in millimeters i.e 0-500000mm,
  // thus 100m = 100*(10^-3)=100000
  var violate = []
  var i
  var radius = 100000
  var nestY = 250000
  var nestX = 250000
  for (i = 0; i < drones.length; i++) {
    if (isWithinRange(nestX, nestY, Number(drones[i].positionX._text), Number(drones[i].positionY._text), radius)) {
      //console.log("Found a model/models!")
      //console.log(drones[i].model._text)
      violate.push(drones[i])
    }
  }
  return violate
}

const isWithinRange = (x1, y1, x2, y2, range) => {
  // Euclidean distance
  const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  return distance < range;
}

console.log('Backend running')

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
