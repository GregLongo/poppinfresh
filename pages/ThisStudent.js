import React, { useState, useEffect, useCallback } from 'react'
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
import PopupInspector from "/components/PopupInspector.js"
import Scores from "../components/Scores.js"



export default function ThisStudent({student, classroom}){

  useFirebaseConnect([
    '/classes', //in the future change this to just query 1 student
    '/popups'
  ])

  const classes = useSelector((state) => state.firebase.data.classes)
  const popups = useSelector((state) => state.firebase.data.popups)

  const [thisPopupTitle, selectPopupTitle] = useState('default')
  const [thisPopupCategory, selectPopupCategory] = useState('default');
  const [thisPopupText, selectPopupText] = useState('default');


  const [thisPopup, selectPopup] = useState('LP3');

  const parentCallback = useCallback((poppers) =>{
    selectPopup(poppers);
  },[])


    if (!isLoaded(classes)) {
    return <div>Loading...</div>
  }

  if (isEmpty(classes)) {
    return <div>Students List Is Empty</div>
  }
  if (!isLoaded(popups)) {
  return <div>Loading...</div>
}

if (isEmpty(popups)) {
  return <div>Students List Is Empty</div>
}

const students=classes[classroom];

console.log(students)

const selectedPopup = {
  title: popups[thisPopup].title,
  category: popups[thisPopup].category,
  text: popups[thisPopup].text
}


  var lastevent ="LP3";
  // console.log("sisisisi"+students[student].timestamps[lastevent].id);


  const currentBook = popups[lastevent];

  const Container = styled.div`
    display: grid;
    grid-template-columns: 55% 40%;
    grid-gap: 3rem;
    margin: 4rem;
    max-width: 100vw;
  `
  const LeftContainer = styled.div`
    background: white;
    padding: 1rem;
    border-radius: 10px;
  `
  const RightContainer = styled.div`
    background: white;
    padding: 3rem 1rem;
    border-radius: 10px;
  `
  const Name = styled.div`
    font-size: 2em;
    margin-bottom: 1rem;
  `
  const Reading = styled.div`
    font-size: 1.5em;
    margin-bottom: 1rem ;
  `
  const Marquis = styled.div`
    padding-left: 2rem
  `

  const Info = styled.div`
    display: grid;
    grid-template-columns: 25% 75%;
    align-items: center;
    padding: 2rem;
    /* height: 200px; */
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
          <Marquis>
            <Name>{students[student].name}</Name>
            <Reading>Now Reading: {currentBook.booktitle} - {currentBook.title}</Reading>
            <Scores popups={22} interactive={11} something={3} />
          </Marquis>
        </Info>
        <BookTimeline
          lastevent= {lastevent}//pass me the id of the last item from "timestamps" via key
          parentCallback={parentCallback}
        />
        <DayTimeline student={student} classroom={classroom} parentCallback={parentCallback}/>
      </LeftContainer>
      <RightContainer>
        <div>
          <div><BulletChart val={students[student].speed} max={300} title={'Avg Speed'} color={'#77C294'} /></div>
          <div><BulletChart val={students[student].overall} max={300} title={'Overall'} color={'#F48C71'} /></div>
        </div>
        <div>
          <PopupInspector {...selectedPopup} />
          </div>
      </RightContainer>
    </Container>
  </div>

)
}

ThisStudent.getInitialProps = ({query: { student, classroom } }) =>{
  return { student, classroom }
}
