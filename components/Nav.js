
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
faUserGraduate,
faCommentAlt
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { withRouter, useRouter } from "next/router";
import NavButton from "./NavButton.js"
import styled from "@emotion/styled"


const navButtons = [
  {
    label: "Students",
    path: "/StudentPage",
    icon: <FontAwesomeIcon icon={faUserGraduate} />
  },
  {
    label: "Popups",
    path: "/PopupsLegend",
    icon: <FontAwesomeIcon icon={faCommentAlt} />
  },
];


export default function Nav(props){

  const NavBar = styled.div`
    height: 100vh;
    width: 140px;
    /* position: absolute; */
    background: #77C294;
    color: white;
    align-items: center;
    display: flex;
    flex-direction: column;
    padding: 2rem
  `
  const Logo = styled.div`
  cursor:pointer
  `

  const blor = useRouter()
  const blorquery = blor.query
  console.log(blorquery.classroom)

  return(

  <NavBar>
    <Link href={'/'}>
      <Logo>Living Popups Dashboard App</Logo>
    </Link>
    {navButtons.map(button => (
      <NavButton
        key={button.path}
        path={button.path}
        label={button.label}
        icon={button.icon}
        classroom={blorquery.classroom}
      />
    ))}
  </NavBar>)
}
