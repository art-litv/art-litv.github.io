import React from 'react';
import classnames from 'classnames';
import { useTable } from 'react-table';

import Header from './Table.Header';
import Body from './Table.Body';

import './table.scss';

function Table({ className, columns, data }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <table className={classnames('results-table', className)} {...getTableProps()}>
      <Header headerGroups={headerGroups} />
      <Body rows={rows} prepareRow={prepareRow} tableBodyProps={getTableBodyProps()} />
    </table>
  );
}

export default React.memo(Table, (prevProps, nextProps) => prevProps.data === nextProps.data);
