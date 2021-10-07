import React from 'react'
// import PropTypes from 'prop-types'
// import { useSelector } from 'react-redux'
import { firebaseConnect} from 'react-redux-firebase'
import  'firebase/compat/database'
// import styles from '../styles/Home.module.css'
import { compose } from 'redux'
import { connect } from 'react-redux'

const enhance = compose(
  firebaseConnect([
    'students'
  ]),
  connect((state) => ({
      students: state.firebase.data.students
    }))
  )

function Classroom({ students }){
  return(
    <div>
      {JSON.stringify(students, null, 2)}
    </div>
  )
}

export default enhance(Classroom)
