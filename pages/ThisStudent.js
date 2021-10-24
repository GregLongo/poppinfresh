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
import Teacher from "../components/Teacher.js"
import styled from "@emotion/styled"

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

  const Container = styled.div`
    display: grid;
    grid-template-columns: 50% 40%;
    grid-gap: 3rem;
    margin: 4rem;
    max-width: 100vw;
  `
  const LeftContainer = styled.div`
    background: white;
    padding: 1rem
  `
  const RightContainer = styled.div`
    background: white;
    padding: 3rem 1rem
  `

  const Info = styled.div`
    display: grid;
    grid-template-columns: 25% 75%;
    align-items: center;
    padding: 2rem;
    height: 200px;
    /* img{
      height:140px
    } */
  `

  return(
  <div>
    <Teacher/>
    <Container>
      <LeftContainer>
        <Info>
          <div>
            <img src={students[student].avatar} />
          </div>
          <div>
            <div>{students[student].name}</div>
            <div>Now Reading: {currentBook.booktitle} - {currentBook.title}</div>
          </div>
        </Info>
        <BookTimeline
          lastevent= {lastevent}//pass me the id of the last item from "timestamps" via key
        />
        <DayTimeline student={student}/>
      </LeftContainer>
      <RightContainer>
        <div>
          <div><BulletChart val={students[student].speed} max={300} title={'Avg Speed'} color={'#77C294'} /></div>
          <div><BulletChart val={students[student].overall} max={300} title={'Overall'} color={'#F48C71'} /></div>
        </div>
        <div>
          and he were inseparable. What about Adrian Singleton and his dreadful end? What about Lord Kent's only son and his career? I met his father yesterday in St. James's Street. He seemed broken with shame and sorrow. What about the young Duke of Perth? What sort of life has he got now? What gentleman would
          </div>
      </RightContainer>
    </Container>
  </div>

)
}

ThisStudent.getInitialProps = ({query: { student } }) =>{
  return { student }
}
