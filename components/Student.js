import React from 'react'
import BulletChart from "../components/BulletChart.js"
import Scores from "../components/Scores.js"
import styled from "@emotion/styled"

export default function Student(props){
  const Student = styled.div`
    display: grid;
    grid-template-columns: 30% 70%;
    height: 140px;
    width: 380px;
    /* margin: 24px; */
    padding: .5rem 1rem;
    background-color: #fff;
    align-items: center;
    border-radius: 10px;
    &:hover{
      outline: 2px solid  #ccc ;
    }
  `
  const Avatar = styled.img`
    width: 100%;
    max-height: 100%
  `
  const NameScore = styled.div`
    display: flex;
    justify-content: space-between;
    padding: .5rem .5rem 0 .5rem
  `


  return(
  <Student>
    <Avatar src={props.avatar} />
    <div>
      <NameScore><span>{props.name}</span><Scores popups={22} interactive={11} something={3} /></NameScore>
      <BulletChart val={props.speed} max={300} title={'Avg Speed'} sm={true} color={'#77C294'}/>
      <BulletChart val={props.overall} max={300} title={'Overall'} sm={true} color={'#F48C71'} />
    </div>
  </Student>)
}
