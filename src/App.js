import './App.css';
import { useState, useEffect } from 'react'
import Drone from './components/Drone'
import axios from 'axios'
import droneService from './services/drones'
import pilotService from './services/pilots'

const App = () => {
  console.log("App rendering")
  return (
    <>
      <DroneData />
      <Footer />
    </>
  )
}

const Footer = () => {
  console.log("Footer rendering")
  return (
    <div>
      This app is for a summer trainee pre-assignment.
    </div>
  )
}

const DroneData = () => {
  const [drones, setDrones] = useState([])
  const [loading, setLoading] = useState(true)
// {drones: response.report.capture.drone}
  console.log("In DroneData next useEffect")
  useEffect(() => {
    async function fetchData() {
      try {
        console.log("Beginning of try")
        const response = await droneService.getInfo()
        console.log(response)
        setDrones( response )
        setLoading(false)
      } catch (error) {
        console.error(error)
      }
    } fetchData()
  }, [])

  if (loading) {
    return <p>Loading..</p>
  }
  return (
    <div>
      <pre>{JSON.stringify(drones, null, 2)} </pre>
    </div>
  )
}

export default App;
