import Nav from "./Nav.js";


const Layout = props => {
  return (
    <div >
      <Nav />
      <div>{props.children}</div>
    </div>
  );
};

export default Layout;
