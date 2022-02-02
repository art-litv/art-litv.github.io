const parseRawFlightsList = flightsList =>
  flightsList.map(flight => {
    const scheduleTime = new Date(flight.timeArrShedule || flight.timeDepShedule)
      .toTimeString()
      .slice(0, 5);

    return {
      terminal: flight.term,
      localTime: scheduleTime,
      status: getStatusText(flight.status, scheduleTime),
      destination: flight['airportFromID.city_en'] || flight['airportToID.city_en'],
      airline: flight.airline.en,
      flightId: flight.codeShareData[0].codeShare,
    };
  });

export const parseFlightsData = rawData => ({
  departure: parseRawFlightsList(rawData.departure),
  arrival: parseRawFlightsList(rawData.arrival),
});

export const searchFlights = (flights, searchParam) =>
  flights.filter(
    flight =>
      flight.destination.toLowerCase().includes(searchParam) ||
      flight.airline.name.toLowerCase().includes(searchParam) ||
      flight.flightId.toLowerCase().includes(searchParam),
  );

export const sortByTime = (flights, dir = 'asc') =>
  flights.sort((f1, f2) => {
    const date1 = new Date('1970/01/01 ' + f1.localTime);
    const date2 = new Date('1970/01/01 ' + f2.localTime);
    return dir === 'asc' ? date1 - date2 : date2 - date1;
  });

export const getStatusText = (statusCode, time) => {
  switch (statusCode) {
    case 'DP':
      return `Flew out ${time}`;
    case 'LN':
      return `Landed ${time}`;
    case 'FR':
      return `In flight`;
    case 'ON':
      return 'In time';
    case 'GC':
      return 'Landing complete';
    case 'DL':
      return 'Delayed';
    case 'CK':
      return 'Registration';
    case 'BD':
      return 'Landing';
    default:
      return statusCode;
  }
};
