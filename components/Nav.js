
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
faUserGraduate,
faCommentAlt
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import NavButton from "./NavButton.js"
import styled from "@emotion/styled"


const navButtons = [
  {
    label: "Students",
    path: "/",
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
    background: black;
    color: white;
    align-items: center;
    display: flex;
    flex-direction: column;
    padding: 2rem
  `
  const Logo = styled.div`

  `

  return(

  <NavBar>
    <div>Living Popups Dashboard App</div>
    {navButtons.map(button => (
      <NavButton
        key={button.path}
        path={button.path}
        label={button.label}
        icon={button.icon}
      />
    ))}
  </NavBar>)
}
