import React from "react"

export default function(props){
    return (
      <div>
        <div>{props.title}</div>
        <div>{props.category}</div>
        <div>{props.text}</div>
      </div>
    )
}
