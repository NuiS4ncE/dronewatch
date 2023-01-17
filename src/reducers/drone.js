const initialState = { violators: [] }

export const ActionTypes = {
    UPDATE_VIOLATOR_DRONES: 'UPDATE_VIOLATOR_DRONES',
}

export const droneReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.UPDATE_VIOLATOR_DRONES:
            return { ...state, violators: action.payload }
        default:
            return state
    }
}