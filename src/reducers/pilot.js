const initialState = { violators: [] }

export const actionTypes = {
    UPDATE_VIOLATOR_PILOTS: 'UPDATE_VIOLATOR_PILOTS',
    FETCH_VIOLATOR_PILOTS: 'FETCH_VIOLATOR_PILOTS'
}

export const pilotReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_VIOLATOR_PILOTS:
            return { ...state, violators: action.payload }
        default:
            return state
    }
}

export const fetchViolatorPilots = () => {
    return {
        type: actionTypes.FETCH_VIOLATOR_PILOTS
    }
}