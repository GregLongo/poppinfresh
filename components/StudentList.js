import React from 'react'
import { useTable, useSortBy } from 'react-table'
import SortableTable from "/components/SortableTable.js"
// import makeData from './makeData'



export default function StudentList({students}) {


  const headers =[
    {
      Header: 'name',
      accessor: 'name'
    },
    {
      Header: 'avatar',
      accessor: 'avatar'
    },
    {
      Header: 'speed',
      accessor: 'speed'
    },
    {
      Header: 'overall',
      accessor: 'overall'
    },
  ];



  const pupils = [];

  Object.keys(students).map((key,id)=>{
    pupils.push({
      name:students[key].name,
      avatar:students[key].avatar,
      speed:students[key].speed,
      overall:students[key].overall
    })
  })

  const data = React.useMemo(
    ()=>pupils,
    []
  )

  return (
      <SortableTable columns={headers} data={data} />
  )
}
