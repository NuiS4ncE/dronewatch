import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchViolatorPilots } from '../reducers/pilot'

const Pilot = () => {  
    const violators = useSelector(state => state.pilot.violators)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchViolatorPilots())
        const interval = setInterval(() => {
            dispatch(fetchViolatorPilots())
        }, 2000)
    }, [dispatch])

    //console.log("violators in Pilot.js: " + JSON.stringify(violators))

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
                            <th> Distance (in meters) </th>
                        </tr>
                    </thead>
                    <tbody>
                        {violators.map((data, key) => {
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
                                    <td>
                                        <h5>{data.distance}</h5>
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


export default Pilot