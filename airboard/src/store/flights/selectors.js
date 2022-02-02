export const flightsSelector = state => state.flights.flightsList;
export const flightsTypeSelector = state => state.flights.flightsType;

export const arrivalsSelector = state => flightsSelector(state).arrival;
export const departuresSelector = state => flightsSelector(state).departure;
