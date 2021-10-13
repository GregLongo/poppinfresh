import React, { useState, useEffect } from 'react'

import { useTable } from 'react-table'





export default function PopupTable(props){



const data = React.useMemo(
  ()=>props.papusas,
  []
)


const columns = React.useMemo(
  ()=>props.headers,
  []
)
// papusas.push({title:'test',category:'tester'});









const tableInstance = useTable({columns, data});

const {
  getTableProps,
  getTableBodyProps,
  headerGroups,
  rows,
  prepareRow,
} = tableInstance;




return(
  <table {...getTableProps()}>
    <thead>
    {
      headerGroups.map(headerGroup => (
      <tr {...headerGroup.getHeaderGroupProps()}>
        {
          headerGroup.headers.map(column => (

            <th {...column.getHeaderProps()}>
              {column.render('Header')}
            </th>
          ))}
      </tr>
    ))}
    </thead>
    <tbody {...getTableBodyProps()}>
    {
      rows.map(row => {
        prepareRow(row)
        return(
          <tr {...row.getRowProps()}>
          {row.cells.map(cell =>{
                return (
                  <td {...cell.getCellProps()}
                  style={{
                    padding: '10px',
                    border: 'solid 1px gray',
                    background: 'papayawhip',
                  }}
                  >
                  {cell.render('Cell')}
              </td>
                 )
               })}
        </tr>
        )
      })}
    </tbody>
  </table>
)}
