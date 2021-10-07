import React from 'react'


export default function Student(props){
  return(
  <div>
    <div><img src={props.avatar} /></div>
    <div>{props.name}</div>
    <div>{props.age}</div>
  </div>)
}
