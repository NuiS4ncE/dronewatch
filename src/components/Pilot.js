import React from 'react'
import { Route } from 'react-router-dom'
import { initializePilot } from '../reducers/pilot'
import pilotService from '../services/pilots'

class Pilot extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        pilots: []
    }
    componentDidMount = async () => {
        const responses = []
        console.log("props in cWM: " + JSON.stringify(this.props.props))
        for (let i = 0; i < this.props.props.length; i++) {
            responses.push(await pilotService.getInfoOf(this.props.props[i].serialNumber._text))
        }
        this.setState({ responses })
    }

    render() {
        return (
            <>
                <div className="drones-container">
                    <h3>Violating pilots' information:</h3>
                    {this.state.pilots.map((data, key) => {
                        return (
                            <div key={key}>
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
                                        <tr>
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

export default Pilot