const express = require('express')
const app = express()
const cors = require('cors')
const axios = require('axios')
const convert = require("xml-js")

app.use(cors())

app.get("/api/drones", async (req, res) => {
    try {
        const response = await axios.get('https://assignments.reaktor.com/birdnest/drones')
        const data = JSON.parse(convert.xml2json(response.data, {compact: true, spaces: 2}))
        res.json(data)
    } catch (ex) {
        res.status(500).send('Error fetching and saving data')
    }
})



console.log('hello world')

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
