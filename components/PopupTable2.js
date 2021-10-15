import React, { useState, useEffect, useCallback } from 'react'
import { useTable, useFilters, useAsyncDebounce } from "react-table";
import { useSelector } from 'react-redux'
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import  'firebase/compat/database'

// import makeData from "./makeData";

function DefaultColumnFilter() {
  return null;
}

// This is a custom filter UI for selecting
// a unique option from a list
function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id }
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  // Render a multi-select box
  return (
    // <select
    //   value={filterValue}
    //   onChange={(e) => {
    //     setFilter(e.target.value || undefined);
    //   }}
    // >
    //   <option value="">All</option>
    //   {options.map((option, i) => (
    //     <option key={i} value={option}>
    //       {option}
    //     </option>
    //   ))}
    // </select>
    <div>
    <button onClick={(e)=>{
      setFilter('')
    }}>all</button>
    {options.map((option,i)=>(
      <button onClick={(e)=>{
        setFilter(option)
      }}>{option}</button>
    ))}
    </div>
  );
}




// Our table component
function Table({ columns, data, parentCallback }) {

  const [lp, setLP] = useState(0);

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter
    }),
    []
  );


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

  // We don't want to render all of the rows for this example, so cap
  // it for this use case
  const firstPageRows = rows.slice(0, 15);




  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} >
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  {column.render("Header")}
                  {/* Render the columns filter UI */}
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                </th>
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
              <tr {...row.getRowProps()} onClick={()=>{
                console.log(row.values);
                setLP(row.values.lp);
                parentCallback(lp);
              }}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
      </div>
    </>
  );
}

export default function PopupsTable2(props) {


  // const [lp, setLP] = useState(0);

  const callback = useCallback((lp) =>{
    props.grandParentCallback(lp);
  },[]);

  const data = React.useMemo(
    ()=>props.papusas,
    []
  )

  const headers =[
    {
      Header: 'LP',
      accessor: 'lp'
    },
    {
      Header: 'Title',
      accessor: 'title'
    },
    {
      Header: 'Category',
      accessor: 'category',
      Filter: SelectColumnFilter,
      filter: "includes"
    },
    {
      Header: 'Page',
      accessor: 'page'
    },
    {
      Header: 'Interactive?',
      accessor: 'interactive'
    },
    {
      Header: 'Total Plays',
      accessor: 'plays'
    }
  ];



  const columns = React.useMemo(
    ()=>headers,
    []
  )

  // const data = React.useMemo(() => makeData(100000), []);

  return(
    <div>
      <Table columns={columns} data={data}  parentCallback={callback}/>
    </div>

  )
}
