// components/NavButton.js

import Link from "next/link";
import { withRouter, useRouter } from "next/router";
import styled from "@emotion/styled"




const StyledNavButton = styled.div`
  cursor: pointer;
  padding: 2rem;
  text-align: center;
  opacity: .5;
  &:hover{
    opacity: .7
  }
  &.active{
    opacity: 1
  }
`
const NavIcon = styled.div`
  font-size: 36px;

`

const NavButton = props => (



    <Link href={{
      pathname: props.path,
      query: 'classroom='+ props.classroom
    }}>
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
