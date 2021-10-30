import React from 'react'
import { useTable, useSortBy } from 'react-table'
import styled from '@emotion/styled'
import Link from 'next/link'


export default function SortableTable({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  )

  const Table = styled.table`
    width: 91%;
    height: 80%;
    background: white;
    margin: 3rem;
  `

  const Th = styled.th`
    height: 80px
  `

    const Tr = styled.tr`
      height: 64px;
      cursor: pointer;
      &:nth-of-type(2n-1){
        background: #F4FBFF
      }
      &:hover{
        background: #d0eeff
      }
    `

  const Cell = styled.td`
    text-align: center;
    border: none;
  `


  // We don't want to render all 2000 rows for this example, so cap
  // it at 20 for this use case
  const firstPageRows = rows.slice(0, 20)

  return (
    <>
      <Table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <Th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? '▲'
                        : '▼'
                      : ''}
                  </span>
                </Th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {firstPageRows.map(
            (row, i) => {
              prepareRow(row);
              return (
                <Link href={{
                  pathname:"/ThisStudent",
                  query: {student:[row.original.key]}
                }}>
                    <Tr {...row.getRowProps()}>
                      {row.cells.map(cell => {
                        return (
                          <Cell {...cell.getCellProps()}>{cell.render('Cell')}</Cell>
                        )
                      })}
                    </Tr>
                  </Link>
              )}
          )}
        </tbody>
      </Table>
      <br />
    </>
  )
}
