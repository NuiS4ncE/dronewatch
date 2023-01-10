import React from 'react'
import pilotService from '../services/pilots'

class Pilot extends React.Component {

    state = {
        pilots: [],
    }
    
    componentDidMount = async () => {
        this.interval = setInterval(async () => {
            const pilotData = pilotService.getViolatingPilots()
            console.log("pilotData: " + JSON.stringify(pilotData))
            this.setState({ pilots: pilotData })
        }, 2000)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
        if (this.state.pilots === undefined) {
            return "No pilots found"
        }
        console.log("in render: " + JSON.stringify(this.state.pilots))
        return (
            <>
                <div className="drones-container">
                    <h3>Violating pilots' information:</h3>
                    <table>
                        <thead>
                            <tr>
                                <th> First name </th>
                                <th> Last name </th>
                                <th> Phone number </th>
                                <th> Email </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.pilots.map((data, key) => {
                                return (
                                    <tr key={key}>
                                        <td>
                                            <h5>{data.lastName}</h5>
                                        </td>
                                        <td>
                                            <h5>{data.firstName}</h5>
                                        </td>
                                        <td>
                                            <h5>{data.phoneNumber}</h5>
                                        </td>
                                        <td>
                                            <h5>{data.email}</h5>
                                        </td>
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

export default Pilot