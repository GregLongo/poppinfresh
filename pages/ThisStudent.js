import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import  'firebase/compat/database'
import styles from '../styles/Home.module.css'
import { useRouter } from "next/router"
import BookTimeline from "../components/BookTimeline.js"
import BulletChart from "../components/BulletChart.js"
import TimeSeries from "../components/TimeSeries.js"
import DayTimeline from "/components/DayTimeline"

export default function ThisStudent({student}){

  useFirebaseConnect([
    '/students', //in the future change this to just query 1 student, but since its just one class wtv
    '/popups'
  ])

  const students = useSelector((state) => state.firebase.data.students)
  const popups = useSelector((state) => state.firebase.data.popups)


  const [thisPopupTitle, selectPopupTitle] = useState()
  const [thisPopupCategory, selectPopupCategory] = useState();
  const [thisPopupText, selectPopupText] = useState();


    if (!isLoaded(students)) {
    return <div>Loading...</div>
  }

  if (isEmpty(students)) {
    return <div>Students List Is Empty</div>
  }
  if (!isLoaded(popups)) {
  return <div>Loading...</div>
}

if (isEmpty(popups)) {
  return <div>Students List Is Empty</div>
}


  var lastevent ="LP3";
  // console.log("sisisisi"+students[student].timestamps[lastevent].id);


  const currentBook = popups[lastevent];

  return(
  <div>
    <div><img src={students[student].avatar} /></div>
    <div>{students[student].name}</div>
    <div>{students[student].age}</div>
    <div>Now Reading: {currentBook.booktitle}</div>
    <div>{currentBook.title}</div>
    <div><BulletChart val={students[student].speed} max={300} title={'Avg Speed'} /></div>
    <div><BulletChart val={students[student].overall} max={300} title={'Overall'} /></div>
    <div><BulletChart val={100} title={'category'} max={300} sm={true}/></div>
    <div><BulletChart val={75} title={'category'} max={300} sm={true}/></div>
    <div><BulletChart val={150} title={'category'} max={300} sm={true}/></div>
    <div><BulletChart val={200} title={'category'} max={300} sm={true}/></div>
    <div><TimeSeries /></div>

    <BookTimeline
      lastevent= {lastevent}//pass me the id of the last item from "timestamps" via key
    />
    <DayTimeline student={student}/>

  </div>

)
}

ThisStudent.getInitialProps = ({query: { student } }) =>{
  return { student }
}
