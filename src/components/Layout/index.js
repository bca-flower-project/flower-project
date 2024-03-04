import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { AppThemeContext } from "../../contexts/AppThemeContext";
import { Navbar, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faToggleOn, faGear, faQuestion, faDoorOpen } from '@fortawesome/free-solid-svg-icons'

import SiteNav from "./SiteNav";
import SiteFooter from "./SiteFooter";

import "./Layout.scss";

const Layout = ({ children }) => {
  const { currentUser, logout } = useContext(AuthContext);
  const { toggleTheme, theme } = useContext(AppThemeContext);
  return (
    <div className="Layout d-flex flex-column min-vh-100">
      <Navbar className={`theme-${theme}`} bg="dark" expand="md">
        <Navbar.Toggle
          className={theme === "dark" ? "navbar-dark" : "navbar-light"} 
          style={{
            border: theme === "dark" ? "1px solid white" : "1px solid black"
          }}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav 
            className={"mr-auto home-nav-btn"}
          >
            <Link to="/">
              Home <FontAwesomeIcon icon={faHome} size="xs"/>
            </Link>
          </Nav>
          <Nav className="ml-auto">
            <Nav.Link onClick={toggleTheme}>Toggle Theme <FontAwesomeIcon icon={faToggleOn}/></Nav.Link>
            {currentUser && (
              <Link className="nav-link" to="/settings">
                Settings <FontAwesomeIcon icon={faGear}/>
              </Link>
            )}
            <a
              className="nav-link"
              target="_blank"
              rel="noreferrer"
              href="https://www.ok.community/connect"
            >
              Help <FontAwesomeIcon icon={faQuestion} size="xs"/>
            </a>
            {currentUser && <Nav.Link onClick={logout}>Logout <FontAwesomeIcon icon={faDoorOpen} size="xs"/></Nav.Link>}
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
