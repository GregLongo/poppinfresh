import React from 'react'
import BulletChart from "../components/BulletChart.js"


export default function Student(props){
  return(
  <div>
    <div><img src={props.avatar} /></div>
    <div>{props.name}</div>
    <div><BulletChart val={props.speed} max={300} title={'Avg Speed'} sm={true}/></div>
    <div><BulletChart val={props.overall} max={300} title={'Overall'} sm={true}/></div>
  </div>)
}
