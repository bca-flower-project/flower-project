import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { AppThemeContext } from "../../contexts/AppThemeContext";
import { Navbar, Nav } from "react-bootstrap";

import SiteNav from "./SiteNav";
import SiteFooter from "./SiteFooter";

import "./Layout.scss";

const Layout = ({ children }) => {
  const { currentUser, logout } = useContext(AuthContext);
  const { toggleTheme, theme } = useContext(AppThemeContext);
  return (
    <div className="Layout d-flex flex-column min-vh-100">
      <Navbar className={`theme-${theme}`} bg="dark" expand="md">
        <Navbar.Toggle className="navbar-dark" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {currentUser && (
              <Link to="/">
                Welcome
                {currentUser.displayName && <>, {currentUser.displayName}</>}!
              </Link>
            )}
          </Nav>
          <Nav className="ml-auto">
            <Nav.Link onClick={toggleTheme}>Toggle Theme</Nav.Link>
            {currentUser && (
              <Link className="nav-link" to="/settings">
                Settings
              </Link>
            )}
            <a
              className="nav-link"
              target="_blank"
              rel="noreferrer"
              href="https://www.ok.community/connect"
            >
              Help
            </a>
            {currentUser && <Nav.Link onClick={logout}>Logout</Nav.Link>}
            {!currentUser && (
              <Link className="nav-link" to="/">
                Login
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <br/>
      {/* {currentUser && window.location.pathname !== "/" && (
        <div>
          <SiteNav />
        </div>
      )} */}
      {children}
      <SiteFooter />
    </div>
  );
};

export default Layout;
