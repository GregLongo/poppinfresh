import React from 'react'
import styled from "@emotion/styled"

const ScoresContainer = styled.div`
  display: flex;
  align-items: center;
  width: 160px;
  justify-content: space-between;
  img{
    width: 16px
  }
`

export default function Scores(props){
  return(
    <ScoresContainer>
      <img src="img/bulb.svg" />
      <span>{props.popups} </span>
      <img src="img/interactive.svg" />
      <span>{props.interactive} </span>
      <span>⛷	</span>
      <span>{props.something}</span>
    </ScoresContainer>
  )
}
