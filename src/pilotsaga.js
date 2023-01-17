import { actionTypes } from './reducers/pilot'
import { getViolatorPilots } from './services/pilots'
import { put, call, takeEvery } from 'redux-saga/effects'

let previousData = []

export function* updateViolatorPilots() {
    try {
        const violators = yield call(getViolatorPilots)
        if (JSON.stringify(violators) !== JSON.stringify(previousData)) {
            previousData = violators
            yield put({ type: actionTypes.UPDATE_VIOLATOR_PILOTS, payload: violators })
        }
    } catch (err) {
        console.log(err)
    }
}

export function* watchViolatorPilots() {
    yield takeEvery(actionTypes.FETCH_VIOLATOR_PILOTS,
        updateViolatorPilots)
    setInterval(() => {
        put({ type: actionTypes.FETCH_VIOLATOR_PILOTS })
    }, 2000)
} 