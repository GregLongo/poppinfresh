import React from 'react'
import BulletChart from "../components/BulletChart.js"

import styled from "@emotion/styled"

export default function Student(props){
  const Student = styled.div`
    display: grid;
    grid-template-columns: 30% 70%;
    height: 140px;
    width: 380px;
    /* margin: 24px; */
    padding: .5rem;
    background-color: #fff;
    align-items: center;
  `
  const Avatar = styled.img`
    width: 100%;
    max-height: 100%
  `

  return(
  <Student>
    <Avatar src={props.avatar} />
    <div>
      <div><span>{props.name}</span><span>@3%22&11</span></div>
      <BulletChart val={props.speed} max={300} title={'Avg Speed'} sm={true} color={'#77C294'}/>
      <BulletChart val={props.overall} max={300} title={'Overall'} sm={true} color={'#F48C71'} />
    </div>
  </Student>)
}
