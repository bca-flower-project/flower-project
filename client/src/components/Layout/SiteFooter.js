import React from "react";
import blackLogo from "../icons/blackLogo.png";
import "./SiteFooter.scss";
export default function SiteFooter() {
  return (
    <footer>
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
