import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { AppThemeContext } from "../../contexts/AppThemeContext";
import { Navbar, Nav } from "react-bootstrap";

import SiteNav from "./SiteNav";
import SiteFooter from "./SiteFooter";

import "./Layout.scss";
const Layout = ({ children }) => {
  const { currentUser, login, logout } = useContext(AuthContext);
  const { toggleTheme } = useContext(AppThemeContext);
  return (
    <div className="Layout">
      <Navbar bg="dark" expand="md">
        <Navbar.Toggle />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {currentUser && (
              <Link to="/">Welcome, {currentUser.displayName}!</Link>
            )}
          </Nav>
          <Nav className="ml-auto">
            <Nav.Link onClick={toggleTheme}>Toggle Theme</Nav.Link>
              {currentUser && (
                <Nav.Link><Link to="/settings">Settings</Link></Nav.Link>
              )}
            {currentUser && <Nav.Link onClick={logout}>Logout</Nav.Link>}
            {!currentUser && <Nav.Link onClick={login}>Login</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {currentUser && window.location.pathname !== "/" && (
        <div>
          <SiteNav />
        </div>
      )}
      {children}
      <SiteFooter />
    </div>
  );
};

export default Layout;
