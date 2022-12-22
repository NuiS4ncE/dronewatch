import React from 'react'
import { Route } from 'react-router-dom'
import droneService from '../services/drones'

class Drone extends React.Component {

    state = {
        drones: []
    }

    componentWillMount = async () => {
        const drones = await droneService.getInfo()
        this.setState({ drones }) 
    }

    render() {
        return (
            <div>
                <ul>
                    {this.state.drones}
                </ul>
            </div>
        )
    }

} 


export default Drone 