import React from 'react'
import droneService from '../services/drones'
import Pilot from './Pilot'

class Drone extends React.Component {

    state = {
        violators: [],
        error: null,
        previousData: []
    }

    componentDidMount = async () => {
        const violators = await droneService.getViolatorDrones()
        this.setState({ violators })
        try {
            this.interval = setInterval(async () => {
                const violators = await droneService.getViolatorDrones()
                this.setState({ violators, error: null, previousData: violators })
            }, 2000)
        } catch (err) {
            this.setState({ error: err.message })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.error && prevState.error !== this.state.error) {
            this.setState({ violators: prevState.previousData });
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
        if (this.state.error) {
            return "Error"
        }
        if (this.state.violators === undefined || this.state.violators.length === 0) {
            return "No violators"
        }
        return (
            <>
                <div className="drones-container">
                    <h3>Drones that have violated the nest:</h3>
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