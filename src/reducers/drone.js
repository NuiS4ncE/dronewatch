const initial = {
    info: null,
    violators: null
}

const reducer = (state = initial, action) => {
    if (action.type === 'INITIALIZE_DRONES') {
        return Object.assign({}, state, { info: action.payload })
    }

    if (action.type === 'INITIALIZE_VIOLATORS') {
        return Object.assign({}, state, { violators: action.payload })
    }
    return state
}

export const initializeDrone = (data) => {
    return {
        type: 'INITIALIZE_DRONES',
        payload: data
    }
}

export const initializeViolators = (data) => {
    return {
        type: 'INITIALIZE_VIOLATORS',
        payload: data
    }
}

export default reducer