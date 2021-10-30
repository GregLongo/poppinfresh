import React, { useState, useEffect, useCallback } from 'react'
import { useTable, useFilters, useAsyncDebounce } from "react-table";
import { useSelector } from 'react-redux'
import styled from "@emotion/styled"

// import makeData from "./makeData";


// Our table component
export default function Table({ columns, data, parentCallback, defaultColumn }) {

  const [lp, setLP] = useState(0);
  const [activeRow, setActiveRow] =useState(false)

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    visibleColumns
  } = useTable(
    {
      columns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
      initialState: {
        hiddenColumns: 'lp'
      }
    },
    useFilters // useFilters!
  );
  console.log(columns)

  const Table = styled.table`
    width: 91%;
    height: 80%;
    background: white;
    margin: 3rem;
    border-radius: 10px
  `

  const Th = styled.th`
    height: 64px
  `

    const Tr = styled.tr`
      cursor: pointer;
      &:nth-of-type(2n-1){
        background: #F4FBFF
      }
      &:hover{
        background: #d0eeff
      }
    `

  const Cell = styled.td`
    /* text-align: center; */
    border: none;
    padding: .5rem
  `

  const Filters = styled.div`
    display: flex;
    align-items: center;
    margin: 2rem 0rem 0rem 3rem;
  `


  // We don't want to render all of the rows for this example, so cap
  // it for this use case
  const firstPageRows = rows.slice(0, 15);
  return (
    <>
    <Filters><span>Filter By:</span>{headerGroups[0].headers[1].render("Filter")}</Filters>
      <Table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} >
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps()}>
                  {column.render("Header")}
                  {console.log(headerGroups[0].headers[1].Header)}
                </Th>
              ))}
            </tr>
          ))}
          <tr>
            <th
              colSpan={visibleColumns.length}
              style={{
                textAlign: "left"
              }}
            ></th>
          </tr>
        </thead>
        <tbody {...getTableBodyProps()}>
          {firstPageRows.map((row, i) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}
                className={i == activeRow ? 'active' : null}
                onClick={()=>{
                console.log(i);
                setLP(row.values.lp);
                setActiveRow(i)
                parentCallback(lp);
              }}>

                {row.cells.map((cell) => {
                  return (
                    <Cell {...cell.getCellProps()}>{cell.render("Cell")}</Cell>
                  );
                })}
              </Tr>
            );
          })}
        </tbody>
      </Table>
      <div>
      </div>
    </>
  );
}
