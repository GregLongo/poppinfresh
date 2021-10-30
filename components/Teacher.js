import React from "react"
import styled from "@emotion/styled"


export default function Teacher(props) {
  const Teacher = styled.div`
    padding-top: 2rem;
    padding-bottom: 2rem;
    padding-left: 3rem;
    font-size: 36px;
    border-bottom: 2px solid #CECECE
  `
  return (

        <div >
          <Teacher>{props.teacher}</Teacher>
        </div>

  )
}
