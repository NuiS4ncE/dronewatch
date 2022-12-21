import './App.css';
import getInfo from './services/drones.js'
//import Axios from 'axios'

//Axios.defaults.baseURL = "https://assignments.reaktor.com/birdnest"
const App = () => {
  const wat = getInfo()
  return (
    <>
      <DroneData data={wat}/>
      <Footer />
    </>
  )
}

const Footer = () => {
  
  return (
    <div>
      This app is for a summer trainee pre-assignment. 
    </div>
  )
}

const DroneData = (props) => {

  return (
    <div>
      <p>
        {props.data}
      </p>
    </div>
  )
}

export default App;
