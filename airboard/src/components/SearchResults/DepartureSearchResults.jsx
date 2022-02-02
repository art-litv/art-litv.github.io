import { connect } from 'react-redux';

import SearchResults from './SearchResults.jsx';

import { departuresSelector, flightsTypeSelector } from '../../store/flights/selectors';
import { flightsActions } from '../../store/flights';

const mapState = state => ({
  flights: departuresSelector(state),
  flightsType: flightsTypeSelector(state),
});

const mapDispatch = {
  getFlights: flightsActions.getFlights,
  setFlightsType: flightsActions.setFlightsType,
};

export default connect(mapState, mapDispatch)(SearchResults);
