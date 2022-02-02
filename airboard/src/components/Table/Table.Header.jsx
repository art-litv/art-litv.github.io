import React from 'react';

function TableHeader({ headerGroups }) {
  return (
    <thead>
      {headerGroups.map(headerGroup => (
        <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map(column => (
            <th className="results-table__header-row" {...column.getHeaderProps()}>
              {column.render('Header')}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
}

export default TableHeader;
