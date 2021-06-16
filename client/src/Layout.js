import React, { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { Navbar, Nav } from "react-bootstrap";
import { ThemeContext } from 'styled-components';
import SiteNav from './components/SiteNav'
const Layout = ({ children }) => {
  const { currentUser, login, logout } = useContext(AuthContext);
  const themeContext = useContext(ThemeContext)
  return (
    <div className="App">
      <Navbar bg="dark">
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">{currentUser && <>Welcome, {currentUser.displayName}!</>}</Nav>
          <Nav className="ml-auto">
            {currentUser && <Nav.Link onClick={logout}>Logout</Nav.Link>}
            {!currentUser && <Nav.Link onClick={login}>Login</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {currentUser && <div><SiteNav /></div>}
      <pre>{JSON.stringify(themeContext)}</pre>
      {children}
    </div>
  );
};

export default Layout;
