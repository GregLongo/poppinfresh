import React, { useState, useEffect } from 'react'
import Students from "../components/Students.js"
import Teacher from "../components/Teacher.js"

import styled from "@emotion/styled"


export default function StudentPage({classroom, teacher}) {
  return (

        <div >
          <Teacher teacher={teacher}/>
          <Students classroom={classroom}/>
        </div>

  )
}


StudentPage.getInitialProps = ({query: { classroom,teacher } }) =>{
  return { classroom, teacher }
}
