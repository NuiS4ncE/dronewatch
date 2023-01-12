import React from 'react'
import droneService from '../services/drones'
import Pilot from './Pilot'

class Drone extends React.Component {

    state = {
        violators: [],
    }

    componentDidMount = async () => {
        //const violators = await droneService.getViolatorDrones()
        //this.setState({ violators })
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
                                        <td>{data.serialNumber}</td>
                                        <td>{data.model}</td>
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