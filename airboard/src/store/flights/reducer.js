import { FLIGHTS_DATA_RECEIVED, SET_FLIGHTS_TYPE } from './actions';

const initialState = {
  flightsType: 'departure',
  flightsList: { departure: [], arrival: [] },
};

export default function flightsReducer(state = initialState, action) {
  switch (action.type) {
    case FLIGHTS_DATA_RECEIVED:
      return {
        ...state,
        flightsList: action.payload.flightsData,
      };
    case SET_FLIGHTS_TYPE:
      return {
        ...state,
        flightsType: action.payload.newFlightsType,
      };
    default:
      return state;
  }
}
