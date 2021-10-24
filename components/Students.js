

import React, { useState } from 'react'
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


export default function Students() {
  useFirebaseConnect([
    '/students',
  ])

  const students = useSelector((state) => state.firebase.data.students)

  const [isGrid, setGrid] = useState(true);

  if (!isLoaded(students)) {
    return <div>Loading...</div>
  }

  if (isEmpty(students)) {
    return <div>Students List Is Empty</div>
  }

  const Heading = styled.div`
    padding-top: 2rem;
    padding-left: 3rem;
    padding-right: 3rem;
    display: flex;
    justify-content: space-between;
    font-size: 24px;
  `
  const ViewButton = styled.button`
    margin-left: 1rem;
    background-color: transparent;
    border: none;
    font-size: 24px;
  `

  const listButton = ({isGrid}) => css`
    opacity: .3
    ${isGrid === false && `
      opacity: 1
    `}
  `

  const gridButton = ({isGrid}) => css`
  opacity: .3
    ${isGrid === true && `
      opacity: 1
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
          <StudentGrid students={students}/>
          : <StudentList students={students}/>
        }
    </div>
  )
}
