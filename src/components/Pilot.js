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
        const pilots = []
        // const sernums = []
        /*for (let j = 0; j < this.props.props.length; j++){
            sernums.push()
        }*/
        console.log("props in Pilot.js: " + JSON.stringify(this.props.props))
        //console.log("prop at index 0: " + this.props.props[0].serialNumber._text) 
        //console.log("prop at index 1: " + this.props.props[1].serialNumber._text)
        //console.log("prop at index 2: " + this.props.props[2].serialNumber._text)
        this.interval = setInterval(async () => {
            for (let i = 0; i < this.props.props.length; i++) {
                pilots.push(await pilotService.getInfoOf(this.props.props[i].serialNumber._text))
                console.log("for loop sernum: " + this.props.props[i].serialNumber._text)
            }
            this.setState({ pilots })
        }, 2000)
        console.log("pilots at Pilot: " + this.state.pilots)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
        if (this.state.pilots === undefined) {
            return "No pilots found"
        }
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