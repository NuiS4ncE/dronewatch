import React from 'react'
import { Route } from 'react-router-dom'
import { initializePilot } from '../reducers/pilot'
import pilotService from '../services/pilots'


class Pilot extends React.Component {

    constructor(props) {
        super(props);
    }
    componentWillMount = async () => {
        const responses = []
        for (let i = 0; i < this.props.length; i++) {
        responses.push(await pilotService.getInfoOf(this.props.serialNumber._text))
        }
        this.props.store.dispatch(initializePilot(responses))
        
    }

    

    render() {
        if (this.props.store.getState().pilot.info == null) {
            return null
        }
        const pilot = this.props.store.getState().pilot.info
        return (
            <div>
                <ul>
                    {pilot.firstName}
                </ul>
            </div>
        )
    }
}