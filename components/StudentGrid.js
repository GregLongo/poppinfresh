import React, { useState } from 'react'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { useRouter } from "next/router"
import Student from "./Student.js"


export default function StudentGrid({students}){
  return(
    <ul className={styles.grid}>
        {Object.keys(students).map((key,id) =>(
          <div key={key}>
          <Link href={{
            pathname:"/ThisStudent",
            query: {student:[key]}
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
    </ul>
  )
}
