import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchViolatorDrones } from '../reducers/drone'

const Drone = () => {
    const violators = useSelector(state => state.drone.violators)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchViolatorDrones())
        const interval = setInterval(() => {
            dispatch(fetchViolatorDrones())
        }, 2000)
        return () => clearInterval(interval)
    }, [dispatch])

    //console.log("violators in Drone.js: " + JSON.stringify(violators))

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
                        {violators.map((data, key) => {
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

export default Drone
