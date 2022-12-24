import React from 'react'
import { Route } from 'react-router-dom'
import { initializeDrone } from '../reducers/drone'
import droneService from '../services/drones'

class Drone extends React.Component {

    state = {
        drones: []
    }

    componentWillMount = async () => {
        const drones = await droneService.getInfo()
        //this.setState({ drones })
        this.props.store.dispatch(initializeDrone(drones))
        
        //const violators = await droneService.
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