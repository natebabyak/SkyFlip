import { NavLink } from "react-router-dom";
import "./header.css";

export default function Header() {
  return (
    <header>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/bazaar">Bazaar</NavLink>
      </nav>
    </header>
  )
}