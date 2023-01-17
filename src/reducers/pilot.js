const initialState = { pilots: [] }

export const actionTypes = {
    UPDATE_PILOTS: 'UPDATE_PILOTS',
}

export const pilotReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_PILOTS:
            return { ...state, pilots: action.payload }
        default:
            return state
    }
}
