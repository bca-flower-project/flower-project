import React, { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { AppThemeContext } from "./contexts/AppThemeContext";

import { Navbar, Nav } from "react-bootstrap";
import SiteNav from "./components/SiteNav";

const Layout = ({ children }) => {
  const { currentUser, login, logout } = useContext(AuthContext);
  const { toggleTheme } = useContext(AppThemeContext);
  return (
    <div className="App">
      <Navbar bg="dark">
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {currentUser && <>Welcome, {currentUser.displayName}!</>}
          </Nav>
          <Nav className="ml-auto">
            <Nav.Link onClick={toggleTheme}>Togle Theme</Nav.Link>
            {currentUser && <Nav.Link onClick={logout}>Logout</Nav.Link>}
            {!currentUser && <Nav.Link onClick={login}>Login</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {currentUser && (
        <div>
          <SiteNav />
        </div>
      )}
      {children}
    </div>
  );
};

export default Layout;
