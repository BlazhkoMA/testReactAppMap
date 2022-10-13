import {put, takeEvery} from "redux-saga/effects"
import {ASYNC_SET_SOURCE_CITY,ASYNC_SET_DESTINATION_CITY,   sourceCityCreator,  destinationCityCreator} from "../store/dataReducer";

const delay = (ms) => new Promise(res => setTimeout(res, ms))

function* sourceCityWorker(value) {
    yield delay(1000)
    yield put(sourceCityCreator(value.payload))
}

function* destinationCityWorker(value) {
    yield delay(1000)
    yield put(destinationCityCreator(value.payload))
}


export function* dataWatcher() {
    yield takeEvery(ASYNC_SET_SOURCE_CITY, sourceCityWorker)
    yield takeEvery(ASYNC_SET_DESTINATION_CITY, destinationCityWorker)
}
