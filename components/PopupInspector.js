import React from "react"
import styled from "@emotion/styled"


export default function PopupInspector(props){

  const Title = styled.div`
    font-size: 1.5em;
    margin: 2rem 0;

  `
  const Category = styled.div`
    background: #B4D260;
    width: fit-content;
    margin-bottom: 2rem;
    padding: .5rem 1rem;
    border-radius: 16px;
    color: white
  `
  const Text = styled.div`
    font-size: 1.2em;
    font-style: italic;
  `

    return (
      <div>
        <Title>{props.title}</Title>
        <Category>{props.category}</Category>
        <Text>{props.text}</Text>
      </div>
    )
}
