import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import  'firebase/compat/database'
import styles from '../styles/Home.module.css'
import { useRouter } from "next/router"
import Link from 'next/link'




export default function ThisStudent({student}){

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

  return(
  <div>
    <div><img src={students[student].avatar} /></div>
    <div>{students[student].name}</div>
    <div>{students[student].age}</div>
  </div>)
}

ThisStudent.getInitialProps = ({query: { student } }) =>{
  return { student }
}
