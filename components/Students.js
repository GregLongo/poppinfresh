

import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import  'firebase/compat/database'
import styles from '../styles/Home.module.css'
import Student from "./Student.js"
import SelectedStudent from "./SelectedStudent.js"
import { useRouter } from "next/router"
import Link from 'next/link'
import Nav from "./Nav.js"
import StudentGrid from "/components/StudentGrid.js"
import StudentList from "/components/StudentList.js"
import styled from "@emotion/styled"
import { css } from '@emotion/react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faTh
} from "@fortawesome/free-solid-svg-icons";


export default function Students({classroom}) {
  useFirebaseConnect([
    '/classes',
  ])


  // const [thisClass, setClassroom] = useState(classroom)
  // const [students, setStudents] = useState([])

  const classes = useSelector((state) => state.firebase.data.classes)


  const [isGrid, setGrid] = useState(true);

  //
  // if (isLoaded(classes)) {
  //   setClassroom(classroom)
  //   setStudents(thisClass)
  // }



    if (!isLoaded(classes)) {
      return <div>Loading...</div>
    }

    if (isEmpty(classes)) {
      return <div>Students List Is Empty</div>
    }

    const students=classes[classroom];
    // console.log(students)


  const Heading = styled.div`
    padding-top: 2rem;
    padding-left: 3rem;
    padding-right: 3rem;
    display: flex;
    justify-content: space-between;
    font-size: 24px;
  `
  const ViewButton = styled.button`
    cursor: pointer;
    margin-left: 1rem;
    background-color: transparent;
    border: none;
    font-size: 24px;
  `

  const listButton = ({isGrid}) => css`
    opacity: .3;
    &:hover{
      opacity: .4
    }
    ${isGrid === false && `
      opacity: 1 !important
    `}
  `

  const gridButton = ({isGrid}) => css`
  opacity: .3;
    &:hover{
      opacity: .4
    }
    ${isGrid === true && `
      opacity: 1 !important
    `}
  `

  return (
    <div>
    <Heading>
      <span>Students</span>
      <span>
      <ViewButton css={listButton({isGrid})} onClick={()=>{
        setGrid(false)
      }}>
        <FontAwesomeIcon icon={faList} />
      </ViewButton>
      <ViewButton css={gridButton({isGrid})} onClick={()=>{
        setGrid(true)
      }}>
        <FontAwesomeIcon icon={faTh} />
      </ViewButton>
      </span>
    </Heading>
        {
           isGrid ?
          <StudentGrid students={students} classroom={classroom}/>
          : <StudentList students={students} classroom={classroom}/>
        }
    </div>
  )
}
