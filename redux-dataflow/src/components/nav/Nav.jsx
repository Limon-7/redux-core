import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

function Nav() {
  return (
    <div className="nav">
      <div className="nav__section">
        <h1>Redux Essentials Example</h1>

        <div className="nav__content">
          <div className="nav__links">
            <Link to="/">Posts</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nav;
