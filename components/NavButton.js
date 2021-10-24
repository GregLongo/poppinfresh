// components/NavButton.js

import Link from "next/link";
import { withRouter } from "next/router";
import styled from "@emotion/styled"




const StyledNavButton = styled.div`
  padding: 2rem;
  text-align: center;
  &:active{
    color: red
  }
`
const NavIcon = styled.div`
  font-size: 36px;

`

const NavButton = props => (



  <Link href={props.path}>
      <StyledNavButton
        className={`NavButton ${
          props.router.pathname === props.path ? "active" : ""
        }`}
      >
      <NavIcon>{props.icon}</NavIcon>
      <span className="Label">{props.label}</span>
    </StyledNavButton>
  </Link>
);

export default withRouter(NavButton);;
