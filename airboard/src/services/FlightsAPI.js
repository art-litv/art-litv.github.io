export default class FlightsAPI {
  static baseUrl = `https://api.iev.aero/api/flights/`;

  static getFlights = async date => {
    const response = await fetch(FlightsAPI.baseUrl + date);
    return await response.json();
  };
}
