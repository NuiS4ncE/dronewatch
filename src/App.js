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
      <Header />
      <Drone  />
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

const Header = () => {
  return (
    <header className="header">
      <h1>Dronewatch</h1>
    </header>
  )
}


const DroneData = () => {
  const [drones, setDrones] = useState([])
  const [loading, setLoading] = useState(true)
  // {drones: response.report.capture.drone}
  //console.log("In DroneData next useEffect")
  useEffect(() => {
    async function fetchData() {
      try {
        //console.log("Beginning of try")
        const response = await droneService.getViolatorDrones()
        //console.log(response)
        setDrones(response)
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
    <>

      <div className="drones-container">
        <h3>Drones violating nest currently:</h3>
        {drones.map((data, key) => {
          return (
            <div key={key}>
              <DronesLayout
                key={key}
                serialNumber={data.serialNumber._text}
                model={data.model._text}
              />
            </div>
          )
        })}
      </div>
    </>
  )
}

const DronesLayout = ({ serialNumber, model }) => {
  return (
    <table>
      <thead>
        <tr>
          <th> Serial number </th>
          <th> Model name </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <h5>{serialNumber}</h5>
          </td>
          <td>
            <h5>{model}</h5>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default App;
