import { useContext } from "react";
import blackLogo from "../icons/blackLogo.png";
import { AppThemeContext } from "../../contexts/AppThemeContext";
import "./SiteFooter.scss";
export default function SiteFooter() {
  const { theme } = useContext(AppThemeContext);
  return (
    <footer className={theme}>
      <h5>
        <a href="https://www.ok.community/the-flower-project">
          <img src={blackLogo} className="footerLogo" alt="okLogo" />
          About the Flower Project
        </a>
      </h5>
      <p>&copy; {new Date().getFullYear()} The Flower Project</p>
    </footer>
  );
}