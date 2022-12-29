import React from 'react'
import { Route } from 'react-router-dom'
import { initializeDrone, initializeViolators } from '../reducers/drone'
import droneService from '../services/drones'

class Drone extends React.Component {

    state = {
        drones: [],
        violators: [],
        loading: true
    }

    componentDidMount = async () => {
        const drones = await droneService.getInfo()
        this.setState({ drones })

        this.interval = setInterval(async () => { 
            const violators = await droneService.getViolatorDrones()
            this.setState({ violators })
        }, 2000)
        this.setState({ loading: false })
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
        if (this.state.loading) {
            return <p>Loading..</p>
        }
        return (
            <>
                <div className="drones-container">
                    <h3>Drones violating nest currently:</h3>
                    {this.state.violators.map((data, key) => {
                        return (
                            <div key={key}>
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
                                                <h5>{data.serialNumber._text}</h5>
                                            </td>
                                            <td>
                                                <h5>{data.model._text}</h5>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        )
                    })}
                </div>
            </>
        )
    }

}


export default Drone 