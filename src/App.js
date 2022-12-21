import './App.css';
import { useState, useEffect } from 'react'
import Drone from './components/Drone'
import axios from 'axios'
import droneService from './services/drones'
import pilotService from './services/pilots'

axios.defaults.baseURL = "localhost:3001/api"
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

  
  return (
    <div>
      <ul>

      </ul>
    </div>
  )
}

export default App;
