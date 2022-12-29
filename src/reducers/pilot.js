const initial = {
    info: null
}

const reducer = (state = initial, action) => {
    if (action.type === 'INITIALIZE_PILOT') {
        return Object.assign({}, state, { info: action.payload })
    }
    
    return state
}

export const initializePilot = (data) => {
    return {
        type: 'INITIALIZE_PILOT',
        payload: data
    }
}



export default reducer