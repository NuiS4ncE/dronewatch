import React from 'react'
import { Route } from 'react-router-dom'
import { initializeDrone, initializeViolators } from '../reducers/drone'
import droneService from '../services/drones'
import Pilot from './Pilot'

class Drone extends React.Component {

    state = {
        drones: [],
        violators: [],
    }

    componentDidMount = async () => {
        const drones = await droneService.getInfo()
        this.setState({ drones })

        this.interval = setInterval(async () => {
            const violators = await droneService.getViolatorDrones()
            this.setState({ violators })
        }, 2000)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
        if (this.state.violators === undefined) {
            return "No violators"
        }
        return (
            <>
                <Pilot props={this.state.violators} />
                <div className="drones-container">
                    <h3>Drones violating nest currently:</h3>
                    <table>
                        <thead>
                            <tr>
                                <th> Serial number </th>
                                <th> Model name </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.violators.map((data, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{data.serialNumber._text}</td>
                                        <td>{data.model._text}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </>
        )
    }

}


export default Drone 