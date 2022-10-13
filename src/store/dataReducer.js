const defaultState = {
    sourceCity: null,
    destinationCity: null,
}

export const SET_SOURCE_CITY = "SET_SOURCE_CITY"
export const SET_DESTINATION_CITY = "SET_DESTINATION_CITY"
export const ASYNC_SET_SOURCE_CITY = "ASYNC_SET_SOURCE_CITY"
export const ASYNC_SET_DESTINATION_CITY = "ASYNC_SET_DESTINATION_CITY"
export default function countReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_SOURCE_CITY:
            console.log(state)
            return {...state, sourceCity: action.payload}
        case SET_DESTINATION_CITY:
            console.log(state)
            return {...state, destinationCity: action.payload}
    }
    return state
}

export const sourceCityCreator = (payload) => ({type: SET_SOURCE_CITY, payload})
export const asyncSourceCityCreator = (payload) => ({type: ASYNC_SET_SOURCE_CITY, payload})
export const destinationCityCreator = (payload) => ({type: SET_DESTINATION_CITY, payload})
export const asyncDestinationCityCreator = (payload) => ({type: ASYNC_SET_DESTINATION_CITY, payload})
