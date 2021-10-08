import styles from '../styles/Home.module.css'
import React from "react"
import Students from "../components/Students.js"



export default function Home() {
  return (

        <div className={styles.container}>
          <Students />
        </div>

  )
}
