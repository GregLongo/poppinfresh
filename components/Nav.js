
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
faUserGraduate,
faCommentAlt
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import NavButton from "./NavButton.js"


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


const Nav = props =>(
  <div>
    {navButtons.map(button => (
      <NavButton
        key={button.path}
        path={button.path}
        label={button.label}
        icon={button.icon}
      />
    ))}
  </div>
);

export default Nav
