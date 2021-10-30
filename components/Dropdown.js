import React, {useState} from 'react'
import Link from 'next/link'
import styled from "@emotion/styled"

export default function Dropdown(props){
  const [path, setPath] = useState()
  const [teacher, setTeacher] = useState()

  const Drop = styled.select`
    width: 300px;
    height: 42px;
    padding-left: 24px;
    margin-bottom: 2rem;
    margin-right: auto;
    margin-left: auto
  `
  const Go = styled.button`
    background: #77C294;
    width:160px;
    text-align: center;
    border:none;
    color: white;
    border-radius: 16px;
    padding: .75rem;
    margin-right: auto;
    margin-left: auto;
    cursor:pointer;
    &:hover{
      background: #2d956f

    }
  `
const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center
`

  return(
    <Container>
      <Drop value={path} onChange={(e)=>{
        setTeacher(props.teachers[e.target.selectedIndex-1])
        setPath(e.target.value);
      }}><option>Select Class </option>
        {Object.entries(props.paths).map((p,i)=>(
          <option value={p[1]}>{p[1]}</option>
        ))}
      </Drop>

      <Link href={{
        pathname:"/StudentPage",
        query:{classroom:path, teacher:teacher}
      }}>
        <Go>
          Go
        </Go>
      </Link>
    </Container>
  )


}
