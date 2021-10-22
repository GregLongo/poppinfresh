import React, { useState, useEffect, useCallback } from 'react'
import { useTable, useFilters, useAsyncDebounce } from "react-table";
import { useSelector } from 'react-redux'
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import  'firebase/compat/database'
import Table from "/components/Table.js"


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




export default function PopupsTable2(props) {


    const defaultColumn = React.useMemo(
      () => ({
        // Let's set up our default Filter UI
        Filter: DefaultColumnFilter
      }),
      []
    );


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
      <Table
        columns={columns}
        data={data}
        defaultColumn={defaultColumn}
        parentCallback={callback}
      />
    </div>

  )
}
