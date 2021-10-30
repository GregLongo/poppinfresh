import React from 'react'
import { useTable, useSortBy } from 'react-table'
import SortableTable from "/components/SortableTable.js"
// import makeData from './makeData'
import styled from "@emotion/styled"


export default function StudentList({students, classroom}) {

  const Avatar = styled.img`
    height: 48px;
  `

  const headers =[
    {
      accessor: 'avatar',
      Cell:({cell:{value}})=>(
          <Avatar src={value} />
        )
    },
    {
      Header: 'name',
      accessor: 'name'
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
      key:key,
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
