import React, { useState, useEffect, useCallback } from 'react'
import styled from "@emotion/styled"
import { useSelector } from 'react-redux'
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import  'firebase/compat/database'
import { useRouter } from "next/router"
import Link from 'next/link'
import Dropdown from "../components/Dropdown.js"

export default function ChooseClass(){

  useFirebaseConnect(["/classmeta"])

  const classes = useSelector((state) => state.firebase.data.classmeta)

  if (!isLoaded(classes)) {
    return <div>Loading...</div>
  }

  if (isEmpty(classes)) {
    return <div>No Class Data</div>
  }

const ids = [];
const teachers = [];

const Splash = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-top: 25%;
  margin-bottom: auto;
  width: fit-content;
  height: fit-content;
  text-align: center
`
const Title= styled.div`
  font-size: 36px
`
const Subtitle= styled.div`
  font-size: 24px;
  margin: 2rem;
`

Object.keys(classes).map((key)=>{
        ids.push(classes[key].id);
        teachers.push(classes[key].teacher)
  });
  console.log(ids)
  return(
    <Splash>
      <Title>Living Popups Teacher's Edition</Title>
      <Subtitle>Please Choose Your Class </Subtitle>
      <Dropdown paths={ids} teachers={teachers}/>
    </Splash>
  )
}
