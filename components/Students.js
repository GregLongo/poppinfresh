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

export default function Students() {
  useFirebaseConnect([
    '/students',
  ])

  const students = useSelector((state) => state.firebase.data.students)

  if (!isLoaded(students)) {
    return <div>Loading...</div>
  }

  if (isEmpty(students)) {
    return <div>Students List Is Empty</div>
  }


  return (
    <div className={styles.layout}>
      <ul className={styles.grid}>
          {Object.keys(students).map((key,id) =>(
            <div>
            <Link href={{
              pathname:"/ThisStudent",
              query: {student:[key]}
            }}>
            <a>
                <Student
                 name={students[key].name}
                 age={students[key].age}
                 avatar={students[key].avatar}
                 speed={students[key].speed}
                 overall={students[key].overall}
                 />
                 </a>
                 </Link>
              </div>
          ))}
      </ul>
      <div>

      </div>
    </div>
  )
}
