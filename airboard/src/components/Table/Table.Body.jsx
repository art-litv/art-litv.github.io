import React from 'react';

export default function TableBody({ rows, prepareRow, tableBodyProps }) {
  return (
    <tbody className="results-table__body" {...tableBodyProps}>
      {rows.map(row => {
        prepareRow(row);
        return (
          <tr className="results-table__row" {...row.getRowProps()}>
            {row.cells.map(cell => {
              return (
                <td className="results-table__row-cell" {...cell.getCellProps()}>
                  {cell.render('Cell')}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
}
