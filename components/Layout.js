import Nav from "./Nav.js";
import styled from "@emotion/styled"


const Layout = props => {

  const Backdrop = styled.div`
    background: lavender;
    height: 100vh;
    /* width: 100%; */
    left: 0;
  `
  const Layout = styled.div`
    display: flex;
    /* width: 100vw */
  `

  return (
    <Layout >
      <Nav />
      <Backdrop>{props.children}</Backdrop>
    </Layout>
  );
};

export default Layout;
