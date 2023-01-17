import { actionTypes } from './reducers/drone'
import { getViolatorDrones } from './services/drones'
import { put, call, takeEvery } from 'redux-saga/effects'

export function* updateViolatorDrones() {
    try {
        const violators = yield call(getViolatorDrones)
        yield put({ type: actionTypes.UPDATE_VIOLATOR_DRONES, payload: violators })
    } catch (err) {
        console.log(err)
    }
}

export function* watchViolatorDrones() {
    yield takeEvery(actionTypes.FETCH_VIOLATOR_DRONES,
        updateViolatorDrones)
}

