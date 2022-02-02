import React, { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import classnames from 'classnames';

import './search-results.scss';

import NavTabs from '../NavTabs';
import Table from '../Table';

import { getColumns } from '../../utils/flightTableUtils';
import { searchFlights, sortByTime } from '../../utils/flights';
import { ROUTES_FLIGHTS_TYPE } from '../../store/flights/routes-state';
import { getDateParams } from '../../utils/urlParams';

function SearchResults({ flights, flightsType, getFlights, setFlightsType, className }) {
  const location = useLocation();
  const [params, setParams] = useSearchParams();
  const searchParam = params.get('search')?.toLowerCase();

  useEffect(() => {
    // Set default params if going to '/departures' or '/arrivals' without params
    const defaultParams = getDateParams();
    const areCurrentParams = [...params.entries()].length;
    !areCurrentParams && setParams(defaultParams);
    getFlights(params.get('date'));
  }, []);

  useEffect(() => {
    setFlightsType(ROUTES_FLIGHTS_TYPE[location.pathname.replaceAll('/', '')]);
  }, [location.pathname]);

  const filteredFlights = sortByTime(searchFlights(flights, searchParam || ''));

  return (
    <div className={classnames('search-results', className)}>
      <NavTabs flightsType={flightsType} />
      {filteredFlights.length ? (
        <Table
          className="search-results__results-table"
          data={filteredFlights}
          columns={getColumns()}
        />
      ) : (
        searchParam && <p className="search-results__not-found">No flights</p>
      )}
    </div>
  );
}

export default SearchResults;
