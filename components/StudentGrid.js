import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from "next/router"
import Student from "./Student.js"

import styled from "@emotion/styled"



export default function StudentGrid({students, classroom}){
  const StudentGrid = styled.ul`
    display: grid;
    grid-template-columns: 50% 50%;
    grid-gap: 40px
  `

  return(
    <StudentGrid >
        {Object.keys(students).map((key,id) =>(
          <div key={key}>
          <Link href={{
            pathname:"/ThisStudent",
            query: {student:[key],classroom:classroom}
          }}>
          <a>
              <Student
               name={students[key].name}
               age={students[key].age}
               avatar={students[key].avatar}
               speed={students[key].speed}
               overall={students[key].overall}
               />
               </a>
               </Link>
            </div>
        ))}
    </StudentGrid>
  )
}
