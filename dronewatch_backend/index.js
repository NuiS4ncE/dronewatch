const express = require('express')
const app = express()
const cors = require('cors')
const axios = require('axios')
const convert = require("xml-js")

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


app.get("/api/pilots/:serNum", async (req, res) => {
    try {
        const serNum = req.params.serNum
        console.log("serNum:" + serNum)
        const response = await axios.get(`https://assignments.reaktor.com/birdnest/pilots/${serNum}`)
        res.json(response) 
    } catch (ex) {
        res.status(500).send('Error fetching data')
    }
})

const fetchDangerClose = () => {
    return axios.get('https://assignments.reaktor.com/birdnest/drones')
      .then(response => {
        const data = JSON.parse(convert.xml2json(response.data, { compact: true, spaces: 2}))
        const dronesdata = data.report.capture.drone
        return checkDrones(dronesdata)
      })
      .catch(error => {
        console.error(error)
        throw new Error('Error fetching data')
      })
  }

const isWithinRadius = (y1, x1, y2, x2, radius) => {
    y1 = deg2rad(y1)
    x1 = deg2rad(x1)
    y2 = deg2rad(y2)
    x2 = deg2rad(x2)
  
    // Haversine formula
    const a = Math.sin((y2-y1)/2) * Math.sin((y2-y1)/2) + 
    Math.cos(y1) * Math.cos(y2) * 
    Math.sin((x2-x1)/2) * Math.sin((x2-x1))
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    const distance = 6371 * c
  
    return distance <= radius
  
  }
  
  const deg2rad = (deg) => {
    return deg * (Math.PI/100)
  }
  
  const checkDrones = (drones) => {
    // Given information implies that the scale is in millimeters i.e 0-500000mm,
    // thus 100m = 100*(10^-3)=100000
    var violate = []
    var i
    var radius = 100000
    var nestY = 250000
    var nestX = 250000
    for(i=0; i < drones.length; i++){
      if(isWithinRadius(nestY, nestX, Number(drones[i].positionY._text), Number(drones[i].positionX._text), radius)) {
        //console.log("Found a model/models!")
        //console.log(drones[i].model._text)
        violate.push(drones[i])
      }
    }
    return violate
  }


console.log('Backend running')

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
