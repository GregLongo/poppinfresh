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


  return (
    <div className={styles.layout}>
      <button onClick={()=>{
        setGrid(false)
      }}>
        List Mode
      </button>
      <button onClick={()=>{
        setGrid(true)
      }}>
        Grid Mode
      </button>
    {
       isGrid ?
      <StudentGrid students={students}/>
      : <StudentList students={students}/>
    }
      <div>
      </div>
    </div>
  )
}
