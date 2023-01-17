import createSagaMiddleware from '@redux-saga/core'
import { configureStore } from '@reduxjs/toolkit'
import { droneReducer } from './reducers/drone'
import { pilotReducer } from './reducers/pilot'
import { watchViolatorDrones } from './dronesaga'
import { watchViolatorPilots } from './pilotsaga'

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
    reducer: {
        drone: droneReducer,
        pilot: pilotReducer,
    },
    middleware: [sagaMiddleware]
})

sagaMiddleware.run(watchViolatorDrones)
sagaMiddleware.run(watchViolatorPilots)

export default store