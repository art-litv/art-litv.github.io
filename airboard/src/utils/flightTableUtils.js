import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

/* 
  *UTIL INSTRUCTION*
  'react-table' library provides api for
  creating table components in a fast and easy way
  by providing custom hooks. 
  
  However, when we pass columns (which elements object schema correlate to 
  '{ id: 'someId', Header: 'Field', accessor: 'actualField' }')
  and data arrays to the 'useTable' hook, 
  we eventually find out that objects can not be rendered 
  by using the default renderer provided by 'react-table' api.
  ! That means, that 'actualField' from the example, found in the 'data' array parameter
  ! passed to the 'useTable' hook, can not be parsed as an JSX markup into the row cell.

  To be able to render objects as fields into the table row cells,
  this util has been created.

  *USAGE*
  1. COLUMNS variable must be an array
  of tuples of 2 strings - ['Displayed Header', 'fieldName']

  2. If one of the data fields is an object,
  write inside the cellComponents variable
  a callback 
  ! (named just as the 'fieldName', corresponding to the data schema),
  according to the following schema:

    const cellComponents = {
      fieldName: props => (
        <div className="jsx-for-field-that-is-an-object">
          {props.row.original.fieldName.innerObjectField}
        </div>
      ),
    }

  This callback returns following jsx each time 'react-table' library
  tries to render one of your fields-objects from your data
  into the row cell.
*/

const COLUMNS = [
  ['Terminal', 'terminal'],
  ['Local time', 'localTime'],
  ['Destination', 'destination'],
  ['Status', 'status'],
  ['Airline', 'airline'],
  ['Flight', 'flightId'],
  ['', 'detailsUrl'],
];

const cellComponents = {
  airline: props => (
    <div className="results-table__airline-logo">
      <img
        className="results-table__airline-icon"
        src={props.row.original.airline.logoName || props.row.original.airline.logoSmallName}
      ></img>
      <p className="results-table__airline-name">{props.row.original.airline.name}</p>
    </div>
  ),
  detailsUrl: props => {
    return (
      <Link to={props.row.original.detailsUrl || '#'} className="results-table__details-url">
        Flight details
      </Link>
    );
  },
  terminal: props => (
    <span
      className={classnames(
        'results-table__terminal',
        props.row.original.terminal === 'D' && 'results-table__terminal_blue',
      )}
    >
      {props.row.original.terminal}
    </span>
  ),
};

const setCellRenderMethod = tableColumn => {
  const tableColumnCopy = { ...tableColumn };
  const cellRenderComponent = cellComponents[tableColumnCopy.accessor];
  if (cellRenderComponent) tableColumnCopy.Cell = props => cellRenderComponent(props);
  return tableColumnCopy;
};

const getTableColumn = column => ({ id: column[0], Header: column[0], accessor: column[1] });

export const getColumns = () =>
  COLUMNS.map(column => getTableColumn(column)).map(tableColumn => {
    const newCellMethodColumn = setCellRenderMethod(tableColumn);
    return newCellMethodColumn;
  });
