import './App.css';
import { Provider } from 'react-redux'
import store from './store'
import Drone from './components/Drone'
import Pilot from './components/Pilot'

const App = () => {
  console.log("App rendering")
  //     
  return (
    <Provider store={store}>
      <Header />
      <Pilot />
      <Drone />
      <Footer />
    </Provider>
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
