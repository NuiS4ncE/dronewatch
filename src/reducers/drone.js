const initialState = { violators: [] }

export const actionTypes = {
    UPDATE_VIOLATOR_DRONES: 'UPDATE_VIOLATOR_DRONES',
    FETCH_VIOLATOR_DRONES: 'FETCH_VIOLATOR_DRONES'
}

export const droneReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_VIOLATOR_DRONES:
            return { ...state, violators: action.payload }
        default:
            return state
    }
}

export const fetchViolatorDrones = () => {
    return {
        type: actionTypes.FETCH_VIOLATOR_DRONES
    }
}