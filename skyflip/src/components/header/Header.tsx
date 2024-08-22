import React from "react";
import { NavLink } from "react-router-dom";
import "./header.css";

export default function Header(): React.ReactNode {
  return (
    <header>
      <nav>
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/auctions">Auctions</NavLink></li>
          <li><NavLink to="/bazaar">Bazaar</NavLink></li>
          <li><NavLink to="/corpses">Corpses</NavLink></li>
          <li><NavLink to="/crafts">Crafts</NavLink></li>
          <li><NavLink to="/fann">Fann</NavLink></li>
          <li><NavLink to="/forge">Forge</NavLink></li>
          <li><NavLink to="/kat">Kat</NavLink></li>
          <li><NavLink to="/pets">Pets</NavLink></li>
        </ul>
      </nav>
    </header>
  );
}