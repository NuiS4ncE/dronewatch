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

export default App;
