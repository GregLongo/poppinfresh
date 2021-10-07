import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import  'firebase/compat/database'
import styles from '../styles/Home.module.css'
import Student from "./Student.js"
import SelectedStudent from "./SelectedStudent.js"

export default function Students() {
  useFirebaseConnect([
    '/students',
  ])

  const students = useSelector((state) => state.firebase.data.students)
  const [selected, selectStudent] = useState("student1")

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
            <div onClick={()=> selectStudent(key)}>
              <Student
               name={students[key].name}
               age={students[key].age}
               avatar={students[key].avatar}
               />
            </div>
          ))}
      </ul>
      <div>
        <SelectedStudent
          name={students[selected].name}
          age={students[selected].age}
          avatar={students[selected].avatar}
        />
      </div>
    </div>
  )
}
