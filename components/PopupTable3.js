import React, { useEffect, useState } from "react";
import { useTable, useFilters, useAsyncDebounce } from "react-table";
import { useSelector } from 'react-redux'
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import  'firebase/compat/database'





function Table({ columns, data, ageOutside }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    // setFilter is the key!!!
    setFilter
  } = useTable(
    {
      columns,
      data
    },
    useFilters
  );

  // Listen for input changes outside
  useEffect(() => {
    // This will now use our custom filter for age
    setFilter("age", ageOutside);
  }, [ageOutside]);

  // Render the UI for your table
  return (
    <>
      {/* We can also directly add an input here
      and call setFilter directly on every input change
      if you don't mind your Table component including it
      No need for useEffect or a listener prop
       */}
      <input
        placeholder="Firstname"
        onChange={(e) => setFilter("firstName", e.target.value)}
      />
      <table style={{ marginTop: 30 }} {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
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
    </>
  );
}

// Use a custom filter function
const customFilterFunction = (rows, id, filterValue) =>
  rows.filter((row) => row.original.age >= filterValue);

export default function PopupsTable2(props) {
  const headers =[
    {
      Header: 'Title',
      accessor: 'title'
    },
    {
      Header: 'Age',
      accessor: 'age',
      Filter: customFilterFunction,
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


  const data = React.useMemo(() => makeData(40), []);
  const [age, setAge] = useState(0);
  return (
    <div>
      {/*Define the input outside here, and pass a
       listener prop to <Table> to update filter internally
       You could also move useTable() outside and not inside <Table>,
       and just pass the instance to <Table>
      */}
      <p>Min age is {age}</p>
      <input
        type="range"
        value={age}
        onChange={(e) => {
          setAge(e.target.value);
        }}
      />
      <Table columns={columns} data={data} ageOutside={age} />
    </div>
  );
}
