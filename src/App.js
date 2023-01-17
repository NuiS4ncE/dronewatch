import './App.css';
import Drone from './components/Drone'
import Pilot from './components/Pilot'

const App = () => {
  console.log("App rendering")
  //      <Drone  />
  return (
    <>
      <Header />
      <Pilot />
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

export default App;
